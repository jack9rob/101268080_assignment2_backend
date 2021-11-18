const express = require('express');
const employeeModel = require('../models/Employee');
const app = express();


// get all employees
app.get('/api/v1/employees', async (req, res) => {
    const employees = await employeeModel.find({});
  
    try {
      res.send({employees});
    } catch (err) {
      console.log(err)
      res.status(500).send(err);
    }
});

// create new employee
app.post('/api/v1/employees', async (req, res) => {
    console.log(req.body.data)
    const employee = new employeeModel(req.body.data);

    try {
      await employee.save();
      res.send(employee);
    } catch (err) {
      res.status(500).send(err);
    }
});

// get employee by id
app.get('/api/v1/employees/:id', async (req, res) => {
    try {
        const employee = await employeeModel.findById(req.params.id)
        console.log(employee)
        res.send(employee)
    } catch(err) {
        res.status(500).send(err)
    }
})

// update employee by id
app.put('/api/v1/employees/:id', async (req, res) => {
    try {
      const employee = await employeeModel.findByIdAndUpdate(req.params.id, req.body)
      await employeeModel.save()
      res.send(employee)
    } catch (err) {
      res.status(500).send(err)
    }
})

// delete employee
app.delete('/api/v1/employees/:id', async (req, res) => {
    try {
      const employee = await employeeModel.findByIdAndDelete(req.params.id)
  
      if (!employee) res.status(404).send("No item found")
      res.status(200).send()
    } catch (err) {
      res.status(500).send(err)
    }
})

module.exports = app