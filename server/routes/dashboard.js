const express = require("express");
const router = express.Router();
const User = require("../models/user.model.js");
const Profile = require("../models/profile.model.js");
const authMiddleware = require("../middleware/auth.js");

// Fetch user profile
router.get("/", authMiddleware, async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId);
    const profile = await Profile.findOne({ userId: userId });
    if (!profile) {
      return res
        .status(400)
        .json({ success: false, message: "Profile not found" });
    }

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

// update profile
router.patch("/update", authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const {
    username,
    profileImage,
    bannerColor,
    userBio,
    Layout,
    InputFontColor,
    btnfontColor,
    btnFill,
    btnOutline,
    btnShadow,
    inputFont,
    theme,
    linksArr,
    shopArr,
  } = req.body;
  try {
    const exist = await User.findById(userId);
    const newUsername = username.toLowerCase();
    const profile = await Profile.findOne({ userId: userId });
    if (!exist) {
      return res
        .status(400)
        .json({ success: false, message: "user not found" });
    }
    if (!profile) {
      return res
        .status(400)
        .json({ success: false, message: "Profile not found" });
    }

    if (newUsername && newUsername !== exist.username) {
      const usernameExists = await User.findOne({ username: newUsername });
      if (usernameExists) {
        return res
          .status(400)
          .json({ success: false, message: "Username already taken" });
      }
    } else {
      await User.findByIdAndUpdate(userId, {
        username: newUsername,
      });
    }

    await Profile.findByIdAndUpdate(profile._id, {
      profileImage,
      bannerColor,
      userBio,
      Layout,
      InputFontColor,
      btnfontColor,
      btnFill,
      btnOutline,
      btnShadow,
      inputFont,
      theme,
      linksArr,
      shopArr,
    });

    return res
      .status(200)
      .json({ success: true, message: "Save chnages Succesfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Interval Server Error !" });
  }
});

router.get("/analytics", authMiddleware, async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const profile = await Profile.findOne({ userId: userId });
    if (!profile) {
      return res
        .status(404)
        .json({ success: false, message: "Profile not found" });
    }

    // Calculate total link and shop clicks
    const totalLinkClicks = profile.linksArr.reduce(
      (sum, link) => sum + (link.linkCount || 0),
      0
    );
    const totalShopClicks = profile.shopArr.reduce(
      (sum, shop) => sum + (shop.shopCount || 0),
      0
    );
    const totalCTA =
      totalLinkClicks + totalShopClicks + profile.profileClickCount;

    // Extract device clicks
    const deviceClicks = profile.deviceClicks;

    // Extract timestamps
    const createdAt = new Date(profile.createdAt);
    const updatedAt = new Date(profile.updatedAt);

    // Format month-year
    const formatMonthYear = (date) => {
      const month = date.toLocaleString("en-US", { month: "short" });
      return `${month}`;
    };

    const createdMonth = formatMonthYear(createdAt);
    const updatedMonth = formatMonthYear(updatedAt);

    // Aggregate clicks per month
    const monthlyClicks = {};
    monthlyClicks[createdMonth] =
      (monthlyClicks[createdMonth] || 0) + totalLinkClicks + totalShopClicks;
    monthlyClicks[updatedMonth] =
      (monthlyClicks[updatedMonth] || 0) + totalLinkClicks + totalShopClicks;

    // Social media click breakdown
    const socialMediaClicks = profile.linksArr.reduce((acc, link) => {
      acc[link.socialMedia] =
        (acc[link.socialMedia] || 0) + (link.linkCount || 0);
      return acc;
    }, {});

    // Extract link clicks and ensure exactly 6 entries
    let linkClicks = profile.linksArr.map((link, index) => ({
      name: `Link${index + 1}`,
      value: link.linkCount || 0,
    }));

    // Ensure exactly 6 entries by filling missing slots with { name: "LinkX", value: 0 }
    while (linkClicks.length < 6) {
      linkClicks.push({ name: `Link${linkClicks.length + 1}`, value: 0 });
    }

    // If more than 6 links, trim excess (though unlikely)
    linkClicks = linkClicks.slice(0, 6);

    return res.status(200).json({
      totalLinkClicks,
      totalShopClicks,
      totalCTA,
      deviceClicks,
      socialMediaClicks,
      monthlyClicks,
      linkClicks,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error!" });
  }
});

module.exports = router;
