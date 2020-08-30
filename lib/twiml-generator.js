/**
 * this is the file which responds to the Twilio the user questions
 */

'use strict';

const MessagingResponse = require('twilio').twiml.MessagingResponse,
_ = require('underscore');


// function to answer when there is no user found
const notFound = function() {
  const resp = new MessagingResponse();
  resp.message('We did not find the employee you\'re looking for');
  return resp;
};


// function that answer for one employee
const singleEmployee = employee => {
  const resp = new MessagingResponse();
  const message = resp.message();
  message.body(`${employee.fullName}\n${employee.phoneNumber}\n${employee.email}`);
  // message.media(employee.imageUrl);  // this media resource is not working, no sending the picture
  return message;
};


// function to answer when there are more than one employee
const multipleEmployees = employees => {
  const resp = new MessagingResponse();
  const optionsMessage = _.reduce(employees, (memo, it) => {
    return memo += `\n${it.option} for ${it.fullName}`;
  }, '');

  resp.message(`We found multiple people, reply with:${optionsMessage}\nOr start over`);
  return resp;
};


module.exports = {
  notFound,
  singleEmployee,
  multipleEmployees
};
