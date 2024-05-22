const Log = require("../model/Log");

const getAllLogs = async (req, res) => {
  const logs = await Log.find();

  if (!logs) {
    return res.status(204).json({
      message: "No log found",
    });
  }

  res.json(logs);
};

const createLog = async (req, res) => {
  const { log, deviceInfo, location, startTime, endTime } = req.body;

  if (!log || !deviceInfo || !location || !startTime || !endTime) {
    return res.status(400).json({
      success: false,
      message:
        "All fields (log, deviceInfo, location, startTime, endTime) are required",
    });
  }

  try {
    const log = await Log.create(req.body);
    res
      .status(201)
      .json({ success: true, message: "Log created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getLog = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({
      message: "Log ID required",
    });

  const log = await Log.findOne({ _id: req.params.id }).exec();

  if (!log) {
    return res.status(204).json({
      message: `No log matches ID ${req.params.id}`,
    });
  }

  res.json(log);
};

const updateLog = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({
      message: "Id is required",
    });
  }

  const log = await Log.findOne({ _id: req.body.id }).exec();

  if (!log) {
    return res.status(204).json({
      message: `No log matches ID ${req.body.id}`,
    });
  }

  if (req.body?.log) log.log = req.body.log;
  if (req.body?.deviceInfo) log.deviceInfo = req.body.deviceInfo;
  if (req.body?.location) log.location = req.body.location;
  if (req.body?.startTime) log.startTime = req.body.startTime;
  if (req.body?.endTime) log.endTime = req.body.endTime;

  const result = await log.save();
  res.json(result);
};

const deleteLog = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({
      message: "Log ID required",
    });

  const log = await Log.findOne({ _id: req.body.id }).exec();

  if (!log) {
    return res
      .status(204)
      .json({ message: `No log found with id ${req.params.id}` });
  }

  const result = await log.deleteOne({ _id : req.body.id });
  res.json(result)
};

module.exports = {
  createLog,
  getAllLogs,
  getLog,
  updateLog,
  deleteLog,
};
