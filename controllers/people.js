const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../midleware/async");
const Person = require("../models/Person");

// @desc      Get all people
// @route     GET /api/v1/people
exports.getPeople = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Get single person
// @route     GET /api/v1/people/:id

exports.getPerson = asyncHandler(async (req, res, next) => {
  const person = await Person.findById(req.params.id).populate("company");

  res.status(200).json({
    success: true,
    data: person,
  });
});

// @desc      Create person
// @route     POST /api/v1/people

exports.createPerson = asyncHandler(async (req, res, next) => {
  const person = await Person.create(req.body);

  res.status(201).json({
    success: true,
    data: person,
  });
});

// @desc      Update person
// @route     PUT /api/v1/people/:id
exports.updatePerson = asyncHandler(async (req, res, next) => {
  const person = await Person.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: person,
  });
});

// @desc      Delete person
// @route     DELETE /api/v1/people/:id
exports.deletePerson = asyncHandler(async (req, res, next) => {
  await Person.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});
