const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    InputFontColor: {
      type: String,
      default: "#111",
    },
    bannerColor: {
      type: String,
      default: "#342B26",
    },
    Layout: {
      type: String,
      default: "stack",
    },
    btnFill: {
      type: String,
      default: "",
    },
    btnOutline: {
      type: String,
      default: "",
    },
    btnShadow: {
      type: String,
      default: "",
    },
    btnfontColor: {
      type: String,
      default: "#ffffffff",
    },
    inputFont: {
      type: String,
      default: "",
    },
    linksArr: {
      type: [{ type: mongoose.Schema.Types.Mixed }],
      default: [],
    },
    profileImage: {
      type: String,
      default: "/src/assets/Memoji%20BoysDefault%20.png",
    },
    shopArr: {
      type: [{ type: mongoose.Schema.Types.Mixed }],
      default: [],
    },
    theme: {
      type: String,
      default: "",
    },
    userBio: {
      type: String,
      default: "",
    },
    // Tracking Clicks
    profileClickCount: { type: Number, default: 0 },
    deviceClicks: {
      Linux: { type: Number, default: 0 },
      Mac: { type: Number, default: 0 },
      iOS: { type: Number, default: 0 },
      Windows: { type: Number, default: 0 },
      Android: { type: Number, default: 0 },
      Other: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", ProfileSchema);
module.exports = Profile;
