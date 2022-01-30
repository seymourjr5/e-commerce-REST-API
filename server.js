const express = require('express');
const app = express();

module.exports = app;



//body-parser express middleware
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//base router set-up
const apiRouter = require('./routes/api');
app.use('/', apiRouter);




const PORT = process.env.PORT || 4001;

app.listen(PORT, () =>console.log(`Listening on port: ${PORT}`));