var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// MONGOOSE
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/reactchat', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}).then(()=> console.log("Connect"));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var chatRouter = require('./routes/chat');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/chat', chatRouter);


module.exports = app;
