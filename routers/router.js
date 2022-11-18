
const express = require('express');
const { append } = require('vary');
const router = express.Router();
const connection = require('../connection');

app.get('/', (req, res) => {
    connection.query('select * from board', function (error, results, fields) {
        if (error) throw error;
        res.render('list',{'data':results})
    });
});

module.exports = router;