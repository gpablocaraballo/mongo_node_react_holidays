'use strict'

var express     = require( 'express'             );
var holidays    = require( '../controllers/holidays' );
var api         = express.Router();

api.get ( '/import',       holidays.importdata ); //without year, take the current Year.
api.get ( '/import/:year', holidays.importdata );
api.get ( '/list',         holidays.list );
api.get ( '/del/:id',      holidays.del );
api.post( '/save',         holidays.save );

module.exports = api;