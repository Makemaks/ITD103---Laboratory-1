const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema({
    name: String,
    salary: Number,
    address: String
})

const EmployeeModel = mongoose.model("employees", EmployeeSchema)

module.exports = EmployeeModel