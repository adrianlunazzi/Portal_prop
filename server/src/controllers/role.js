const RoleList = require("../models/roleList");
const role = {
  main: function (req, res) {
    return res.status(200).json({
      message: "Role Page",
    });
  },
  list: async (req, res) => {
    try {
      const roleList = await RoleList.find({});
      res.status(200).json({
        status: "success",
        message: "List of Roles",
        roleList,
      });
    } catch (error) {
      res.status(409).json({
        messege: error.messege,
      });
    }
  },
  create: async (req, res) => {
    const name = req.body;
    const newRole = new RoleList(name);
    try {
      await newRole.save();
      res.status(200).json({
        status: "Success",
        message: "New Role Created",
        newRole,
      });
    } catch (error) {
      res.status(409).json({
        messege: error.messege,
      });
    }
  },
};

module.exports = role;
