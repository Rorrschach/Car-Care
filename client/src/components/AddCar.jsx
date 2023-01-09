import React from "react";

function AddCar() {
  return (
    <form className="mt-5">
      <div class="form-group">
        <label for="car1">Car</label>
        <input
          type="text"
          class="form-control"
          id="car1"
          placeholder="Enter the car name"
        />
        <small id="emailHelp" class="form-text text-muted">
          Keep it as short or descriptive as you like
        </small>
      </div>
      <div class="form-group">
        <label for="mileage1">Mileage</label>
        <input
          type="number"
          class="form-control"
          id="mileage1"
          placeholder="Mileage"
        />
      </div>
      <div class="form-check"></div>
      <button type="submit" class="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default AddCar;
