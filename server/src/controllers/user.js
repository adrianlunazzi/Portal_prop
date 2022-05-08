const bcryptjs = require("bcryptjs");
const UserList = require("../models/userList");
const user = {
  main: function (req, res) {
    return res.status(200).json({
      message: "Main Page",
    });
  },
  list: async (req, res) => {
    try {
      const userList = await UserList.find({});
      return res.status(200).json({
        status: "Success",
        userList,
      });
    } catch (error) {}
  },
  detail: async (req, res) => {
    const { id } = req.params;
    try {
      const userDetail = await UserList.findById({ _id: id });
      return res.status(200).json({
        status: "message",
        userDetail,
      });
    } catch (error) {}
  },
  edit: async (req, res) => {
    const { id } = req.params;
    const { name, email, role, password } = req.body;
    try {
      const userExist = await UserList.findOne({ _id: id });
      if (!userExist) {
        res.status(500).json({
          message: "El usuario elegido no existe",
        });
      } else {
        let password = bcryptjs.hashSync(req.body.password, 10);
        const editUser = await UserList.updateOne({
          name,
          email,
          role,
          password,
        });
        return res.status(200).json({
          status: "Success",
          message: "Se actualizo la informacion de usuario",
          editUser,
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Ocurrio un error",
      });
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const userDelete = await UserList.findById({ _id: id });
      console.log(userDelete);
      if (!userDelete) {
        res.status(500).json({
          message: "El usuario solicitado no existe",
        });
      } else {
        const deleteUser = await UserList.deleteOne(userDelete);
        console.log(deleteUser);
        res.status(200).json({
          status: "Success",
          message: `El usuario ${userDelete.name} ha sido borrado`,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Se ha producido un error",
      });
    }
  },
};

module.exports = user;
