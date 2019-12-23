var express = require('express');
var router = express.Router();
const Chat = require('../models/chat')

router.get('/', (req, res, next) => {
  res.send('API');
});


router.get('/chat', (req, res, next) => {
  Chat.find()
  .then(item => {
    res.json({
      error: false,
      listed: item
    })
  }).catch(err => {
    res.json({
      error: true,
      message: err
    })
  })
});


router.post('/chat', (req, res, next) => {
  Chat.create({id: Date.now(),user: req.body.user, message: req.body.message})
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

router.delete('/chat:id', (req, res, next) => {
  Chat.deleteMany({id: req.params.id })
  .then(item => {
    res.json({
      error: false,
      deleted: item
    })
  })
})


module.exports = router;
