'use strict';

const express         = require('express'), 
      router          = express.Router(), 
      employeeFinder  = require('../lib/employee-finder'), 
      _               =  require('underscore'), 
      twimlGenerator  = require('../lib/twiml-generator');

/**
 * POST /directory/search/
 * this is the default route when a user request info about an employee
 */
router.post('/search/', async(req, res, next) => {
  const body = req.body.Body;

  res.type('text/xml');

  if ((req.cookies && req.cookies.cachedEmployees) && !isNaN(body)) {
    const cachedEmployees = req.cookies.cachedEmployees;
    const employeeId = cachedEmployees[body];

    if (employeeId === undefined) {
      return res.send(twimlGenerator.notFound().toString());
    } else {
      const employee = await employeeFinder.findById(employeeId);
      res.clearCookie('cachedEmployees');
      return res.send(twimlGenerator.singleEmployee(employee).toString());
    }
  } else {
    const employeeSearch = await(employeeFinder.findByName(body));

    if (!employeeSearch.length)
      return res.send(twimlGenerator.notFound().toString());
    else if (employeeSearch.length === 1) {
      return res.send(twimlGenerator.singleEmployee(employeeSearch[0]).toString());
    } else {
      const options = _.map(employeeSearch, (it, index) => {
        return { option: index + 1, fullName: it.fullName, id: it.id };
      });

      const cachedEmployees = _.object(_.map(options, function(it) { return [it.option, it.id]; }));
      res.cookie('cachedEmployees', cachedEmployees, { maxAge: 1000 * 60 * 60 });
      return res.send(twimlGenerator.multipleEmployees(options).toString());
    }
  }
});

module.exports = router;