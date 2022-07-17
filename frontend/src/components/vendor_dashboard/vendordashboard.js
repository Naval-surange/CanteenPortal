import React from "react";
import axios from "axios";

import { Grid,Container,CssBaseline } from "@mui/material";

import FoodTile from "./food_tile";

class VendorDashBoard extends React.Component {
  // Constructor
  constructor(props) {
    super(props);

    this.state = {
      FoodItems: [],
      DataisLoaded: false,
    };
  }

  componentDidMount() {
    let load = {
      vendor_id: localStorage.getItem("token"),
    };

    axios.post("http://localhost:4000/api/vendor/get_dishes", load).then((res) => {
      let result = [];
      for (let x in res.data) {
        result.push(res.data[x]);
      }
      let food = {
        FoodItems: result,
        DataisLoaded: true,
      };

      this.setState(food);
    });
  }
  render() {
    const { DataisLoaded, FoodItems } = this.state;
    if (!DataisLoaded)
      return (
        <div>
          <h1> Pleses wait some time.... </h1>{" "}
        </div>
      );

    return (
      <>
        <CssBaseline />
        <Container maxWidth="lg">
          <Grid container spacing={3} mt={10} mb={2}>
            {FoodItems.map((food, i) => (
              <FoodTile FoodItem={food} key={i} />
            ))}
          </Grid>
        </Container>
      </>
    );
  }
}

export default VendorDashBoard;
