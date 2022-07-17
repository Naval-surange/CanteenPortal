import React, { Component } from "react";
import axios from "axios";

import {
  Grid,
  CssBaseline,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export class Stats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Orders: [],
      DataisLoaded: false,
    };
  }

  componentDidMount() {
    axios
      .post("http://localhost:4000/api/order/get_all_food", {
        vendor_id: localStorage.getItem("token"),
      })
      .then((res) => {
        this.setState({
          Orders: res.data,
          DataisLoaded: true,
        });
      });
  }

  render() {
    if (!this.state.DataisLoaded) {
      return <div>Loading...</div>;
    }
    console.log(this.state.Orders);
    return (
      <>
        <CssBaseline />
        <Grid container mt={12}>
          <Grid item xs={1} />
          <Grid item xs={10}>
            <Paper>
              <Grid container spacing={2}>
                <Grid item xs={1} />
                <Grid item xs={10}>
                  <Paper elevation={3} mt={2}>
                    <Grid container>
                      <Grid item xs={12}>
                        <Typography
                          variant={"h4"}
                          fontWeight={"bold"}
                          textAlign={"center"}
                        >
                          {" "}
                          Top Selling items{" "}
                        </Typography>
                      </Grid>
                      <Grid item xs={2} />
                      <Grid
                        item
                        xs={8}
                        alignItems={"center"}
                        textAlign={"center"}
                        justifyContent={"center"}
                        justifyItems={"center"}
                        alignContent={["center"]}
                      >
                        <List textAlign="center">
                          {this.state.Orders.map((order) => (
                            <ListItem alignItems="center" textAlign="center">
                              <ListItemText
                                textAlign="center"
                                primary={order.name}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Grid>
                      <Grid item xs={2} />
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item xs={1} />
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={1} />
        </Grid>
      </>
    );
  }
}

export default Stats;
