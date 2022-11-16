const express    = require('express');
const mysql      = require('mysql2');
const dbconfig   = require('c:/Education/Playground/database.js');
const connection = mysql.createConnection(dbconfig);

const app = express();

// configuration =========================
app.set('port', process.env.PORT || 3333);


app.get('/api/get', (req, res) => {
  connection.query('SELECT * from title', (error, rows) => {
    
  });
});

app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});