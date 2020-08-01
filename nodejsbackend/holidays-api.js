'use strict'

var mongoose = require( 'mongoose' );
var app      = require( './app' );
var port     = process.env.PORT || 8080
var Util   = require( './utilities/util'  );
var entorno = Util.getEnv();
mongoose.Promise = global.Promise;

mongoose.connect( 'mongodb://localhost:27017/holidays', { useNewUrlParser: true, useUnifiedTopology: true }, ( error, response ) => {

    if( error ) {
        throw error;
    }
    else {
        console.log( 'Conected to mongodb ...' )

        app.listen( port, () => console.log( `holiday API listening on port ${port} environment ${entorno} ` ) )
    }
} );


