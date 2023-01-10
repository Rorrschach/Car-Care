import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function CarCard(props) {
  const car = props.car;
  let path = car.carImg.slice(8);
  const img = `http://localhost:3001/${path}`;

  function handleEdit() {
    props.handleEdit(car);
  }

  function handleDelete() {
    props.handleDelete(car);
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} image={img} title="" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {car.make} {car.model}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {car.year}

          {car.mileage}

          {car.oilChange.mileage}

          {car.oilChange.date}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleEdit}>
          Edit
        </Button>
        <Button size="small" onClick={handleDelete}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
