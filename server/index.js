const express = require("express");
const app = express();
const dotenv = require("dotenv");
const ConnectDB = require("./dbConnect/dbConnect.js");
const cors = require("cors");
const userRoutes = require("./routes/user.js");
const dashboardRoutes = require("./routes/dashboard.js");
const User = require("./models/user.model.js");
const Profile = require("./models/profile.model.js");
const detectDeviceMiddleware = require("./middleware/detectDevice.js");

dotenv.config({});

const port = process.env.PORT || 3000;

ConnectDB();
app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);
app.use("/dashboard", dashboardRoutes);


// Fetch user profile
app.get("/:username", detectDeviceMiddleware, async(req, res) => {
  
  const { username } = req.params;
  const deviceType = req.deviceType;

  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const profile = await Profile.findOne({ userId: user._id });
    if (!profile) {
      return res
        .status(400)
        .json({ success: false, message: "Profile not found" });
    }

    // Increase profile click count
    profile.profileClickCount += 1;

    //Increase device-specific click count
    profile.deviceClicks[deviceType] = (profile.deviceClicks[deviceType] || 0) + 1;

    await profile.save();

    return res
      .status(200)
      .json({ success: true, profile: profile, username: user.username });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Interval Server Error !" });
  }
});

// increase link count
app.patch("/updatecount", async (req, res) => {
  try {
    const { username, index } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const profile = await Profile.findOne({ userId: user._id });
    if (!profile) {
      return res
        .status(404)
        .json({ success: false, message: "Profile not found" });
    }

    if (!profile.linksArr || !profile.linksArr[index]) {
      return res.status(400).json({ success: false, message: "Invalid index" });
    }

    profile.linksArr[index].linkCount =
      (profile.linksArr[index].linkCount || 0) + 1;

    profile.markModified(`linksArr.${index}`);

    await profile.save();

    return res
      .status(200)
      .json({ success: true, message: "Link count updated successfully" });
  } catch (error) {
    console.error("Error updating link count:", error);
    if (!res.headersSent) {
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error!" });
    }
  }
});

// increase shop count
app.patch("/updateshopcont", async (req, res) => {
  try {
    const { username, index } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const profile = await Profile.findOne({ userId: user._id });
    if (!profile) {
      return res
        .status(404)
        .json({ success: false, message: "Profile not found" });
    }

    if (!profile.shopArr || !profile.shopArr[index]) {
      return res.status(400).json({ success: false, message: "Invalid index" });
    }

    profile.shopArr[index].shopCount =
      (profile.shopArr[index].shopCount || 0) + 1;

    profile.markModified(`shopArr.${index}`);

    await profile.save();

    res.status(200).json({ message: "shop count updated" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Interval Server Error !" });
  }
});

app.listen(port, () => {
  console.log(`listen on port ${port}`);
});
