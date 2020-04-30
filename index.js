const express    = require('express');
const mysql      = require('./sql-promise');
const bodyParser = require('body-parser');
const session    = require('express-session');
const multer     = require('multer');

const app = express();
const router = express.Router();
const upload = multer();            //for parsing multipart/form-data

// app.set

app.set('views', './views');
app.set('view engine', 'ejs');

// middleware

app.use( express.static( 'public' ) );
app.use(bodyParser.json());                             // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));     // for parsing application/x-www-form-urlencoded
app.use(session({
    secret: 'changethissecretkey',
    resave: true,
    saveUninitialized: false
}));

// function escapeHtml

const escapeHtml = (function () {
    'use strict';
    const chr = {'"': '&quot;', '&': '&amp;', '<': '&lt;', '>': '&gt;'};
    return function (text) {
        return text.replace(/[\"&<>]/g, function (a) {
            return chr[a];
        });
    };
}());



/*
 login
 TODO:
        1. Public-те index.html тұрған кезде бұл роутер жұмыс істемейді
           сондықтан html генератор арқылы жасау керек
        2. Генератор салынды.
*/

data = {
    title: "OrdersBase",
    nav: {
        item: ['Dashboard', 'Requests', 'Quotations', 'Purchase Orders', 'Customers', 'Companies', 'Users', 'Privileges'],
        icon: ['home', 'file', 'shopping-cart', 'shopping-bag', 'users', 'bar-chart-2', 'layers', 'lock'],
        script: ['demo', 'requests', 'quotations', 'dashboard.html', 'customers', 'companies.html', 'users', 'privileges.html' ],
        current: 0  // осы қасиеттін алып тастауға болады
    }
}

app.get('/', function( req, res ) {

    if( req.session && req.session.login) {
        console.log(req.url);
        res.render('index', data);
    }
    else {
        console.log(req.url);
        res.render('login', data);
    }
});

app.post('/demo', function (req,res) {
    console.log(req.url);
    res.render('demo');
})

app.post('/requests', function (req,res) {
    console.log(req.url);
    res.render('requests');
})

app.post('/customers', function (req,res) {
    console.log(req.url);
    res.render('customers');
})

app.post('/users', function (req,res) {
    console.log(req.url);
    res.render('users');
})

app.post('/quotations', function (req,res) {
    console.log(req.url);
    res.render('quotations');
})

/*
 * TODO
 *  User, password
 *  Сессия арқылы авторизация жасауды ұйымдастыру. Қауіпсіз жағын қарастыру керек
 *  Бұл жер бұзып кіретін жерлердің бірі.
 *
 *  Серверге запрос келген сайын клиенттің авторизациядан өткен-өтпегенін тексеріп тұру қажет
 */
app.post('/login', ( req, res ) => {

    if( req.body.email /*=== 'kmadi@inbox.ru' &&
        req.body.password === '12345'*/) {
        req.session.login = true;
        console.log(req.url);
        res.send('true');
    } else {
        req.session.login = false;
        console.log(req.url);
        res.send('false');
    }
});

app.post('/step2', function (req, res) {
   let count = req.body.count;
    console.log(req.url);
   res.render('step2', {count: count});
});

app.post('/step3', function (req, res) {
    let count = req.body.count;
    console.log(req.url);
    res.render('step3', {count: count});
});

app.post('/wizard', function (req, res) {
    console.log(req.url);
    step = req.body.step_number;
    if ( step == 0) res.render('step1');
    if ( step == 1) res.render('step2-1');
    if ( step == 2) res.render('step3-1', {count: 1});
    if ( step == 3) res.send('step 4');
});

app.post('/step2-1', function (req, res) {
    console.log(req.url);
    res.render('step2-1');
});

// tender-view
app.post('/requests-view', ( req, res ) => {
    let query = "select tender_id,date_format(start_date, '%d.%m.%Y') as start_date, " +
        "date_format(end_date, '%d.%m.%Y') as end_date,tender_name,customer_name,contact_name,user_name,company_name,status " +
        "from tenders join customers on tenders.customer_id = customers.customer_id join contacts on tenders.contact_id = contacts.contact_id " +
        "join companies on tenders.company_id = companies.company_id " +
        "left join users on tenders.user_id = users.user_id ";
    mysql.read(query, function(result) {
        console.log(req.url);
        res.send( {"data": result } );
    });
});

// tenders-view for smartWizard
app.post('/tenders-view', function ( req, res ) {
    let sql = "select tender_id, concat(date_format(start_date, '%d-%m-%Y'),' ', tender_name) as tender_name from tenders";

    mysql.read( sql, function ( result ) {
        console.log(req.url);
        res.send({data: result});
    });
});

// tenders-view for smartWizard
app.post('/suppliers-view', function ( req, res ) {
    let sql = "select supplier_id, supplier_name from suppliers";

    mysql.read( sql, function ( result ) {
        console.log(req.url);
        res.send({data: result});
    });
});

app.post('/request-add', function( req, res ) {
    console.log(req.url);
    console.log(req.body);      // debug
    let data = req.body;
    let tender = [{
        start_date: escapeHtml(data.start_date),
        end_date: escapeHtml(data.end_date) || null,
        company_id: escapeHtml(data.company_id),
        user_id: escapeHtml(data.user_id),
        customer_id: escapeHtml(data.customer_id),
        contact_id: escapeHtml(data.contact_id),
        tender_name: escapeHtml(data.tender_name)
    }];

    let con;    // connection
    let pool = mysql.transaction();

    const promise = pool.getConnection()
    .then( connection => con = connection )
    .then(() => con.query('start transaction'))
    .then( res => con.query('insert into tenders set ?', tender))
    .then( res => {
        tender = tender[0];
        tender.tender_id = res[0].insertId;
        return con.query('insert into link_tender set ?', [{tender_id: res[0].insertId}])
    })
    .then( () => con.query('commit'))
    .then( () => con.release() )
    .then( () => res.send({data: tender}))
    .catch( err => {
        console.log(err);
        con.query('rollback');
        res.send(err)
    });
});

app.post('/request-view-id', function ( req, res ) {
    console.log(req.url);
    let tender_id = [req.body.tender_id];

    sql = "select tenders.tender_id, customer_id, contact_id, tender_name, date_format(start_date, '%Y-%m-%d') as start_date, date_format(end_date, '%Y-%m-%d') as end_date, user_id, status, " +
        "company_id, link_tender_id, proposal_id, purchase_id "+
        "from tenders join link_tender on tenders.tender_id = link_tender.tender_id " +
        "where tenders.tender_id = ?";
    //console.log(sql);

    mysql.query( sql, tender_id, function( result ) {
        res.send({ "data": result });
    });
});

app.post('/request-save', function (req, res) {
    console.log(req.url);
    console.log(req.body);

    let tender;
    let data = req.body;
    let tender_id = { tender_id: escapeHtml(data.tender_id) };

    tender = {
        //start_date: escapeHtml(data.start_date),                  // becouse start_date attribute is disabled
        end_date: escapeHtml(data.end_date) || null,
        company_id: escapeHtml(data.company_id),
        //customer_id: escapeHtml(data.customer_id),                // customer_is is disabled
        contact_id: escapeHtml(data.contact_id),
        user_id: escapeHtml(data.user_id),
        tender_name: escapeHtml(data.tender_name)
    };

    sql = 'update tenders set ? where ?';

    mysql.query( sql, [tender, tender_id], function( result ) {
        res.send({ "data": result });
    });

});

app.post('/modal-add-request', function ( req, res ) {
    // let tender_id = [req.body.tender_id];
    //console.log(tender_id);
    console.log(req.url);

    // let tender;
    let user;
    let company;
    let customer;

    // sql = "select tenders.tender_id, customer_id, contact_id, tender_name, date_format(start_date, '%Y-%m-%d') as start_date, date_format(end_date, '%Y-%m-%d') as end_date, user_id, status, " +
    //     "company_id, link_tender_id, proposal_id, purchase_id "+
    //     "from tenders join link_tender on tenders.tender_id = link_tender.tender_id " +
    //     "where tenders.tender_id = ?";



    // mysql.query( sql, tender_id, function( result ) {
    //     tender = result[0];                                             // Object
        sql = "select user_id, user_name from users";

        mysql.read( sql, function( result ) {
            user = result;                                              // Array

            sql = "select * from companies";

            mysql.read( sql, function( result ) {
                company = result;                                       // Array

                sql = "select * from customers";

                mysql.read( sql, function ( result ) {
                    customer = result;                               // Object

                    // sql = "select * from contacts join link_table on link_table.link_id = contacts.link_id where customer_id = " + tender.customer_id;
                    //
                    // mysql.query( sql, null, function( result ) {                // result is Array
    //console.log(customer);
                        res.render('modal-add-request', { company, customer, user });
                    // });
                });
            });
        });


    //});
});

app.post('/modal-edit-request', function ( req, res ) {
    console.log(req.url);
    let tender_id = [req.body.data];
    //console.log(tender_id);

    let tender;
    let user;
    let company;
    let customer;

    sql = "select tenders.tender_id, customer_id, contact_id, tender_name, date_format(start_date, '%Y-%m-%d') as start_date, date_format(end_date, '%Y-%m-%d') as end_date, user_id, status, " +
        "company_id, link_tender_id, quotation_id, purchase_id "+
        "from tenders join link_tender on tenders.tender_id = link_tender.tender_id " +
        "where tenders.tender_id = ?";



    mysql.query( sql, tender_id, function( result ) {
        tender = result[0];                                             // Object
        sql = "select user_id, user_name from users";

        mysql.read( sql, function( result ) {
            user = result;                                              // Array

            sql = "select * from companies";

            mysql.read( sql, function( result ) {
                company = result;                                       // Array

                sql = "select * from customers where customer_id = " + tender.customer_id;

                mysql.read( sql, function ( result ) {
                    customer = result[0];                               // Object

                    sql = "select * from contacts join link_table on link_table.link_id = contacts.link_id where customer_id = " + tender.customer_id;

                    mysql.query( sql, null, function( result ) {                // result is Array

                        res.render('modal-edit-request', { tender: tender, company: company, customer: customer, user: user, contact: result });
                    });
                });
            });
        });


    });
});

app.post('/supplier-add', ( req, res ) => {
    console.log(req.url);
    supplier = [{
        supplier_name: escapeHtml(req.body.supplier_name),
        profile: escapeHtml(req.body.profile),
        web_address: escapeHtml(req.body.web_address),
        address: escapeHtml(req.body.address)
    }];
    req.body.name = req.body.name || [];

    let con;    // connection
    let pool = mysql.transaction();

    const promise = pool.getConnection()
        .then( connection => con = connection )
        .then(() => con.query('start transaction'))
        .then( res => con.query('insert into suppliers set ?', supplier))
        .then( res => {
            supplier = supplier[0];
            supplier.supplier_id = res[0].insertId;
            return con.query('insert into link_table set ?', [{supplier_id: res[0].insertId}])
        })
        .then( async res => {
            let link_id = res[0].insertId;

            for (let i = 0; i < req.body.name.length; i++) {
                details = [{ position: escapeHtml(req.body.position[i]), contact_name: escapeHtml(req.body.name[i]), link_id }];
                console.log(details);
                res = await con.query('insert into contacts set ?', details);

                let sql = '';
                let contacts = [];

                if (req.body.email[i])
                    contacts.push(`('email', '${req.body.email[i]}', '${res[0].insertId}')`);
                if (req.body.mobile[i])
                    contacts.push(`('mobile', '${req.body.mobile[i]}', '${res[0].insertId}')`);
                if (req.body.tel[i])
                    contacts.push(`('tel', '${req.body.tel[i]}', '${res[0].insertId}')`);

                if (contacts.length > 0) {
                    sql = "insert into details (contact_type, nameornumber, contact_id) values " + contacts.join(',');
                    console.log(sql);
                    await con.query(sql)
                }
            }
        })
        .then( () => con.query('commit'))
        .then( () => con.release() )
        .then( () => res.send({data: supplier}) )
        .catch( err => {
            console.log(err);
            con.query('rollback');
            res.send(err)
        });
});

/*
 *  Әзірге ойдағыдай жасап тұр
 *  Requests-те тұрғанда жаңадан заявка енгізетін кезде таңдап алынған Заказчикке редактирование жасау үшін
 *  modal-edit-customer пайдаланылады. Сол модал мәліметтерді алғанда осы URL адрестен алады.
 */
app.post('/modal-edit-customer', ( req, res ) => {
    console.log(req.url);
    console.log(req.body);

    let customer = { customer_id: escapeHtml(req.body.data)};
    let contact;
    let details;

    //customer = {customer_name: escapeHtml(req.body.customer_name), address: escapeHtml(req.body.address)}];
    //req.body.name = req.body.name || [];

    let con;    // connection
    let pool = mysql.transaction();

    pool.getConnection()
    .then( connection => con = connection )
    //.then(() => con.query('start transaction'))
    .then( res => con.query('select customers.customer_id, customer_name, address, link_id from customers, link_table where customers.customer_id = link_table.customer_id and customers.customer_id = ?', [customer.customer_id ]))
    .then( res => {
        customer = res[0][0];
        console.log("customer");
        console.log(customer);
        return con.query('select contact_id from contacts where link_id = ?', [customer.link_id]);
    })
    .then( res => {
        contact = res[0];
        id = [];
        for (i=0; i<contact.length; i++) {
            id.push(contact[i].contact_id);
        }
        console.log(contact);
        sql = 'SELECT contacts.contact_id,position,contact_name,(IF(contact_type = "email",nameornumber,NULL)) AS email,' +
            'SUM(IF(contact_type = "mobile",nameornumber,NULL)) AS mobile,' +
            'SUM(IF(contact_type = "tel",nameornumber,NULL)) AS tel FROM contacts left join details on contacts.contact_id=' +
            'details.contact_id WHERE contacts.contact_id IN ("' + id.join('","') + '") GROUP BY contacts.contact_id';
        return con.query(sql);
    })
    //.then( () => con.query('commit'))
    .then( (res) => {
        con.release();
        details = res[0];
        console.log(details);
    })
    .then( () => res.render('modal-edit-customer', {customer, details, container: req.body.container}) )
    .catch( err => {
        console.log(err);
        con.query('rollback');
        res.send(err)
    });
})

/*
 *
 */
app.post('/modal-add-customer', ( req, res ) => {
    console.log(req.url);
    res.render('modal-add-customer');
})

app.post('/modal-edit-user', function ( req, res ) {
    console.log(req.url);
    let user_id = [req.body.data];

    let user;
    let company;

    sql = "select * from users where user_id = ?";

    mysql.query( sql, user_id, function( result ) {
        user = result[0];                                             // Object

        sql = "select * from companies";
        mysql.read( sql, function( result ) {
            company = result;                                          // Array
            res.render('modal-edit-user', { user, company });
        });


    });
});

app.post('/modal-add-user', function ( req, res ) {

    console.log(req.url);
    let company;

    sql = "select * from companies";

    mysql.read( sql, function( result ) {
        company = result;                                       // Array
        res.render('modal-add-user', { company });
    });
});

app.post('/modal-add-supplier', (req, res) => {
    console.log(req.url);
    res.render('modal-add-supplier');
})


app.post('/customer-add', ( req, res ) => {
    console.log(req.url);
    console.log('=========== start of query "customer-add" =============');
    console.log(req.body)
    customer = [{customer_name: escapeHtml(req.body.customer_name), address: escapeHtml(req.body.address)}];
    req.body.name = req.body.name || [];

    let con;    // connection
    let pool = mysql.transaction();

    pool.getConnection()
    .then( connection => con = connection )
    .then(() => con.query('start transaction'))
    .then( res => con.query('insert into customers set ?', customer))
    .then( res => {
        customer = customer[0];
        customer.customer_id = res[0].insertId;
        return con.query('insert into link_table set ?', [{customer_id: res[0].insertId}]);
    })
    .then( async res => {
        let link_id = res[0].insertId;

        for (let i = 0; i < req.body.name.length; i++) {
            details = [{ position: escapeHtml(req.body.position[i]), contact_name: escapeHtml(req.body.name[i]), link_id }];
            console.log(details);
            res = await con.query('insert into contacts set ?', details);

            let sql = '';
            let contacts = [];

            if (req.body.email[i])
                contacts.push(`('email', '${req.body.email[i]}', '${res[0].insertId}')`);
            if (req.body.mobile[i])
                contacts.push(`('mobile', '${req.body.mobile[i]}', '${res[0].insertId}')`);
            if (req.body.tel[i])
                contacts.push(`('tel', '${req.body.tel[i]}', '${res[0].insertId}')`);

            if (contacts.length > 0) {
                sql = "insert into details (contact_type, nameornumber, contact_id) values " + contacts.join(',');
                console.log(sql);
                await con.query(sql)
            }
        }
    })
    .then( () => {
        con.query('commit');
        console.log("--------- commit -----------");
    })
    .then( () => con.release() )
    .then( () => {
        res.send(customer);
        console.log('----------- end of query "customer-add" -----------');
    } )
    .catch( err => {
        console.log(err);
        con.query('rollback');
        res.send(err)
    });
});

/*
 *  Әзірге ойдағыдай жасап тұр
 *  Requests-те тұрғанда жаңадан заявка енгізетін кезде таңдап алынған Заказчикке редактирование жасау үшін
 *  modal-edit-customer пайдаланылады. Сол модал мәліметтерді қайта жазғанда осы URL адреске жібереді.
 */
app.post('/customer-edit', ( req, res ) => {
    console.log(req.url);
    console.log('=========== start of query "customer-edit" =============');
    console.log(req.body);
    customer = [{
        customer_name: escapeHtml(req.body.customer_name),
        address: escapeHtml(req.body.address)
    }];

    let con;    // connection
    let pool = mysql.transaction();

    pool.getConnection()
        .then( connection => con = connection )
        .then(() => con.query('start transaction'))
        .then(() => con.query(`update customers set ? where customer_id = ${req.body.customer_id}`, customer))
        .then(async () => {
            if(req.body.contact_id) {
                await con.query("delete from details where contact_id in ('" + req.body.contact_id.join("','") + "')");
                console.log("delete from details where contact_id in ('" + req.body.contact_id.join("','") + "')");
            }
                req.body.contact_id = req.body.contact_id || [];

                for (i = 0; i < req.body.name.length; i++) {

                    if (req.body.contact_id.length)
                        await con.query(`update contacts set position='${req.body.position[i]}',contact_name='${req.body.name[i]}' where contact_id='${req.body.contact_id.shift()}'`);
                    else {
                        result = await con.query(`insert into contacts (position, contact_name, link_id) values ('${req.body.position[i]}','${req.body.name[i]}', '${req.body.link_id}')`);
                        req.body.contact_id[i] = result[0].insertId;
                        console.log(result);
                    }


                    let sql = '';
                    let contacts = [];

                    if (req.body.email[i])
                        contacts.push(`('email', '${req.body.email[i]}', '${req.body.contact_id[i]}')`);
                    if (req.body.mobile[i])
                        contacts.push(`('mobile', '${req.body.mobile[i]}', '${req.body.contact_id[i]}')`);
                    if (req.body.tel[i])
                        contacts.push(`('tel', '${req.body.tel[i]}', '${req.body.contact_id[i]}')`);

                    if (contacts.length > 0) {
                        sql = "insert into details (contact_type, nameornumber, contact_id) values " + contacts.join(',');
                        console.log(sql)
                        await con.query(sql)
                    }
                }

        })
        .then( () => {
            con.query('commit');
            console.log("--------- commit -----------");
        })
        .then( () => con.release() )
        .then( () => {
            customer = customer[0];
            customer.customer_id = req.body.customer_id;
            console.log('----------- end of query "customer-edit" -----------');
            res.send(customer)
        })
        .catch( err => {
            console.log(err);
            con.query('rollback');
            res.send(err)
        });
});


// customers-view
app.post('/customers-view', ( req, res ) => {
    console.log(req.url);
    mysql.read(`select * from customers`, function(result) {
        res.send( {"data": result } );
    });
});

app.post('/customer-contacts', ( req, res ) => {
    console.log(req.url);
    if (req.body.customer_id) {
        var sql = 'select contact_id, contact_name from contacts join link_table on contacts.link_id = link_table.link_id ' +
            'join customers on customers.customer_id = link_table.customer_id ' +
            'where customers.customer_id = ' + escapeHtml( req.body.customer_id );
        mysql.read(sql, function(result) {
            
            res.send( {"data": result } );
        });
    } else {
        res.send( { "data": "" });
    }
});

// companies-view
app.post('/companies-view', ( req, res ) => {
    console.log(req.url);
    mysql.read(`select * from companies`, function(result) {
        res.send( {"data": result } );
    });
});

app.post('/company-add', ( req, res ) => {
    console.log(req.url);
    var company_name = [ { company_name: escapeHtml(req.body.company_name) } ];

    mysql.insert('insert into companies set ?', company_name, function(result){
        res.send();
    });
});

// companies-view
app.post('/users-view', ( req, res ) => {
    console.log(req.url);
    mysql.read(`select user_id,user_name,email,company_name from users,companies where companies.company_id = users.company_id`, function(result) {
        res.send( {"data": result } );
    });
});

app.post('/user-edit', ( req, res ) => {
    console.log(req.url);

    var user = [{
        user_name: escapeHtml(req.body.user_name),
        email: escapeHtml(req.body.email),
        password: escapeHtml(req.body.password),
        //cos_id: escapeHtml(req.body.cos_id),
        company_id: escapeHtml(req.body.company_id)
    }];

    mysql.query(`update users set ? where user_id = ${req.body.user_id}`, user, function(result) {
        res.send();
    });
});

app.post('/user-add', ( req, res ) => {
    console.log(req.url);
    var user = [{
        user_name: escapeHtml(req.body.user_name),
        email: escapeHtml(req.body.email),
        password: escapeHtml(req.body.password),
        cos_id: escapeHtml(req.body.cos_id),
        company_id: escapeHtml(req.body.company_id)
    }];
    
    mysql.insert('insert into users set ?', user, function(result) {
        res.send();
    });
});

app.post('/privileges-view', ( req, res ) => {
    console.log(req.url);
    mysql.read(`select * from cos`, function(result) {
        res.send( {"data": result } );
    });
});



app.listen( 3000, function() {
    console.log( new Date() + ' Listen on port 3000!' );
});
