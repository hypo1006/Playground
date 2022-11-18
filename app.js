const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql2');



const conn = {
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '1234',
    database: 'playground'
 };

 let connection = mysql.createConnection(conn);
 connection.connect();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index.html')
})

app.get('/list', (req, res) => {
    connection.query('select * from board', function (error, results) {
        if (error) throw error;
        res.render('list',{'data':results})
    });
})

app.listen(port, () => {
    console.log('앱 실행중,,,')
})

