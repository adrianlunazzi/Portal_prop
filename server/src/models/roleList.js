const mongoose = require("mongoose");

const roleSchema = mongoose.Schema({
  name: String,
});

const RoleList = mongoose.model("RoleList", roleSchema);
module.exports = RoleList;
