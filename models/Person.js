const mongoose = require("mongoose");

const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },

  address: {
    type: String,
    required: [true, "Please add an address"],
  },

  phone: {
    type: String,
    maxlength: [20, "Phone number can not be longer than 20 characters"],
  },

  company: {
    type: mongoose.Schema.ObjectId,
    ref: "Company",
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Person", PersonSchema);
