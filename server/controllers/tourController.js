const fs = require("fs");

//JSON parse is to converted JSON file to JavaScript Object
const toursFileName = `${__dirname}/../dev-data/data/tours-simple.json`;
const tours = JSON.parse(fs.readFileSync(toursFileName));

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    //Give the users more understanding of API response
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours, //equivalent to tours: tours,
    },
  });
};

exports.getTour = (req, res) => {
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
exports.createTour = (req, res) => {
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

exports.updateTour = (req, res) => {
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

exports.deleteTour = (req, res) => {
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
