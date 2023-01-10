import React from "react";
import AuthCheck from "../components/AuthCheck";
import CarCard from "../components/CarCard";
import { useEffect, useState } from "react";

function HomePage() {
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
        setCars(data);
      });
  }
  useEffect(() => {
    getCars();
  }, []);

  return (
    <AuthCheck>
      <div className="container">
        <div className="row">
          {cars.map((car) => (
            <div className="col-12 col-md-6 col-lg-4">
              <CarCard car={car} />
            </div>
          ))}
        </div>
      </div>
    </AuthCheck>
  );
}

export default HomePage;
