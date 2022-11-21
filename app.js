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



app.get('/board/list', (req, res) => {
    connection.query('select * from board', function (error, results) {
        if (error) throw error;
        res.render('list',{'data':results})
    });
}) // 목록 검색



app.get('/board/list/:no', function(req,res){
    var sql = "SELECT * FROM board WHERE NO = ?"; 

    connection.query(sql,[req.params.no],function(err, results, fields){  
        if (err) throw err;
        res.render('list',{'data':results})
        console.log(results);
    });
}); // 특정 목록 검색


app.delete('/board/list/:no', (req,res) => {
    var sql = "DELETE FROM board WHERE NO = ?"; 

    connection.query(sql,[req.params.no],function(err, results, fields){  
        if (err) throw err;
        console.log(results) 
        res.redirect('/board/list'); 
    });
})

// app.get('/board/list/:no', function(req,res){ 
//     var sql = "SELECT * FROM board WHERE no = ?";
    
//     connection.query(sql, [req.params.no],function(err, results, fields){
//         if (err) throw err;
//         console.log(results);
//         res.render('update',{board : results});
    
//     });
// }); // 목록 업데이트

app.post('/update/2', function(req, res){   
    var sql = "UPDATE board set no = ? where contents = ?" 

    connection.query(sql, req.body, function(err,results,fields){  
        if (err) throw err;
        console.log(results);       
        res.redirect('/board/list')
    })
});




app.listen(port, () => {
    console.log('앱 실행중,,,')
})

