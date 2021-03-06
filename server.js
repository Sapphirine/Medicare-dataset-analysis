/***************************************************
Copyright (C) 2016  
Authors: Siri Haricharan
         Jivtesh Singh

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
    
*************************************************/


var http = require('http');
var express = require('express'),
path = require('path'),
logger = require('morgan'),
bodyParser = require('body-parser'),
//session = require('express-session'),
fs = require('fs');
var mongoose    = require('mongoose');
var dbUrl       = "mongodb://localhost:27017/warrior";

//To run script
var execSync = require('child_process').execSync;
var fs = require('fs');

//var db = mongoose.connect(dbUrl);

const port  = 9000;

var users = require('./app/models/users');
var work = require('./app/models/work');

var app = express();
app.set('views', __dirname + '/views');   

app.use(express.static(__dirname + '/views'));     // set the static files location
app.use(express.static(__dirname + '/public'));     // set the static files location

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended:false}));


app.get('/zipcode/:input', function(req, res){
    console.log(req.params.input);
    execSync("./run "+ req.params.input);
    var contents =     fs.readFileSync('./public/data/op.txt').toString();
    console.log(contents);  
    res.json({"data":contents});
});


app.get('/*', function(req, res){

    res.sendfile('public/index.html');

});


app.listen(port, function(){
   console.log('listening on port', port);
});


