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



app.post('/', function(req, res){   //  3000/index 로 post 요청 , templates 파일 action 과 동일한 URI
    var sql = "INSERT INTO board SET ?" // sql 이란 변수안에 쿼리문 날리기

    connection.query(sql, req.body, function(err,results,fields){  // 연결할 데이터베이스 변수명 db 로 설정해둿음 맨위에
        if (err) throw err;
        console.log(results);       // index.ejs 하고 입력창 및 form 연동
    })
}); // SQL에 입력



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



app.get('/UPDATE/:no', function(req,res){ // 수정링크를 타고 들어온 데이터의 id 값과 des 값을 받아서 update ejs 파일로 넘긴다
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

