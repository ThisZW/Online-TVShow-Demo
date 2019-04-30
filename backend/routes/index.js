const express = require('express');
const router = express.Router();

const user = require('./user')
const genre = require('./genre')
const show = require('./show')

router.use("/user", user)
router.use("/genre", genre)
router.use("/show", show)

module.exports = router;
