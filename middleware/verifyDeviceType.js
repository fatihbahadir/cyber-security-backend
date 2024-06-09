const verifyDeviceType = (req, res, next) => {
  const { deviceType } = req.params;

  if (deviceType.toLowerCase() === "windows") {
      req.params.deviceType = "Windows-10-10.0.19041-SP0";
    } else if (deviceType.toLowerCase() === "mac") {
      req.params.deviceType = "macOS-14.1-arm64-arm-64bit";
    } else {
      return next({ message: "Invalid device type", status: 400 });
    }
    next()
};


module.exports = verifyDeviceType;