const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 3000;
const EmployeeModel = require('./Employee');

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/ITD103', {})
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    EmployeeModel.find()
        .then(users => res.json(users))
        .catch(err => res.json(err));
});

app.get('/get/:id', (req, res) => {
    const id = req.params.id;
    EmployeeModel.findById({ _id: id })
        .then(employee => res.json(employee))
        .catch(err => res.json(err));
});

app.post('/create', (req, res) => {
    EmployeeModel.create(req.body)
        .then(employee => res.status(201).json({ message: 'Employee created successfully', employee: employee }))
        .catch(err => res.json(err));
});

app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    EmployeeModel.findByIdAndUpdate(id, req.body, { new: true }) 
        .then(employee => res.json({ message: 'Employee updated successfully', employee: employee }))
        .catch(err => res.json(err));
});

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    EmployeeModel.findByIdAndDelete(id) 
        .then(() => res.json({ message: 'Employee deleted successfully' }))
        .catch(err => res.json(err));
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


