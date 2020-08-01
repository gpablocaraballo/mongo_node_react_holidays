import React, { Fragment, useEffect, useContext, useState } from "react";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
import "react-datepicker/dist/react-datepicker.css";
import { HolidayContext } from "../../context/holiday-context";
import {setHolidays, getHolidays} from "../utilities/utils";
import './style.css';

const Form = () => {
    const [holiday, setText] = useState({"_id":"","id":"","dia":"","mes":"","anio":"","tipo":"","info":"","motivo":""});
    const [fecha, setDate] = useState(new Date());
    const [errorField, setErrorField] = useState(false);
    // Subscribe to `holidays` state and access dispatch function
    const [state, dispatch] = useContext(HolidayContext);    
    const setLoading = (param) => {
        dispatch({type: "LOADING", payload:param});
    }
    const setError = (param) => {
        dispatch({type: "ERROR", payload:param});
    }
    const cleanCurrent = () => {
        dispatch({type: "CLEAN_CURRENT", payload:null});
    }
    //const saveHoliday = item => {dispatch({type: "ADD_HOLIDAY", payload: item});};
    const guardar = async () => {
        try{
            setErrorField(false);
            if (holiday.id === "" || holiday.tipo === "" || holiday.info === "" || holiday.motivo === "" || fecha === null){
                setErrorField(true);
            } else {
                setLoading(true);
                let tmpholi = {...holiday,"dia":fecha.getDate(),"mes":(fecha.getMonth()+1),"anio":fecha.getFullYear()};
                let resultado = await setHolidays(tmpholi);
                
                if (resultado.data && resultado.data.cod === 0 && resultado.data.entity){
                    //saveHoliday(resultado.data.entity);
                    cleanCurrent();
                    getList();
                } else {
                    setError(true);
                    setLoading(false);
                }
                
            }

        } catch(err){
            console.log('err en deleteHoliday',err);
            setLoading(false);
            setError(true);
        }
    }
    const getList = async () => {
        try{
            setLoading(true);
            let resultado = await getHolidays();
            if (resultado.data && resultado.data.cod === 0 && resultado.data.entity){
                dispatch({
                    type: "FILL_HOLIDAY",
                    payload: resultado.data.entity
                  });
            } else {
                setError(true);
            }
            setLoading(false);
        } catch(err){
            console.log('err en getList',err);
            setLoading(false);
            setError(true);
        }
    }    
    const changeText = (e) => {
        let tmpdata = {...holiday}; //spread operator/operador de propagacion
        tmpdata[e.target.id] = e.target.value;
        setText(tmpdata);
    }
    const changeFecha = date => {
        setDate(date);
    };


    /*
    Si estás familiarizado con el ciclo de vida de las clases de React y sus métodos, 
    el Hook useEffect equivale a: 
    componentDidMount, componentDidUpdate y componentWillUnmount combinados.  
    */
    useEffect(() => {
        registerLocale('es', es);
        setDefaultLocale('es');
        // eslint-disable-next-line
    }, []);

    useEffect(() => {

        if (state.current._id !== holiday._id){
            //console.log("es distinto");
            setErrorField(false);
            setText({...state.current});
            changeFecha( new Date (Number(state.current.anio),(Number(state.current.mes)-1),Number(state.current.dia) ) );
        }
        // eslint-disable-next-line
    }, [state.current._id]);    
   
    return (
        <Fragment>
            <div className='columns' >
                <div className="column">
                    <DatePicker selected={fecha} onChange={changeFecha} dateFormat="dd/MM/yyyy" />
                </div>
                <div className="column">
                    <input id="id" style={{width:'100%'}} className="input is-rounded" type="text" onChange={changeText} onKeyDown={changeText} value={holiday.id} placeholder="Id" />
                </div>                
                <div className="column">
                    <input id="tipo" style={{width:'100%'}} className="input is-rounded" type="text" onChange={changeText} value={holiday.tipo} placeholder="Type" />
                </div>
            </div>
            <div className='columns' >    
                <div className="column">
                    <input id="info" style={{width:'100%'}} className="input is-rounded" type="text" onChange={changeText} onKeyDown={changeText} value={holiday.info} placeholder="Info" />
                </div>
                <div className="column">
                    <input id="motivo" style={{width:'100%'}} className="input is-rounded" type="text" onChange={changeText} onKeyDown={changeText} value={holiday.motivo} placeholder="Reason" />
                </div>
            </div>
            <div className='columns' >              
                <div className="column is-2">
                    <button className="button is-rounded textoColor fondoColor is-medium" onClick={guardar} >Save</button>
                </div>
                {errorField && <div className="column is-5">
                    <article className="message is-warning">
                        <div className="message-header">
                            <p>Warning: Must type all the fields.</p>
                        </div>
                    </article>                
                </div>}                       
            </div>
        </Fragment>
    );    

};

export default Form;