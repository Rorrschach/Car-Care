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
  const cars = await Car.find({ creator: req.user.id });

  res.status(200).json({
    message: "Cars fetched successfully",
    cars: cars,
  });
});
router.post("/", upload.single("carImg"), async (req, res, next) => {
  let x = JSON.parse(req.body.car);
  // create new car object
  const car = new Car({
    _id: new mongoose.Types.ObjectId(),
    make: x.make,
    model: x.model,
    year: x.year,
    mileage: x.mileage,
    oilChange: x.oilChange,
    tireChange: x.tireChange,
    filterChange: x.filterChange,
    lastRefuel: x.lastRefuel,
    carImg: req.file ? req.file.path : x.carImg,
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

// router.put("/:id", async (req, res, next) => {
//   const id = req.params.id;
//   // Extract properties from the form-data
//   console.log("req.body", req.body);
// });

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
