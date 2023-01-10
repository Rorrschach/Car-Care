const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const validator = require("validator");
const Car = require("../models/car");
const protect = require("../middlewares/protect");
const multer = require("multer");

router.use(protect);

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

router.get("/", async (req, res, next) => {
  const cars = await Car.find();
  res.status(200).json({
    message: "Cars fetched successfully",
    cars: cars,
  });
});
router.post("/", upload.single("carImg"), async (req, res, next) => {
  let x = JSON.parse(req.body.car);

  // Extract properties from the form-data
  const make = x.make;
  const model = x.model;
  const year = x.year;
  const mileage = x.mileage;
  const oilChange = req.body.oilChange;
  const tireChange = req.body.tireChange;
  const filterChange = req.body.filterChange;
  const lastRefuel = req.body.lastRefuel;

  // create new car object
  const car = new Car({
    _id: new mongoose.Types.ObjectId(),
    make: make,
    model: model,
    year: year,
    mileage: mileage,
    oilChange: oilChange,
    tireChange: tireChange,
    filterChange: filterChange,
    lastRefuel: lastRefuel,
    carImg: req.file.path,
    creator: req.user.id,
  });

  // save the new car to the database
  const createdCar = await car.save();
  res.status(201).json({
    message: "Car created successfully",
    car: {
      ...createdCar,
      id: createdCar._id,
    },
  });
});

router.get("/:id", async (req, res, next) => {
  // Extract id from req.params
  const { id } = req.params;
  const car = await Car.findById(id);
  res.status(200).json({
    message: "Car fetched successfully",
    car: car,
  });
});

router.put("/:id", async (req, res, next) => {
  // Extract id from req.params
  const { id } = req.params;
  // Extract updates from req.body
  const {
    make,
    model,
    year,
    mileage,
    oilChange,
    tireChange,
    filterChange,
    lastRefuel,
    carImg,
  } = req.body;
  //validate data
  if (!validator.isNumeric(year)) {
    return res.status(400).send("Invalid year format");
  }
  if (!validator.isNumeric(mileage)) {
    return res.status(400).send("Invalid mileage format");
  }
  // find the car by id and update it
  const car = await Car.findById(id);
  car.make = make;
  car.model = model;
  car.year = year;
  car.mileage = mileage;
  car.oilChange = oilChange;
  car.tireChange = tireChange;
  car.filterChange = filterChange;
  car.lastRefuel = lastRefuel;
  car.carImg = carImg;
  //save the car
  await car.save();
  res.status(200).json({
    message: "Car updated successfully",
    car: car,
  });
});

router.delete("/:id", async (req, res, next) => {
  // Extract id from req.params
  const { id } = req.params;
  const car = await Car.findByIdAndDelete(id);
  res.status(200).json({
    message: "Car deleted successfully",
    car: car,
  });
});

module.exports = router;
