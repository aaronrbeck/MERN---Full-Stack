//Express working as the server
const express = require('express');
const morgan = require('morgan');
const path = require('path')
const app = express();

const { mongoose} = require('./database')

//Settings
//-> give the variable of the port that will be in use
app.set('port', process.env.PORT || 3000);
//Middlewares
app.use(morgan('dev'));
app.use(express.json());
//Routes
app.use('/api/tasks' ,require('./routes/routes'))
//Static files
//Finds the HTML
//(_dirname) finds the whole path
app.use(express.static(path.join(__dirname, 'public')))
// Starting the server
// -> getting the variable of the port
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`)
})