'use strict';

const mongoose = require('mongoose');

const Employee = new mongoose.Schema({
  fullName: {
    type: String
  },

  email: {
    type: String
  },

  phoneNumber: {
    type: String
  },

  imageUrl: {
    type: String
  }
});

module.exports = mongoose.model('employee', Employee);