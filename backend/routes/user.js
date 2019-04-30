const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs')

const { User, Show, Genre, Comment } = require('../models')


router.get('/list', (req, res, next) => {
  User.findAll({
    include: [ Show ]
  }).then( users => {
    res.json(users)
  }).catch( err => {
    res.status(500).send({error: err})
  })
});

router.get('/:id(\d+)', (req, res, next) => {
  User.findByPk(
    req.params.id
  ).then( user => {
    res.json(user)
  }).catch( err => {
    res.status(500).send({error: err})
  })
})

router.post('/login', (req, res, next) => {
  User.findOrCreate({where: {username: req.body.username}}
  ).then( ([user, created]) => {
    res.json(user)
  }).catch( err => {
    res.status(500).send({error: err})
  })
})


module.exports = router
