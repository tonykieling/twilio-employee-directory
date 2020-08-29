'use strict';

const express         = require('express'), 
      router          = express.Router(), 
      // twilio          = require('twilio'), 
      employeeFinder  = require('../lib/employee-finder'), 
      _               =  require('underscore'), 
      twimlGenerator  = require('../lib/twiml-generator');

// POST /directory/search/
router.post('/search/', (req, res, next) => {
  // const body = req.body.Body;
  const body = req.body.name;
  console.log("IT is body::", body);
  console.log("COOKIES::", req.cookies);
  // if (1) return res.send({ok: "OK"});
  res.type('text/xml');

  // if (req.cookies.cachedEmployees !== undefined && !isNaN(body)) {
  if ((req.cookies && req.cookies.cachedEmployees) && !isNaN(body)) {
    const cachedEmployees = req.cookies.cachedEmployees;
    const employeeId = cachedEmployees[body];
    if (employeeId === undefined) {
      if (1) return res.send({message: "Not found. Yeah!!"});
      res.send(twimlGenerator.notFound().toString());
    } else {
      employeeFinder.findById(employeeId, function(err, employee) {
        res.clearCookie('cachedEmployees');
        res.send(twimlGenerator.singleEmployee(employee).toString());
      });
    }
  } else {
    console.log("should be here 1111111111111");
    employeeFinder.findByName(body, function(err, employees) {
      if (employees.length === 0) {
        if (1) return res.send({message: "Not found. :("});
        res.send(twimlGenerator.notFound().toString());
      } else if (employees.length === 1) {
        console.log(`FOUND:: ${employees[0].toString()}`)
        if (1) return res.send({message: `Found. Yeah!!: ${employees[0].toString()}`});
        res.send(twimlGenerator.singleEmployee(employees[0]).toString());
      } else {
        const options = _.map(employees, function(it, index) {
          return { option: index + 1, fullName: it.fullName, id: it.id };
        });
        const cachedEmployees = _.object(_.map(options, function(it) { return [it.option, it.id]; }));
        res.cookie('cachedEmployees', cachedEmployees, { maxAge: 1000 * 60 * 60 });

        res.send(twimlGenerator.multipleEmployees(options).toString());
      }
    });
  }
});

module.exports = router;