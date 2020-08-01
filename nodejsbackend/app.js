'use strict'
var express     = require( 'express'     );
var bodyParser  = require( 'body-parser' );
var app         = express();

//You could put more services here with the main url
var arrRoutes               = [];
    arrRoutes['holidays']    = '/api/v1'; //main url

app.use( bodyParser.urlencoded( { extended:false } ) );
app.use( bodyParser.json() );

// Config HTTP headers
app.use( ( req, res, next ) => {
    res.header( 'Access-Control-Allow-Origin' , '*' );
    res.header( 'Access-Control-Allow-Headers', 'Cookie, Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method' );
    res.header( 'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS' );
    res.header( 'Allow', 'GET, POST, PUT, DELETE, OPTIONS' );
    next();
} );

// routes
for (var obj in arrRoutes) {    
    var tmp = require('./routes/' + obj) 
    app.use(arrRoutes[obj] + "/" + obj, tmp)
}
module.exports = app;