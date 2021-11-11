const express = require('express');
const router = express.Router();
const authCtrl = require('../CONTROLLERS/auth.contorller');

router.post('/auth/signup', authCtrl.signUp);
router.post('/auth/signin', authCtrl.signIn);

module.exports = router;