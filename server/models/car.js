const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const carSchema = new Schema({
  car: { type: String, required: true },
  mileage: { type: Number, required: true },
  oilChange: { type: Array },
  tireChange: { type: Array },
  filterChange: { type: Array },
  lastRefuel: { type: Array },
  imageUrl: { type: String },
});

module.exports = mongoose.model("Car", carSchema);
