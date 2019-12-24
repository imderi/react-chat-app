var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// MONGOOSE
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/reactchat', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}).then(()=> console.log("Connect"));
// SERVER, BODY PARSER & SOCKET IO
// var bodyParser = require('body-parser');
var server = require('http').Server(app);
var io = require('socket.io')(server);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var chatRouter = require('./routes/chat');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', function (socket){
  socket.on('typing', (typer)=> {
    socket.broadcast.emit('typing', typer);
  });

  socket.on('stop typing', ()=> {
    socket.broadcast.emit('stop typing');
  });

  socket.on('add chat', (chatData = {})=> {
    socket.broadcast.emit('loat chat', chatData);
  });

  socket.on('delete chat', id => {
    socket.broadcast.emit('delete chat', id);
  });

});


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/', chatRouter);


module.exports = app;
