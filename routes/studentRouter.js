const express = require('express');
const {
	Students_get,
	addStudent_post,
	student_get,
	updateStudent_put,
	deleteStudent_delete,
	students,
	register_get,
} = require('../controllers/studentController');
const { requireAuth, requireAdmin } = require('../middlewares/authMiddleware');
const router = express();

// router.get('/all', students);
router.get('/', Students_get);
router.get('/add', requireAuth, requireAdmin, register_get);
router.post('/add', requireAuth, requireAdmin, addStudent_post);
router.get('/:id', requireAuth, requireAdmin, student_get);
router.put('/:id', requireAuth, requireAdmin, updateStudent_put);
router.delete('/:id', requireAuth, requireAdmin, deleteStudent_delete);

module.exports = router;
