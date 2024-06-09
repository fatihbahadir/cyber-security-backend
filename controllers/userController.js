const User = require('../model/User');
const bcrypt = require('bcrypt');
const { successResponse, errorResponse } = require("../middleware/responseHandler");

const getUser = async (req, res, next) => {
    try {
      const username = req.user;
      const foundUser = await User.findOne({ username }).exec();
      if (!foundUser) {
        res.locals.status = 204;
        res.locals.message = "No user found";
        return next();
      }
      res.locals.data = {
        username: foundUser.username,
        roles: foundUser.roles
      };
      next();
    } catch (error) {
      next(error);
    }
  };

  const updateUser = async (req, res, next) => {
    const { user, pwd } = req.body;
    const currentUsername = req.user;
  
    if (!user && !pwd) {
      return next({ message: 'Nothing to update', status: 400 });
    }
  
    try {
      const foundUser = await User.findOne({ username: currentUsername }).exec();
      if (!foundUser) {
        res.locals.status = 204;
        res.locals.message = 'No user found';
        return next();
      }
  
      if (user) foundUser.username = user;
      if (pwd) foundUser.password = await bcrypt.hash(pwd, 10);
  
      const updatedUser = await foundUser.save();
      res.locals.status = 200;
      res.locals.message = 'User updated successfully';
      res.locals.data = {
        username: updatedUser.username,
        roles: updatedUser.roles
      };
      next();
    } catch (error) {
      next(error);
    }
  };

module.exports = {
  getUser,
  updateUser,
  successResponse,
  errorResponse
};
