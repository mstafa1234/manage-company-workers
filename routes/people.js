const express = require("express");
const {
  getPeople,
  getPerson,
  createPerson,
  updatePerson,
  deletePerson,
} = require("../controllers/people");

const Person = require("../models/Person");

const router = express.Router();

const advancedResults = require("../midleware/advancedResults");

router.route("/").get(advancedResults(Person), getPeople).post(createPerson);

router.route("/:id").get(getPerson).put(updatePerson).delete(deletePerson);

module.exports = router;
