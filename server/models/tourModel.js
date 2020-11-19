const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name"], //[true, error_msg],
    unique: true, //Key
  },
  duration: {
    type: Number,
    required: [true, "A tour must have a duration"],
  },
  maxGroupSize: {
    type: Number,
    required: [true, "A tour must have a group size"],
  },
  difficulty: {
    type: String,
    required: [true, "A tour must have a difficulty"],
  },
  ratingsAverage: {
    type: Number,
    default: 0,
  },
  ratingsQuantity: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, "A tour must have a price"],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true, //trim Only work for String, to remove all the whitespaces @ begin & end
  },
  description: {
    type: String,
    trim: true,
    required: [true, "A tour must have a description"],
  },
  imageCover: {
    type: String,
    required: [true, "A tour must have a cover image"],
  },
  images: [String], //Images stored as array of String
  createdAt: {
    type: Date,
    default: Date.now(), //JavaScript Date function
  },
  startDates: [Date], //Array of Dates
});
//Create a model
const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
