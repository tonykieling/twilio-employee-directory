'use strict';
/**
 * the functions in this file talk to the database so it takes employee info and returns to their callers
 */

const Employee = require('../models/employee.js');

// it looks for the user's name
const findByName = async(name) => {
  const search = await Employee
    .find({
      "fullName": { $regex : new RegExp(name, "i") }
    });

  return search;
};


// it searches for the employee's id
const findById = async(id) => {
  const employee = await Employee.findOne({
    "_id": id
  });

  return employee;
};


module.exports = {
  findByName,
  findById
};
