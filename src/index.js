const express = require("express");
const cors = require("cors");
const compression = require("compression");
const morgan = require("morgan");
const config = require("./config");
require("./database");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(compression());
app.use(morgan("dev"));

require("./router")(app);

app.use((err, req, res, next) => {
  console.log(err);
  // res.status(500).json({ message: "internal server error" });
});

app.listen(config.port, () => {
  console.log("server listening ");
});
