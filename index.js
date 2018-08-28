const express = require('express');
const app = express();
const mysql = require('./sql');
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.use( express.static( 'public' ) );

app.post('/pipe-view', ( req, res ) => {
    mysql.read(`SELECT pipe, diameter, length FROM pipes order by pipe, diameter, length`, function(result) {
        res.send( result );
    });
});

app.post('/auto-view', ( req, res ) => {
    mysql.read(`SELECT * FROM autoequipments order by gosnumber`, function(result) {
        res.send( result );
    });
});

app.post('/employee-view', ( req, res ) => {
    mysql.read(`SELECT name, position FROM employees order by name`, function(result) {
        res.send( result );
    });
});

app.post('/oilfields-view', ( req, res ) => {
    mysql.read(`SELECT oilfieldname FROM oilfields order by oilfieldname`, function(result) {
        res.send( result );
    });
});

// -----------------------------------------------------------------------------


app.post('/employees', ( req, res ) => {
    mysql.read('select * from employees order by name', function(result) {
        res.send( result );
    });
});

app.post('/autoequipments', ( req, res ) => {
    mysql.read('select * from autoequipments order by gosnumber', function(result) {
        res.send( result );
    });
});

app.post('/pipes', ( req, res ) => {
    mysql.read('SELECT id_pipe, concat(pipe, ", ", diameter, "mm X ", length, "m") as pipe, length FROM pipes order by pipe', function(result) {
        res.send( result );
    });
});

app.post('/pipenames', ( req, res ) => {
    mysql.read('SELECT pipe FROM pipes group by pipe order by pipe', function(result) {
        res.send( result );
    });
});

app.post('/positions', ( req, res ) => {
    mysql.read('SELECT position FROM employees group by position order by position', function(result) {
        res.send( result );
    });
});

app.post('/test', upload.array(), ( req, res ) => {
    console.log( req.body );
    res.json(req.body);
});

app.post('/employeeUp', upload.array(), ( req, res ) => {
    let data = new Array();

    for (let i = 0; i < req.body.name.length; i++) {
        data.push({name: req.body.name[i], position: req.body.position[i]});
    }

    mysql.insert('INSERT INTO employees SET ?', data, function(result) {
        console.log(result);
    });
    res.json(req.body);
});

// тестілегеннен қалып қойды
app.get('/quickstart', ( req, res ) => {
    console.log( req.query.name );
    res.send( `Hi, ${req.query.name} ` );
});

app.listen( 3000, () => {
    console.log( 'Listen on port 3000!' );
});
