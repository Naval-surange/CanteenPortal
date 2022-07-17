import React from "react";
import { CssBaseline, Grid, Container } from "@mui/material";

import CanteenTile from "../tiles/tiles";


class UserDashBoard extends React.Component {
  // Constructor
  constructor(props) {
    super(props);

    this.state = {
      canteens: [],
      DataisLoaded: false,
    };
  }

  componentDidMount() {
    fetch("http://localhost:4000/api/vendor")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          canteens: json,
          DataisLoaded: true,
        });
      });
  }
  render() {
    const { DataisLoaded, canteens } = this.state;
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
            {canteens.map((canteen, i) => (
              <CanteenTile canteen={canteen} key={i} />
            ))}
          </Grid>
        </Container>
      </>
    );
  }
}

export default UserDashBoard;

