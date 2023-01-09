var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var carSchema = new Schema(
    {
        car: {type: String, required: true},
        mileage: {type: Number, required: true},
        oilChange: {type: Array, required: true},
        tireChange: {type: Array, required: true},
        filterChange: {type: Array, required: true},
    }
);

module.exports = mongoose.model('Car', carSchema);