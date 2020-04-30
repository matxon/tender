    var mysql = require( 'mysql' );
    var pool = mysql.createPool({
    // var pool = mysql.createConnection({
        connectionLimit : 100,
        host: 'localhost',
        user: 'root',
        password: 'DbyljeC3',
        database: 'zhaltur'
    });

    // connection.connect();

module.exports.read = function(sql, cb) {
    pool.getConnection(function(err, connection) {
        if(err) { throw err }

        connection.query( sql, function( error, result, fields ) {
            connection.release();
            if( error ) { throw error }
            cb(result);
        });
    });
};

module.exports.query = function(sql, data, cb) {
    pool.getConnection(function(err, connection) {
        if(err) { throw err }

        connection.query( sql, data, function( error, result, fields ) {
            if( error ) { console.log(error); throw error }
            connection.release();
            cb(result);
        });

    });
};

module.exports.insert = function(sql, data, cb) {
    pool.getConnection(function(err, connection) {
        if(err) { throw err }

        data.forEach( function( item ) {
            connection.query( sql, item, function( error, result, fields ) {
                if( error ) { console.log(error); throw error }
                cb(result);
            });
        });
        connection.release();
    });
};

module.exports.transaction = function() {return pool};


/*
var data = [
    { name: "Ералиев Арман", position: 'Начальник партии' },
    { name: 'Бисалиев Рустем', position: 'Начальник партии' }
];

data.forEach( function( item ) {

    var query = connection.query( 'insert into employees set ?', item, function( err, result, fields ) {
        if ( err ) throw err;

        console.log( query.sql );
        console.log( result.insertId );
    });
});

connection.query( 'select * from pipes', function ( err, rows, fields ) {
    if ( err ) throw err

    console.log( rows );
});

connection.query( 'select * from employees', function ( err, rows, fields ) {
    if ( err ) throw err

    console.log( rows );
});
*/
