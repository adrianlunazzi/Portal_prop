const express = require("express");
const routes = express.Router();
const auth = require("../controllers/auth");

routes.get("/", auth.main);
routes.get("/login", auth.login);
routes.post("/register", auth.register);

module.exports = routes;
