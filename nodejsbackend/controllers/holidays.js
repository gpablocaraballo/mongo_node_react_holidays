'use strict'
var axios    = require( 'axios' );
var mongoose = require( 'mongoose' );
var Util   = require( '../utilities/util' );
var Holiday   = require( '../models/holidays' );
/***********************************************************************************
****************** Functions invoked when passing routes ***************************
************************************************************************************/

const getHolidaysApi = async (theyear) => {
    let url     = Util.getPath().holidaysapi + theyear;
    const output = await axios.get(url);
    let data = output.data
    return data
}
/*
importdata:
Take the holidays endpoint http://nolaborables.com.ar/api/v2/feriados/, 
Considerations: Each time that you call the endpoint http://localhost:8080/api/v1/holidays/import
The process do a clean/reset of the values, therefore we initialize the default values.

findOneAndUpdate: For edutational purpose we use findOneAndUpdate, for big data set the ideal process
it should be first make a clean/truncate first and then inserts (not using findOneAndUpdate).
You can run import process to be sure that not insert duplicates values.

importdata:
Toma el endpoint de dias feriados http://nolaborables.com.ar/api/v2/feriados/, 
Tener en cuenta: Cada vez que se invoque http://localhost:8080/api/v1/holidays/import
hace un clean/reset de los valores, es decir vuelve a inicializar los valores de los datos.

findOneAndUpdate: A fines educativos se usa findOneAndUpdate, para un import con datos masivos y gran volumen lo ideal
seria realizar una limpieza/truncate primero y luego un insert, ya que el findOneAndUpdate realiza una búsqueda primero
si este script se correría una única vez, se deberia quizas optimizar, pero para el propósito del challenge creo que
es mas que suficiente y se entiende el concepto 
(de paso se puede correr N veces el import para verificar que no inserta duplicados ;) )
*/
const importdata = async ( req, res ) => {

    try{

        
        let fecha = new Date();
        let timedata = (fecha.getMonth()+1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
        let theyear = (req.params.year)?req.params.year:fecha.getFullYear();
        var holiday   = new Holiday();

        Holiday.deleteMany({anio:theyear}, function(){});

        getHolidaysApi(theyear)
        .then(response => {
            let filtros;
            let errorImporting = false;
            let tmpstor;
            for (let i=0;i<response.length;i++){
    
                holiday.anio = theyear;
                holiday.dia = response[i].dia; //day
                holiday.mes = response[i].mes; //month
                holiday.motivo = response[i].motivo; //holidays reason 
                holiday.tipo = response[i].tipo; //type
                holiday.info = response[i].info;
                holiday.id = response[i].id;
                filtros = { id: holiday.id, anio: theyear };
                Holiday.findOneAndUpdate( filtros
                    , {id:holiday.id, anio:holiday.anio, dia:holiday.dia, mes:holiday.mes, motivo:holiday.motivo, tipo:holiday.tipo, info:holiday.info}
                    , { upsert: true, new: true }, ( err, storage ) => {
                    if( err ) { 
                        errorImporting = true;
                    }
                    
                });
            }
            if (errorImporting)
            res.status( 200 ).send( { cod: 1, msg: "There was an error importing data" });
            else
            res.status( 200 ).send( { cod: 0, msg: "Data of year " + theyear + " successfully imported " + timedata });
        })
        .catch(err => {
            console.log('Error import',err);
            res.status( 200 ).send( { cod: 1, msg: `Error importing data` } ); 
        })        

    }catch(err){
        console.log('Error truncating collections',err);
        res.status( 200 ).send( { cod: 1, msg: `Error importing data` } ); 
    }


}
function list( req, res ) {

    try
    {
        var filtros = {};
        //filtros = {tipo:"inamovible"} //Could apply a filter, but its not necesary.

        Holiday.find( filtros ).sort([['_id', -1]]).exec( function(err, storage ) {

            if( err ) { 
                console.log(err);
                res.status( 500 ).send( { cod: 1, msg: `Error getting the holidays` } ); 
            }
            else {
                if( ! storage ) { 
                    res.status( 200 ).send( { cod: 1, msg: 'There is no holidays with this filter' } ); 
                }
                else {
                        res.status( 200 ).send( { cod: 0, msg: 'Successfully', entity: storage } );
                }
            }
        });
    }
    catch( error ) {
        res.status( 200 ).send( { cod: 1, msg: 'Exception error' , entity:error} ); 
    }
}
function del( req, res ) {

    try
    {
    
        let filtros = {_id:req.params.id};

        Holiday.findOneAndDelete(filtros, (err, result) => {
            if (err) {
                console.log(err);
                res.status( 200 ).send( { cod: 1, msg: `Process error` } ); 
            } else {
                res.status( 200 ).send( { cod: 0, msg: 'Successfully', entity: result } );
            }
        });

    }
    catch( error ) {
        res.status( 200 ).send( { cod: 1, msg: 'Exception error' , entity:error} ); 
    }
}
function save( req, res ) {
    let params = req.body;
    let filtros;
    let holiday   = new Holiday();

    holiday.id = (params.id)?params.id:"";
    holiday.dia = (params.dia)?params.dia:"";
    holiday.mes = (params.mes)?params.mes:"";
    holiday.anio = (params.anio)?params.anio:"";
    holiday.motivo = (params.motivo)?params.motivo:"";
    holiday.tipo = (params.tipo)?params.tipo:"";
    holiday.info = (params.info)?params.info:"";

    if (params._id != null && params._id !== undefined && params._id !== ""){
        filtros = { _id: params._id };
    } else {
        filtros = { anio: holiday.anio, mes:holiday.mes, dia: holiday.dia};
    }

    Holiday.findOneAndUpdate( filtros
                         , {id:holiday.id, dia:holiday.dia, mes:holiday.mes, anio:holiday.anio, motivo:holiday.motivo, tipo:holiday.tipo, info:holiday.info}
                         , { upsert: true, new: true }, ( err, storage ) => {
        if( err ) {
            res.status( 200 ).send( { cod: 1, msg: `Error executing process` } ); 
        }
        else {
            res.status( 200 ).send( { cod: 0, msg: `Successfully`, entity: storage } ); 
        }
    });
}
module.exports = { 
    importdata,list,save,del
}