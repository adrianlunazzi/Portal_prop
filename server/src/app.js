const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const { urlencoded } = require("express");
const methodOverride = require("method-override");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
dotenv.config();

// ---------- Middlewares ----------//

app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(cors());
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));

// ---------- Conect DB ---------- //

const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL;
mongoose
  .connect(MONGO_URL)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

// ---------- Routes ----------- //
const user = require("./routes/user");
const role = require("./routes/role");
const estate = require("./routes/estate");
const auth = require("./routes/auth");

app.use("/api/user", user);
app.use("/api/role", role);
app.use("/api/estate", estate);
app.use("/api/auth", auth);

// ---------- 404 and forward Error ----------//

app.use((req, res, next) => {
  res.status(404).render("404-page");
  next();
});
