const Log = require("../model/Log");
const { successResponse, errorResponse } = require("../middleware/responseHandler");

const getAllLogs = async (req, res, next) => {
  try {
    const logs = await Log.find();
    if (!logs) {
      res.locals.status = 204;
      res.locals.message = "No log found";
      return next();
    }
    res.locals.data = logs;
    next();
  } catch (error) {
    next(error);
  }
};

const createLog = async (req, res, next) => {
  const { log, deviceInfo, location, startTime, endTime } = req.body;

  if (!log || !deviceInfo || !location || !startTime || !endTime) {
    return next({ message: "All fields are required", status: 400 });
  }

  try {
    const newLog = await Log.create(req.body);
    res.locals.status = 201;
    res.locals.message = "Log created successfully";
    res.locals.data = newLog;
    next();
  } catch (error) {
    next(error);
  }
};


const getLog = async (req, res, next) => {
  if (!req?.params?.id) {
    return next({ message: "Log ID required", status: 400 });
  }

  try {
    const log = await Log.findOne({ _id: req.params.id }).exec();
    if (!log) {
      res.locals.status = 204;
      res.locals.message = `No log matches ID ${req.params.id}`;
      return next();
    }
    res.locals.data = log;
    next();
  } catch (error) {
    next(error);
  }
};

 const updateLog = async (req, res, next) => {
  const { id, log, deviceInfo, location, startTime, endTime } = req.body;
  if (!id) {
    return next({ message: "ID is required", status: 400 });
  }

  try {
    const updatedLog = await Log.findByIdAndUpdate(id, { log, deviceInfo, location, startTime, endTime }, { new: true });
    if (!updatedLog) {
      res.locals.status = 204;
      res.locals.message = `No log matches ID ${id}`;
      return next();
    }
    res.locals.data = updatedLog;
    next();
  } catch (error) {
    next(error);
  }
};


const deleteLog = async (req, res, next) => {
  if (!req?.params?.id) {
    return next({ message: "Log ID required", status: 400 });
  }

  try {
    const log = await Log.findOne({ _id: req.params.id }).exec();
    if (!log) {
      res.locals.status = 204;
      res.locals.message = `No log found with ID ${req.params.id}`;
      return next();
    }
    await log.deleteOne();
    res.locals.data = { message: "Log deleted successfully" };
    next();
  } catch (error) {
    next(error);
  }
};


module.exports = {
  getAllLogs,
  createLog,
  getLog,
  updateLog,
  deleteLog,
  successResponse,
  errorResponse,
};