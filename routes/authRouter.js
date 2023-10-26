// const {Router } = require('express')
// const router = Router()
const express = require('express');
const {
	signup_get,
	signup_post,
	login_get,
	login_post,
	logout_get,
	delete_user,
} = require('../controllers/authController');
const { requireAuth, requireAdmin } = require('../middlewares/authMiddleware');

const router = express();
router.get('/signup', signup_get);
router.post('/signup', signup_post);
router.get('/login', login_get);
router.post('/login', login_post);
router.get('/logout', logout_get);
router.delete('/delete/:id', requireAuth, requireAdmin, delete_user);
module.exports = router;
