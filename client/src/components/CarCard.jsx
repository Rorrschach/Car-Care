import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

export default function CarCard(props) {
  const car = props.car;
  let path = car.carImg.slice(8);
  const img = `http://localhost:3001/${path}`;

  let oilChangeDue = car.oilChange[0].mileage * 1 + 5000;
  let tireChangeDue = car.tireChange[0].mileage * 1 + 30000;
  let filterChangeDue = car.filterChange[0].mileage * 1 + 4000;

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
          Current Mileage: {car.mileage}kms
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Oil Change due at: {oilChangeDue}kms
          {car.mileage > oilChangeDue ? (
            <>
              <span style={{ color: "red" }}> Overdue</span>
              <PriorityHighIcon color="error" />
            </>
          ) : oilChangeDue - car.mileage < 1000 ? (
            <>
              <span style={{ color: "orange" }}> Due Soon</span>
              <ReportProblemIcon color="warning" />
            </>
          ) : null}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Tire Change due at: {tireChangeDue}kms
          {car.mileage > tireChangeDue ? (
            <>
              <span style={{ color: "red" }}> Overdue</span>
              <PriorityHighIcon color="error" />
            </>
          ) : tireChangeDue - car.mileage < 1000 ? (
            <>
              <span style={{ color: "orange" }}> Due Soon</span>
              <ReportProblemIcon color="warning" />
            </>
          ) : null}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Filter Change due at: {filterChangeDue}kms
          {car.mileage > filterChangeDue ? (
            <>
              <span style={{ color: "red" }}> Overdue</span>
              <PriorityHighIcon color="error" />
            </>
          ) : filterChangeDue - car.mileage < 1000 ? (
            <>
              <span style={{ color: "orange" }}> Due Soon</span>
              <ReportProblemIcon color="warning" />
            </>
          ) : null}
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
