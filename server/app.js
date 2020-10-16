const express = require("express");
const fs = require("fs");

app = express();

//Middleware: added by using app.use()
//express.json() is the middleware to parse the comming-in req.body to JavaScript Object
app.use(express.json());

//JSON parse is to converted JSON file to JavaScript Object
const toursFileName = `${__dirname}/dev-data/data/tours-simple.json`;
const tours = JSON.parse(fs.readFileSync(toursFileName));

const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    //Give the users more understanding of API response
    results: tours.length,
    data: {
      tours, //equivalent to tours: tours,
    },
  });
};

const getTour = (req, res) => {
  // console.log(req.params);
  const id = req.params.id * 1; //convert req.params.id from String to Number
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  return res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
};
const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(toursFileName, JSON.stringify(tours), (err) => {
    //201 = Created
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  });
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      tour: "<Updated tour here..>",
    },
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  res.status(204).json({
    status: "success",
  });
};
//Good Practice to Specify on API version on URL: /api/v1/
// app.get("/api/v1/tours", getAllTours);
// app.get("/api/v1/tours/:id", getTour);
app.post("/api/v1/tours", createTour);
//PUT: to receive the entire new updated object
//PATCH: to receive only the property that we updated
app.patch("/api/v1/tours/:id", updateTour);
app.delete("/api/v1/tours/:id", deleteTour);

app.route("/api/v1/tours").get(getAllTours).post(createTour);

app
  .route("/api/v1/tours/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);
const port = 3000;
app.listen(port, () => {
  console.log(`App is running @ port ${port}...`);
});
