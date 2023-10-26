const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema(
	{
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: [true, 'This field is required'],
		},
		firstName: {
			type: String,
			required: [true, 'Please input the first name'],
		},
		lastName: {
			type: String,
			required: [true, 'please input the last name'],
		},
		idNumber: {
			type: Number,
			unique: true,
		},
		gender: {
			type: String,
			enum: ['female', 'male', 'other'],
			required: [true, 'Please input this field'],
		},
		cohort: {
			type: Number,
			enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
			required: [true, 'Please input this field'],
		},
		dob: {
			type: Date,
			required: [true, 'Please input this field'],
		},
		// locality: {
		// 	type: Number,
		// 	required: [true, 'Please input this field'],
		// },
		age: {
			type: Number, // Store the calculated age as a number
		},
	},
	{ timestamps: true }
);

// Define a pre-save middleware to calculate and store the age
studentSchema.pre('save', function (next) {
	// console.log('Pre-save middleware triggered');
	const currentDate = new Date();
	const dobDate = new Date(this.dob);
	const ageInYears = currentDate.getFullYear() - dobDate.getFullYear();

	// Adjust the age if the birthday hasn't occurred yet this year
	if (
		currentDate.getMonth() < dobDate.getMonth() ||
		(currentDate.getMonth() === dobDate.getMonth() &&
			currentDate.getDate() < dobDate.getDate())
	) {
		this.age = ageInYears - 1;
	} else {
		this.age = ageInYears;
	}
	// console.log('Calculated age:', this.age);
	next();
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
