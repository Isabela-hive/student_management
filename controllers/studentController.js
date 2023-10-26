const Student = require('../models/studentModel');
// studentController.js

module.exports.Students_get = async (req, res) => {
	try {
		const students = await Student.find();
		// console.log(students);
		res.render('dashboard', { students }); // Pass students data to the view
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Error fetching student data');
	}
};

// module.exports.Students_get = async (req, res) => {
// 	try {
// 		let query = Student.find();

// 		// Sort by gender, if specified in query parameters
// 		if (req.query.sortByGender) {
// 			query = query.sort({
// 				gender: req.query.sortByGender === 'asc' ? 1 : -1,
// 			});
// 		}
// 		if (req.query.sortByCohort) {
// 			query = query.sort({
// 				cohort: req.query.sortByCohort === 'asc' ? 1 : -1,
// 			});
// 		}
// 		if (req.query.sortByLastName) {
// 			query = query.sort({
// 				cohort: req.query.sortByLastName === 'asc' ? 1 : -1,
// 			});
// 		}
// 		if (req.query.sortByFirstName) {
// 			query = query.sort({
// 				cohort: req.query.sortByFirstName === 'asc' ? 1 : -1,
// 			});
// 		}
// 		if (req.query.sortByAge) {
// 			query = query.sort({
// 				age: req.query.sortByAge === 'asc' ? 1 : -1,
// 			});
// 		}
// Optionally, you can sort students by age
// if (req.query.sortByAge) {
// 	const sortOrder = req.query.sortByAge === 'asc' ? 1 : -1;
// 	students.sort((a, b) => (a.age - b.age) * sortOrder);
// }
// 		const students = await query.exec();
// 		res.status(200).json({ count: students.length, students });
// 	} catch (err) {
// 		console.log(err.message);
// 		res.status(500).send('Error fetching student data');
// 	}
// };
module.exports.register_get = async (req, res) => {
	// const user = await User.find();
	// res.status(200).json({ count: user.length, user });
	res.redirect('students/add');
};
module.exports.addStudent_post = async (req, res) => {
	const { firstName, lastName, cohort, gender, dob, idNumber } = req.body;

	try {
		const student = await Student.create({
			firstName,
			lastName,
			cohort,
			gender,
			dob,
			idNumber,
			user_id: req.user.id, // Assign the user_id based on the logged-in user's ID
		});

		// console.log(req.user);
		res.status(201).json({ message: 'Student is added', student });
	} catch (err) {
		console.log(err);
		res.status(500).send(err.message);
	}
};
module.exports.student_get = async (req, res) => {
	try {
		const student = await Student.findById(req.params.id);
		if (!student) {
			return res.status(404).send('Student not found');
		}

		// Check if the user is an admin
		// if (req.user.role !== 'admin') {
		// 	return res.status(403).send('Access forbidden');
		// }

		res.send(student);
	} catch (err) {
		res.status(500).send('Error fetching student data');
	}
};
module.exports.updateStudent_put = async (req, res) => {
	try {
		const student = await Student.findById(req.params.id);

		if (!student) {
			res.status(400);
			throw new Error('Student not found');
		}

		// Check if the user is an admin
		if (req.user.role !== 'admin') {
			return res.status(403).send('Access forbidden');
		}

		const updateStudent = await Student.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);

		res.status(200).json(updateStudent);
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Error updating student');
	}
};

module.exports.deleteStudent_delete = async (req, res) => {
	try {
		// Check if the user is an admin
		if (req.user.role !== 'admin') {
			return res.status(403).send('Access forbidden');
		}

		await Student.findByIdAndDelete(req.params.id);
		res.status(200).json('Student deleted successfully');
	} catch (err) {
		res.status(500).send('Error deleting student');
	}
};
