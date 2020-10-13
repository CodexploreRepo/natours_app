const express = require("express");
const fs = require("fs");

app = express();
//JSON parse is to converted JSON file to JavaScript Object
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`),
);

//Good Practice to Specify on API version on URL: /api/v1/
app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    //Give the users more understanding of API response
    results: tours.length,
    data: {
      tours, //equivalent to tours: tours,
    },
  });
});

app.post("api/v1/tours", (req, res) => {
});

const port = 3000;
app.listen(port, () => {
  console.log(`App is running @ port ${port}...`);
});
