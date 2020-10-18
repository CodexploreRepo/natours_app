const express = require("express");
const morgan = require("morgan");

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

app = express();

//#1 - Middleware: added by using app.use()
app.use(morgan("dev")); //To log req/res info
app.use(express.json()); //express.json() is the middleware to parse the comming-in req.body to JavaScript Object

app.use((req, res, next) => {
  console.log("Hello From Middleware");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//#3 - ROUTES:

//Mouting the router
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
