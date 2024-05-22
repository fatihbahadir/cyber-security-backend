const successResponse = (req, res, next) => {
    if (res.locals.data !== undefined) {
      const status = res.locals.status || 200;
      const message = res.locals.message || "Request was successful";
      const data = res.locals.data;
      res.status(status).json({ success: true, message, data });
    } else {
      const status = res.locals.status || 204;
      const message = res.locals.message || "No content";
      res.status(status).json({ success: true, message });
    }
  };
  
  const errorResponse = (err, req, res, next) => {
    const status = res.locals.status || 500;
    const message = err.message || "Internal server error";
    res.status(status).json({ success: false, message });
  };
  
  module.exports = {
    successResponse,
    errorResponse,
  };
  