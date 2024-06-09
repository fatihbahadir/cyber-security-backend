const Email = require("../model/Email");
const {
  successResponse,
  errorResponse,
} = require("../middleware/responseHandler");

const getAllEmails = async (req, res, next) => {
  try {
    const emails = await Email.find();
    if (!emails || emails.length === 0) {
      res.locals.status = 204;
      res.locals.message = "No emails found";
      return next();
    }
    res.locals.data = emails;
    next();
  } catch (error) {
    next(error);
  }
};

const createEmail = async (req, res, next) => {
  console.log(req.body); // Gelen veriyi konsola yazdırarak kontrol et

  if (!req.body || !req.body.emails || !Array.isArray(req.body.emails)) {
    return next({ message: "Invalid email data", status: 400 });
  }

  try {
    const emailData = req.body.emails.map((email) => {
      if (
        !email.subject ||
        !email.receivedTime ||
        !email.senderName ||
        !email.receivedByName ||
        !email.body
      ) {
        throw new Error("Invalid email structure");
      }

      return {
        subject: email.subject,
        receivedTime: email.receivedTime,
        senderName: email.senderName,
        receivedByName: email.receivedByName,
        body: email.body,
      };
    });

    const newEmails = await Email.insertMany(emailData);
    res.locals.status = 201;
    res.locals.message = "Emails created successfully";
    res.locals.data = newEmails;
    next();
  } catch (error) {
    next(error);
  }
};

const getEmail = async (req, res, next) => {
  if (!req?.params?.id) {
    return next({ message: "Email ID required", status: 400 });
  }

  try {
    const email = await Email.findOne({ _id: req.params.id }).exec();
    if (!email) {
      res.locals.status = 204;
      res.locals.message = `No email matches ID ${req.params.id}`;
      return next();
    }
    res.locals.data = email;
    next();
  } catch (error) {
    next(error);
  }
};

const deleteEmail = async (req, res, next) => {
  if (!req?.params?.id) {
    return next({ message: "Email ID required", status: 400 });
  }

  try {
    const email = await Email.findOne({ _id: req.params.id }).exec();
    if (!email) {
      res.locals.status = 204;
      res.locals.message = `No email found with ID ${req.params.id}`;
      return next();
    }
    await email.deleteOne();
    res.locals.data = { message: "Email deleted successfully" };
    next();
  } catch (error) {
    next(error);
  }
};

const getEmailCountsBySender = async (req, res, next) => {
  try {
    const emailCounts = await Email.aggregate([
      {
        $group: {
          _id: "$senderName",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          senderName: "$_id",
          count: 1,
          _id: 0,
        },
      },
    ]);

    if (!emailCounts || emailCounts.length === 0) {
      res.locals.status = 204;
      res.locals.message = "No senders found";
      return next();
    }

    res.locals.data = emailCounts;
    next();
  } catch (error) {
    next(error);
  }
};

const getSenderCount = async (req, res, next) => {
    try {
        const distinctSenders = await Email.distinct('senderName');
        const senderCount = distinctSenders.length;

        if (!senderCount) {
            res.locals.status = 204;
            res.locals.message = 'No senders found';
            return next();
        }

        res.locals.data = { senderCount };
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = {
  getAllEmails,
  createEmail,
  getEmail,
  deleteEmail,
  getEmailCountsBySender,
  getSenderCount,
  successResponse,
  errorResponse,
};
