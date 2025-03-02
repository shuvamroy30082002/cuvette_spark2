const detectDeviceMiddleware = (req, res, next) => {
    const userAgent = req.headers["user-agent"]?.toLowerCase() || "unknown";
  
    const detectDevice = (userAgent) => {
      if (userAgent.includes("iphone") || userAgent.includes("ipad") || userAgent.includes("ipod")) {
        return "iOS";
      }
      if (userAgent.includes("mac") && userAgent.includes("mobile")) {
        return "iOS"; // Ensures iPads with mobile user-agents are counted as iOS
      }
      if (userAgent.includes("windows")) return "Windows";
      if (userAgent.includes("android")) return "Android";
      if (userAgent.includes("mac")) return "Mac"; // Only count as Mac if it's not iOS
      if (userAgent.includes("linux")) return "Linux";
  
      return "Other";
    };
  
    req.deviceType = detectDevice(userAgent);
    next();
  };

  module.exports = detectDeviceMiddleware;