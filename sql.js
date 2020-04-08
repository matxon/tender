    var mysql = require( 'mysql' );
    var pool = mysql.createPool({
    // var pool = mysql.createConnection({
        connectionLimit : 10,
        host: 'localhost',
        user: 'root',
        password: 'DbyljeC3',
        database: 'pipe'
    });

    // connection.connect();

module.exports.read = function(sql, cb) {
    pool.getConnection(function(err, connection) {
        if(err) {
            console.log(err); 
            cb({error: 'error'});
            return;
        }

        connection.query( sql, function( error, result, fields ) {
            connection.release();
            if( error ) {
                console.log( error );
                cb({error: 'error'});
                return;
            }
            cb(result);
        });
    });
}

module.exports.insert = function(sql, data, cb) {
    pool.getConnection(function(err, connection) {
        if(err) {
            console.log(err); 
            cb({error: 'error'});
            return;
        }

        data.forEach( function( item ) {
            connection.query( sql, item, function( error, result, fields ) {
                if( error ) {
                    console.log( error );
                    cb({error: 'error'});
                    return;
                }
                cb(result);
            });
        });
        connection.release();
    });
}


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

