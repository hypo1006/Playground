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

// app.post('/index', function(req, res){   
//     var data = req.body.des 
//     var query = db.query('INSERT INTO user (des) VALUES (?)',[    
//         data
//     ])
// });

app.get('/GET/list', (req, res) => {
    connection.query('select * from board', function (error, results) {
        if (error) throw error;
        res.render('list',{'data':results})
    });
}) // 목록 검색



app.get('/GET/:no', function(req,res){
    var sql = "SELECT * FROM board WHERE NO = ?"; 

    connection.query(sql,[req.params.no],function(err, results, fields){  
        if (err) throw err;
        res.render('list',{'data':results})
        console.log(results);
    });
}); // 특정 목록 검색



app.get('/DELETE/:no', function(req,res){
    var sql = "DELETE FROM board WHERE NO = ?"; 

    connection.query(sql,[req.params.no],function(err, results, fields){  
        if (err) throw err;
        console.log(results) 
        res.redirect('/GET/list'); 
    });
}); // 목록 삭제

app.get('/UPDATE/:no', function(req,res){ 
    var sql = "SELECT * FROM board WHERE no = ?";
    
    connection.query(sql, [req.params.no],function(err, results, fields){
        if (err) throw err;
        console.log(results);
        res.render('update',{board : results}); // 쿼리문 날린 results 값을 users 란 key 에 담기 
        res.redirect('/GET/list'); 
    });
}); // 목록 업데이트



app.listen(port, () => {
    console.log('앱 실행중,,,')
})

