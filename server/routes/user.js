const express = require('express');
const router = express.Router();

var { signin,signup } = require('../controllers/user.js');


router.post('/signin',signin);
router.post('/signup',signup);

module.exports = router;