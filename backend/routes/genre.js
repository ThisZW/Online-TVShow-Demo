var express = require('express')
var router = express.Router()

const { User, Show, Genre, Comment } = require('../models')

router.get('/list', (req, res) => {
  Genre.findAll()
  .then( genres => {
    res.json(genres)
  }).catch(err => {
    res.status(500).send({error: err})
  })
})

module.exports = router
