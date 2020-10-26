const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Institute = require("./institute.model");
const InstituteService = require('./institute.services');

exports.registerInstitute = async (req, res, next) => {
  try {
    const instituteData = InstituteService.createInstituteDoc(req);
    const institute = await InstituteService.createInstitute(instituteData);
    res.status(200).json({
      institute
    });
  } catch (error) {
    res.status(500).json({
      error,
      message: error.message
    });
  }
};

exports.findInstituteId = async (req, res, next) => {
  try {
    const institute = await InstituteService.findOne({ ownerId: req.body.ownerId });
    res.status(200).json({
      institute
    });
  } catch (error) {
    res.status(500).json({
      error,
      message: error.message
    });
  }
};


exports.getInstitute = async (req, res, next) => {
  const instituteId = req.params.instituteId;
  try {
    const institute = await InstituteService.findOne({ _id: instituteId });
    res.status(200).json({
      institute
    });
  }
  catch (error) {
    res.status(500).json({
      error,
      message: error.message
    });
  }
};


exports.instituteDelete = async (req, res, next) => {
  try {
    const instid = req.params.instid;
    const institute_del = await InstituteService.deleteInstitute(instid);

    if (institute_del) {
      res.status(200).json({
        message: 'Successfully deleted'
      });
    }
    else {
      res.status(500).json({
        error,
        message: error.message
      });
    }

  } catch (error) {
    res.status(500).json({
      error,
      message: error.message
    });
  }

};

exports.instituteUpdate = async (req, res, next) => {
  try {
    const condition = { _id: req.params.instId };
    const newInstituteData = req.body;
    const result = await InstituteService.updateInstitute(condition, newInstituteData);
    res.status(200).json({
      message: 'Successfully updated',
      result: result,
    });
  } catch (error) {
    res.status(500).json({
      error,
      message: error.message
    });
  }
};