'use strict';

const Employee = require('../models/employee.js');

const findByName = async(name, callback) => {
  console.log("INSIDE finfByName, looking for::::", name);
  // const fullname = name;
  // const search = await Employee
  //   .find();
  // console.log("searcheee:::", search);
  await Employee.find({
    "fullName": {
      "$regex": name, "$options": "i"
    }
  }, callback).sort("fullName");
};

const findById = async(id, callback) => {
  Employee.findOne({
    "_id": id
  }, callback);
};

module.exports.findByName = findByName;

module.exports.findById = findById;