'use strict';

const mongoose = require('mongoose');
mongoose.set('debug', true);

const Employee = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,

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