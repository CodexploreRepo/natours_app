//STARTING POINT
const dotenv = require("dotenv");
const mongoose = require("mongoose");
//dotenv module: to read variables from the config.env file &
//save in Node.JS environment variables
dotenv.config({ path: "./config.env" });
// console.log(process.env);
const app = require("./app");

//Database Connection
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD //replace Password in the DATABASE String
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected sucessfully"));

//#4 - START SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running @ port ${port}...`);
});
