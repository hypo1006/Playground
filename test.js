const { request } = require('express');
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
app.use(express.json());



app.get('/boards', (req, res) => {
    connection.query('select * from board', function (error, results) {
        if (error) throw error;
        res.render('list',{'data':results})
    });
}) // 목록 검색



app.get('/board/:board_no', function(req,res){
    var sql = "SELECT * FROM board WHERE board_no = ?"; 

    connection.query(sql,[req.params.board_no],function(err, results){  
        if (err) throw err;
        res.render('list',{'data':results})
        console.log(results);
    });
}); // 특정 목록 검색


app.delete('/board/:board_no', (req,res) => {
    var sql = "DELETE FROM board WHERE board_no = ?"; 

    connection.query(sql,[req.params.board_no],function(err, results){  
        if (err) throw err;
        console.log(results) 
        res.redirect('/board/list'); 
    });
})

app.put('/board/:board_no', function(req,res){ 
    const no = req.params.board_no;
    const title = req.body.title;
    const contents = req.body.contents;

    var sql = "UPDATE board set title = ?,  contents = ? where board_no = ?";

    connection.query(sql, [title, contents,board_no], (err,results) => {  
        if(err)
        {
            console.log(err);
        }else{
            res.send("UPDATE!!");
        }
    })
}); // 목록 업데이트


app.post('/board/:board_no', function(req,res){ 
    const board_no = req.params.board_no;
    const title = req.body.title;
    const contents = req.body.contents;
    const user_id = req.body.user_id;
    const board_date = req.body.board_date;

    var sql = "insert into board values(?, ?, ?, ?, ?);";

    connection.query(sql, [board_no, title, contents, user_id, board_date], (err,results) => {  
        if(err)
        {
            console.log(err);
        }else{
            res.send("Insert Completed");
        }
    })
});

app.listen(port, () => {
    console.log('앱 실행중,,,')
})

