const express = require("express");
const {
  getCompanies,
  getCompany,
  createCompany,
  updateCompany,
} = require("../controllers/companies");

const Company = require("../models/Company");

const router = express.Router();

const advancedResults = require("../midleware/advancedResults");

router
  .route("/")
  .get(advancedResults(Company), getCompanies)
  .post(createCompany);

router.route("/:id").get(getCompany).put(updateCompany);

module.exports = router;
