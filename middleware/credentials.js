const allowedOrigins = require("../config/allowedOrigins");

const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.set({
            "Access-Control-Allow-Origin": origin, // ==> new header
            "Access-Control-Allow-Credentials": true
        })
    }
    next();
}

module.exports = credentials