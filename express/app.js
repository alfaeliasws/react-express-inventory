const express = require("express");
const cors = require("cors");
const port = 4500;
const config = require("./config");
const helper = require("./helper");
const baseURL = config.util.base;
const authRouter = require("./routes/Auth");
const productsRouter = require("./routes/Products");
// const jwt = require("jsonwebtoken");

startExpress();

function startExpress() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(baseURL + "/products",  productsRouter);

  /* Error handler middleware */
  app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
  });
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}
