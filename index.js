const express = require('express');
const app = express();
const mysql = require('./sql');
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.use( express.static( 'public' ) );

var escapeHtml = (function () {
    'use strict';
    var chr = { '"': '&quot;', '&': '&amp;', '<': '&lt;', '>': '&gt;' };
    return function (text) {
        return text.replace(/[\"&<>]/g, function (a) { return chr[a]; });
    };
}());

app.post('/employeeInsert', upload.array(), ( req, res ) => {
    let data = new Array();

    for (let i = 0; i < req.body.name.length; i++) {
        data.push({name: escapeHtml(req.body.name[i]), position: escapeHtml(req.body.position[i])});
    }

    mysql.insert('INSERT INTO employees SET ?', data, function(result) {
        console.log(result);
    });
    res.json(req.body);
});

app.post('/oilfieldInsert', upload.array(), ( req, res ) => {
    let data = new Array();

    for (let i = 0; i < req.body.oilfieldname.length; i++) {
        data.push({oilfieldname: escapeHtml(req.body.oilfieldname[i])});
    }

    mysql.insert('INSERT INTO oilfields SET ?', data, function(result) {
        console.log(result);
    });
    res.json(req.body);
});

app.post('/autoInsert', upload.array(), ( req, res ) => {
    let data = new Array();

    for (let i = 0; i < req.body.auto.length; i++) {
        data.push({gosnumber: escapeHtml(req.body.auto[i])});
    }

    mysql.insert('INSERT INTO autoequipments SET ?', data, function(result) {
        console.log(result);
    });
    res.json(req.body);
});

app.post('/pipeInsert', upload.array(), ( req, res ) => {
    let data = new Array();

    for (let i = 0; i < req.body.pipe.length; i++) {
        data.push({pipe: escapeHtml(req.body.pipe[i]), diameter: escapeHtml(req.body.diameter[i]), length: escapeHtml(req.body.length[i])});
    }

    mysql.insert('INSERT INTO pipes SET ?', data, function(result) {
        console.log(result);
    });
    res.json(req.body);
});

app.post('/clientInsert', upload.array(), ( req, res ) => {
    let data = new Array();

    for (let i = 0; i < req.body.name.length; i++) {
        data.push({name: escapeHtml(req.body.name[i]), information: escapeHtml(req.body.information[i])});
    }

    mysql.insert('INSERT INTO clients SET ?', data, function(result) {
        console.log(result);
    });
    res.json(req.body);
});

// -----------------------------------------------------------------------------

app.post('/releaseInsert', upload.array(), ( req, res ) => {
    // date, autoequipment, employee
    // table: pipe [], quantity[]
    let data = new Array();
    let insertId = 0;

    console.log([{id_auto: req.body.autoequipment, id_employee: req.body.employee, date: req.body.date}]);
    
    mysql.insert('INSERT INTO releaseAction SET ?', [{id_auto: req.body.autoequipment, id_employee: req.body.employee, date: req.body.date}], function(result) {
        insertId = result.insertId;
        console.log(result);
        
        for (let i = 0; i < req.body.pipe.length; i++) {
            data.push({ id_release: insertId, id_pipe: escapeHtml(req.body.pipe[i]), qty: escapeHtml(req.body.quantity[i])});
        }
        console.log(data);
        
        mysql.insert('INSERT INTO released SET ?', data, function(result) {
            console.log(result);
        });
    });


    res.json(req.body);
});

// -----------------------------------------------------------------------------

app.post('/client-view', ( req, res ) => {
    mysql.read(`SELECT name, information FROM clients order by name`, function(result) {
        res.send( result );
    });
});

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

// тестілегеннен қалып қойды
app.get('/quickstart', ( req, res ) => {
    console.log( req.query.name );
    res.send( `Hi, ${req.query.name} ` );
});

app.listen( 3000, () => {
    console.log( 'Listen on port 3000!' );
});
