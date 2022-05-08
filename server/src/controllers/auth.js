const UserList = require("../models/userList");
const bcryptjs = require("bcryptjs");
const auth = {
  main: function (req, res) {
    return res.status(200).json({
      message: "Auth Page",
    });
  },
  register: async (req, res) => {
    const { name, email, password } = req.body;
    const userExist = await UserList.findOne({ email: email });
    if (userExist) {
      return res.status(500).json({
        message: "Ya existe un usuario registrado con ese mail.",
      });
    } else {
      let password = bcryptjs.hashSync(req.body.password, 10);
      const newUser = new UserList({
        name,
        email,
        password,
        role: "User",
      });
      try {
        await newUser.save();
        res.status(200).json({
          status: "Success",
          message: "New user Created",
          newUser,
        });
      } catch (error) {
        res.status(409).json({
          messege: error.messege,
        });
      }
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const userExist = await UserList.findOne({ email: email });
      console.log(userExist);
      if (!userExist) {
        return res.status(500).json({
          message: "No existe un usuario registrado con ese mail.",
        });
      } else if (bcryptjs.compareSync(password, userExist.password)) {
        return res.status(200).json({
          status: "success",
          id: userExist._id,
          name: userExist.name,
          email: userExist.email,
          role: userExist.role,
        });
      } else {
        res.status(500).json({
          message: "La contraseña ingresada no es correcta",
        });
      }
    } catch (error) {
      return res.status(500).json({ message: "Se ha producido un error" });
    }
  },
};
module.exports = auth;
