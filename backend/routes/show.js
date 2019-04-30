const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs')

const multer  = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/images'))
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname) //Appending extension
  }
})

const upload = multer({ storage: storage })

const { User, Show, Genre, Comment } = require('../models')

router.get('/:id(\\d+)', (req, res) => {
  Show.findOne({
    where: {
      id: req.params.id
    },
    include: [
      { model: Comment, include: [ User ]},
      User,
      Genre ]
  }).then(show=> {
    res.json(show)
  }).catch(err => {
    res.status(500).send(err)
  })
})

router.get('/user/:id(\\d+)', (req, res) => {
  Show.findAll({
    include: [ Genre ],
    where: {
      userId: req.params.id
    }
  }).then( shows =>{
    res.json(shows)
  }).catch(err => {
    res.status(500).send(err)
  })
})

router.get('/list', (req, res) => {
  Show.findAll({
    include: [ User ],
    attributes: ['title', 'userId']
  }).then( shows => {
    if(shows){
      let obj = {}
      shows.forEach( show => {
        if(!obj.hasOwnProperty(show.title))
          obj[show.title] = []
        obj[show.title].push(show.User)
      })
      res.json(obj)
    } else {
      throw "empty table"
    }
  }).catch(err => {
    res.status(500).send(err)
  })
})

router.post('/add-show', upload.single('image'), (req, res) => {
  const filename = req.file.filename
  const { title, genreId, userId } = req.body 
  Show.findOrCreate({
    where: {
      title, 
      userId
    },
    defaults: {
      genreId,
      imgUrl: filename
    }
  }).then( show =>{
    console.log(show)
    res.send('success')
  }).catch( err => {
    res.status(500).send(err)
  })
})

module.exports = router
