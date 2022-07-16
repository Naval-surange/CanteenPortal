import React from "react";
import { CssBaseline, Grid, Container, Typography } from "@mui/material";
import axios from "axios";

import FoodTile from "./food_tile";

class Favs extends React.Component {
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
      buyer_id: localStorage.getItem("token"),
    };

    axios.post("http://localhost:4000/buyer/getfavs", load).then((res) => {
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

    console.log(FoodItems);

    return (
      <>
        <CssBaseline />
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            align="center"
            color="textPrimary"
            gutterBottom
            mt={10}
            fontWeight="fontWeightBold"
          >
            Favourate Food Items
          </Typography>

          <Grid container spacing={3} mb={2}>
            {FoodItems.map((food, i) => (
              <FoodTile FoodItem={food} key={i} />
            ))}
          </Grid>
        </Container>
      </>
    );
  }
}
export default Favs;
