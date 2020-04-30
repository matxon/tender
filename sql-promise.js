    const mysql = require( 'mysql2/promise' );
    const pool = mysql.createPool({
        connectionLimit : 100,
        host: 'localhost',
        user: 'root',
        password: 'DbyljeC3',
        database: 'zhaltur'
    });


module.exports.read = function(sql, cb) {
    pool.getConnection()
        .then(con => {
            const result = con.query(sql);
            con.release();
            return result;
        })
        .then( result => cb(result[0]))
        .catch( err => {console.log(err); throw err });
};

module.exports.query = function(sql, data, cb) {
    pool.getConnection()
        .then(con => {
            const result = con.query(sql, data);
            con.release();
            return result;
        })
        .then( result => cb(result[0]))
        .catch( err => {console.log(err); throw err });
};

module.exports.insert = function(sql, data, cb) {
    pool.getConnection()
        .then(con => {
            const result = con.query(sql, data);
            con.release();
            return result;
        })
        .then( result => cb(result[0]))
        .catch( err => console.log(err));
};

module.exports.transaction = function() {return pool};
