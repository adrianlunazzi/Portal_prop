const express = require("express");
const routes = express.Router();
const estate = require("../controllers/estate");

routes.get("/", estate.main);
module.exports = routes;
