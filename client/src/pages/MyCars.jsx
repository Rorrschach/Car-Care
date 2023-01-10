import React from "react";
import AuthCheck from "../components/AuthCheck";
import CarCard from "../components/CarCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function MyCars() {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  function getCars() {
    fetch("http://localhost:3001/api/cars", {
      method: "GET",
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        setCars(data.cars);
      });
  }
  useEffect(() => {
    getCars();
  }, []);

  function handleEdit(car) {
    navigate("/addCar", { state: car });
  }

  function handleDelete(car) {
    fetch(`http://localhost:3001/api/cars/${car._id}`, {
      method: "DELETE",
      headers: headers,
    }).then((response) => {
      getCars();
    });
  }

  return (
    <AuthCheck>
      <div className="container">
        <div className="row mt-5">
          {cars.map((car) => (
            <div className="col-12 col-md-6 col-lg-4">
              <CarCard
                car={car}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            </div>
          ))}
        </div>
      </div>
    </AuthCheck>
  );
}

export default MyCars;
