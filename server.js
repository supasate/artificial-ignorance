'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    compress = require('compression'),
    methodOverride = require('method-override');
    

var app = express();

app.use(bodyParser.urlencoded({
    extended: false 
}));
app.use(bodyParser.json());
app.use(methodOverride());

require('./routes/ai.routes')(app);

app.listen(3000, function () {
    console.log("AI server starts at localhost:3000");   
});
