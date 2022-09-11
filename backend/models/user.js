const mongoose = require("mongoose");
const crypto = require("crypto");

// User Schema
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    leadership: {
      type: Number,
      required: false,
      unique: false,
    },
    company_culture:{
      type: Number,
      required: false,
      unique: false,
    },
    title_and_status:{
      type: Number,
      required: false,
      unique: false,
    },
    compensation:{
      type: Number,
      required: false,
      unique: false,
    },
    learning:{
      type: Number,
      required: false,
      unique: false,
    },
    diversity:{
      type: Number,
      required: false,
      unique: false,
    },
    hashed_password: {
      type: String,
      required: true,
      // select: false,
    },
    salt: {
      type: String,
      // select: false,
    },
    role: {
      type: String,
      default: "admin",
    },
    resetPasswordLink: {
      data: String,
      default: "",
    },
    emailVerified: {
      type: Boolean,
      default: null,
    },
    firstName: {
      type: String,
      default: null,
    },
    lastName: {
      type: String,
      default: null,
    },
    photoURL: {
      type: String,
      default: null,
    },
  },
  { timestamps: true, versionKey: false }
);

// Virtual
userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

// Methods
userSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) == this.hashed_password;
  },

  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },

  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};

module.exports = mongoose.model("users", userSchema);
