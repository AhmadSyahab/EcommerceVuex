const express = require('express');
const router = express.Router();
const Controllers = require('../controllers/user.js')
/* GET home page. */
// router.get('/');

router.post('/signin', Controllers.signIn)
router.post('/signup', Controllers.signUp)
router.get('/users/:userid', Controllers.findUser)
router.post('/users/:userId', Controllers.addCart)
router.post('/users/checkout/:userId', Controllers.checkout)

module.exports = router;
