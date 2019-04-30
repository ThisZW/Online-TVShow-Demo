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

router.get('/user/:id', (req, res) => {
  Show.findAll.where({
    userId: req.param.id
  }).then( shows =>{
    res.json(shows)
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
    console.log(err)
  })
})

module.exports = router
