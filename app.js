const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const produtoRoutes = require('./rotas/produtos');
const mongoose = require('mongoose');
app.use(morgan('dev'));

mongoose.connect('mongodb+srv://UnidescApi-Deivid:deivid@unidescapi.x594c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true})

//Tratamento do cors
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method == "OPTIONS"){
        req.header("Access-Control-Allow-Methods", "PUT, POST, PATH, GET, DELETE");
        return res.status(200).json({});
    }
    next();
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/produtos', produtoRoutes);


app.use((req, res, next)=>{
    const error = new Error('not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
           message: error.message 
        }
    });
});

module.exports = app;