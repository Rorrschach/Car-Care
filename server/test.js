const mongoose = require("mongoose");

const userIds = [
  mongoose.Types.ObjectId("63bd330bf32102caed9c9c53"),
  mongoose.Types.ObjectId("63bdf4c1dd76249519527e0b"),
];

const cars = [
  {
    _id: new mongoose.Types.ObjectId(),
    make: "Chevrolet",
    model: "Corvette",
    year: "2020",
    mileage: 12000,
    oilChange: [
      {
        date: "2021",
        mileage: 12000,
      },
    ],
    tireChange: [
      {
        date: "2020",
        mileage: 12000,
        notes: "Tire change",
      },
    ],
    filterChange: [
      {
        date: "2020",
        mileage: 12000,
        notes: "Filter change",
      },
    ],
    lastRefuel: [
      {
        date: "2020",
        mileage: 12000,
        notes: "Last refuel",
      },
    ],
    carImg: "uploads/1600751341535.jpg",
    creator: userIds[0],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    make: "Ford",
    model: "Mustang",
    year: "2019",
    mileage: 12000,
    oilChange: [
      {
        date: "2020",
        mileage: 12000,
      },
    ],
    tireChange: [
      {
        date: "2020",
        mileage: 12000,
        notes: "Tire change",
      },
    ],
    filterChange: [
      {
        date: "2020",
        mileage: 12000,
        notes: "Filter change",
      },
    ],
    lastRefuel: [
      {
        date: "2020",
        mileage: 12000,
        notes: "Last refuel",
      },
    ],
    carImg: "uploads/1600751341535.jpg",
    creator: userIds[0],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    make: "Chevrolet",
    model: "Camaro",
    year: "2020",
    mileage: 12000,
    oilChange: [
      {
        date: "2021",
        mileage: 12000,
      },
    ],
    tireChange: [
      {
        date: "2020",
        mileage: 12000,
        notes: "Tire change",
      },
    ],
    filterChange: [
      {
        date: "2020",
        mileage: 12000,
        notes: "Filter change",
      },
    ],
    lastRefuel: [
      {
        date: "2020",
        mileage: 12000,
        notes: "Last refuel",
      },
    ],
    carImg: "uploads/1600751341535.jpg",
    creator: userIds[1],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    make: "Ford",
    model: "F-150",
    year: "2019",
    mileage: 12000,
    oilChange: [
      {
        date: "2020",
        mileage: 12000,
      },
    ],
    tireChange: [
      {
        date: "2020",
        mileage: 12000,
        notes: "Tire change",
      },
    ],
    filterChange: [
      {
        date: "2020",
        mileage: 12000,
        notes: "Filter change",
      },
    ],
    lastRefuel: [
      {
        date: "2020",
        mileage: 12000,
        notes: "Last refuel",
      },
    ],
    carImg: "uploads/1600751341535.jpg",
    creator: userIds[1],
  },
];

module.exports = cars;
