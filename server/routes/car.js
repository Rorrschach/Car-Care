const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Car = require("../models/car");
const protect = require("../middlewares/protect");

router.use(protect);

router.get("/", async (req, res, next) => {
  const cars = await Car.find();
  res.status(200).json({
    message: "Cars fetched successfully",
    cars: cars,
  });
});

router.post("/", async (req, res, next) => {
  const {
    car,
    mileage,
    oilChange,
    tireChange,
    filterChange,
    lastRefuel,
    imageUrl,
  } = req.body;
  console.log(req.user.id);

  const car1 = new Car({
    _id: new mongoose.Types.ObjectId(),
    car: car,
    mileage: mileage,
    oilChange: oilChange,
    tireChange: tireChange,
    filterChange: filterChange,
    lastRefuel: lastRefuel,
    imageUrl: imageUrl,
    creator: req.user.id,
  });

  const createdCar = await car1.save();
  res.status(201).json({
    message: "Car created successfully",
    car: {
      ...createdCar,
      id: createdCar._id,
    },
  });
});

router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  const car = await Car.findById(id);
  res.status(200).json({
    message: "Car fetched successfully",
    car: car,
  });
});

router.put("/:id", async (req, res, next) => {
  const id = req.params.id;
  const {
    car,
    mileage,
    oilChange,
    tireChange,
    filterChange,
    lastRefuel,
    imageUrl,
  } = req.body;

  const car1 = await Car.findByIdAndUpdate(id, {
    car: car,
    mileage: mileage,
    oilChange: oilChange,
    tireChange: tireChange,
    filterChange: filterChange,
    lastRefuel: lastRefuel,
    imageUrl: imageUrl,
  });
  console.log(car1);
  res.sendStatus(200);
});

router.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  const car = await Car.findByIdAndDelete(id);
  res.status(200).json({
    message: "Car deleted successfully",
    car: car,
  });
});

module.exports = router;
