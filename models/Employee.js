const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    emailId: {
        type: String,
        required: true,
        match: /.+\@.+\..+/,
        unique: true
    }

});

const Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;