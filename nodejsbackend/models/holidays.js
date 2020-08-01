'use strict'

var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var holidaySchema = Schema( {
    //_id: { type: Schema.Types.ObjectId },
    id:     { type: String, required: true },
    dia:    { type: Number, required: true },
    mes:    { type: Number, required: true },
    anio:   { type: Number, required: true },    
    motivo: { type: String, required: true },
    tipo:   { type: String, required: true }, 
    info:   { type: String, required: true }
} );
//https://stackoverflow.com/questions/18628656/model-find-returns-empty-in-mongoose
holidaySchema.set('collection', 'Holiday');
module.exports = mongoose.model("Holiday", holidaySchema);