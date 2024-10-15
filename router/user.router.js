const express = require('express');

const router = express.Router();

const { signupController, loginController, commentController, allComments } = require('../controller/user.controller');


router.post('/signup', signupController);
router.post('/login',loginController)
router.post('/comment/:id', commentController)
router.get('/allcomment', allComments)

module.exports = router;