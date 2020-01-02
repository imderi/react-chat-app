var express = require('express');
var router = express.Router();
const Chat = require('../models/chat')

router.get('/', (req, res, next) => {
  res.send('API');
});

// GET CHAT DATA ROUTE
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

// POST NEW CHAT ROUTE
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

// DELETE ROUTE
router.delete('/chat/:id', (req, res, next) => {
  Chat.deleteMany({id: req.params.id})
  .then(item => {
    res.json({
      error: false,
      deleted: item
    })
  }).catch(err => {
    res.json({
      error: true,
      message: err
    })
  })
});


module.exports = router;
