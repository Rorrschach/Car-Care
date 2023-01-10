import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import InputAdornment from "@mui/material/InputAdornment";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

export default function AddCar(props) {
  const navigate = useNavigate();
  const [car, setCar] = useState({
    make: "",
    model: "",
    year: 2000,
    mileage: "",
    oilChange: {
      mileage: "",
      date: 2000,
    },
    tireChange: {
      mileage: "",
      date: 2000,
    },
    filterChange: {
      mileage: "",
      date: 2000,
    },
    lastRefuel: {
      mileage: "",
      amount: 1,
    },
    carImg: "",
  });

  const carData = useSelector((state) => state.carData);

  useEffect(() => {
    if (carData) {
      setCar(carData);
    }
  }, [carData]);

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const data = new FormData();
  data.append("carImg", car.carImg); // where image is the file object you want to upload.
  data.append("car", JSON.stringify(car)); // where car is the json object with the car information

  function handleSubmit(e) {
    e.preventDefault();
    if (!car.make || !car.model || !car.year || !car.mileage) {
      alert("Please fill all required fields!");
      return;
    }

    console.log(car);

    fetch("http://localhost:3001/api/cars", {
      method: "POST",
      headers: headers,
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        navigate("/");
      });
  }

  return (
    <div className="container">
      <h3 className="mt-5 text-center">ADD A NEW CAR TO YOUR COLLECTION</h3>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "40ch" },
          }}
          noValidate
          autoComplete="off"
          className="mt-4"
        >
          <div>
            <TextField
              required
              id="outlined-required"
              label="Make"
              value={car.make}
              onChange={(e) => setCar({ ...car, make: e.target.value })}
            />
            <TextField
              required
              id="outlined-required"
              label="Model"
              value={car.model}
              onChange={(e) => setCar({ ...car, model: e.target.value })}
            />
            <DatePicker
              views={["year"]}
              label="Year"
              value={car.year}
              onChange={(newValue) => {
                setCar({ ...car, year: newValue });
              }}
              renderInput={(params) => (
                <TextField {...params} helperText={null} />
              )}
            />
          </div>
        </Box>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "124ch" },
          }}
        >
          <div>
            <TextField
              fullWidth
              id="outlined-required"
              label="Mileage"
              type="number"
              onChange={(e) => setCar({ ...car, mileage: e.target.value })}
              value={car.mileage}
            />
          </div>
        </Box>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "61ch" },
          }}
        >
          <div>
            <TextField
              fullWidth
              id="outlined-required"
              label="Oil Change Mileage"
              type="number"
              onChange={(e) =>
                setCar({
                  ...car,
                  oilChange: { ...car.oilChange, mileage: e.target.value },
                })
              }
              value={car.oilChange.mileage}
            />
            <DatePicker
              views={["year"]}
              label="Year"
              value={car.oilChange.date}
              onChange={(newValue) => {
                setCar({
                  ...car,
                  oilChange: { ...car.oilChange, date: newValue },
                });
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
        </Box>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "61ch" },
          }}
        >
          <div>
            <TextField
              fullWidth
              id="outlined-required"
              label="Filter Change Mileage"
              type="number"
              onChange={(e) =>
                setCar({
                  ...car,
                  filterChange: {
                    ...car.filterChange,
                    mileage: e.target.value,
                  },
                })
              }
              value={car.filterChange.mileage}
            />
            <DatePicker
              views={["year"]}
              label="Year"
              value={car.filterChange.date}
              onChange={(newValue) => {
                setCar({
                  ...car,
                  filterChange: { ...car.filterChange, date: newValue },
                });
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
        </Box>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "61ch" },
          }}
        >
          <div>
            <TextField
              fullWidth
              id="outlined-required"
              label="Tire Change Mileage"
              type="number"
              onChange={(e) =>
                setCar({
                  ...car,
                  tireChange: { ...car.tireChange, mileage: e.target.value },
                })
              }
              value={car.tireChange.mileage}
            />
            <DatePicker
              views={["year"]}
              label="Year"
              value={car.tireChange.date}
              onChange={(newValue) => {
                setCar({
                  ...car,
                  tireChange: { ...car.tireChange, date: newValue },
                });
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
        </Box>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "61ch" },
          }}
        >
          <div>
            <TextField
              fullWidth
              id="outlined-required"
              label="Last Refuel Mileage"
              type="number"
              onChange={(e) =>
                setCar({
                  ...car,
                  lastRefuel: { ...car.lastRefuel, mileage: e.target.value },
                })
              }
              value={car.lastRefuel.mileage}
            />
            <TextField
              label="Fuel Quantity"
              id="outlined-start-adornment"
              sx={{ m: 1, width: "25ch" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">ltr</InputAdornment>
                ),
              }}
              onChange={(e) =>
                setCar({
                  ...car,
                  lastRefuel: { ...car.lastRefuel, amount: e.target.value },
                })
              }
              value={car.lastRefuel.amount}
            />
          </div>
          <input
            type="file"
            name="carImg"
            onChange={(e) => setCar({ ...car, carImg: e.target.files[0] })}
            className="mt-2 mx-2"
          />
        </Box>

        <button
          type="submit"
          className="btn btn-primary mt-4 mx-2"
          onClick={(e) => handleSubmit(e)}
        >
          Submit
        </button>
      </LocalizationProvider>
    </div>
  );
}
