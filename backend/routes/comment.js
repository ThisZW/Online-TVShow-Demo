const express = require('express')
const router = express.Router()

const { Comment } = require('../models')

router.post('/add-comment', (req, res) => {
  const { comment, userId, showId } = req.body
  Comment.create({
    commentBody: comment,
    userId,
    showId
  }).then(() => {
    res.send('created')
  }).catch(err => {
    res.status(500).send(err)
  })
})

module.exports = router
