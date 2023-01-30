const express = require('express')

const {signup, login} = require ('../controllers/auth.js')
const router = express.Router();

// Send Data from front-end to back-end
router.post('/signup',signup);
router.post('/login',login);


module.exports = router

