const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../midleware/async");
const Company = require("../models/Company");

// @desc      Get all companies
// @route     GET /api/v1/cpmpanies
exports.getCompanies = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Get single company
// @route     GET /api/v1/companies/:id
exports.getCompany = asyncHandler(async (req, res, next) => {
  const company = await Company.findById(req.params.id).populate("people");

  if (!company) {
    return next(
      new ErrorResponse(`Company not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: company });
});

// @desc      Create new company
// @route     POST /api/v1/companies

exports.createCompany = asyncHandler(async (req, res, next) => {
  const company = await Company.create(req.body);

  res.status(201).json({
    success: true,
    data: company,
  });
});

// @desc      Update company
// @route     PUT /api/v1/companies/:id

exports.updateCompany = asyncHandler(async (req, res, next) => {
  let company = await Company.findById(req.params.id);

  if (!company) {
    return next(
      new ErrorResponse(`Company not found with id of ${req.params.id}`, 404)
    );
  }

  company = await Company.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: company });
});
