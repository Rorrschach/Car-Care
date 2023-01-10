const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const carSchema = new Schema({
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  mileage: { type: Number, required: true },
  oilChange: { type: Array },
  tireChange: { type: Array },
  filterChange: { type: Array },
  lastRefuel: { type: Array },
  carImg: { type: String },
});

module.exports = mongoose.model("Car", carSchema);
