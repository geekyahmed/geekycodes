const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SettingsSchema = new Schema({
  postlimit: String
});
module.exports = { Settings: mongoose.model("settings", SettingsSchema) };
