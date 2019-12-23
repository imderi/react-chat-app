var express = require('express');
var router = express.Router();
const Chat = require('../models/chat')

router.get('/', (req, res, next) => {
  res.send('API');
});


router.get('/chat', (req, res, next) => {
  res.send('API');
});


router.post('/chat', (req, res, next) => {
  Chat.create({name: req.body.user, message: req.body.message})
  .then(item => {
    res.json({
      error: false,
      added: item
    })
  }).catch(err => {
    res.json({
      error: true,
      message: err
    })
  })
});

module.exports = router;
