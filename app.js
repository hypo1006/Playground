const express = require('express');
const app = express();


const myLogger = function (req, res, next) {
  responseText = 'Requested at: ' + req.requestTime + '';
  console.log('LOGGED: ' + responseText);
  next(); // Call the next middleware in the stack.
};

app.use(myLogger); // Execute myLogger.

// End the request-response cycle.
app.get('/', (req, res) => res.send('Hello World!'));

app.listen(3000);