import React, { Component } from "react";
import axios from "axios";

import { Paper, Grid, Button } from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

let updateOrder = (orderID) => {
  axios.post("/api/order/update", {
    order_id: orderID,
  });
  window.location.reload();
};

const columns = [
  { field: "dishName", headerName: "Name of Dish", width: 250 },
  {
    field: "placeTime",
    headerName: "Placed At",
    width: 200,
    sortable: true,
    sortingOrder: ["desc"],
  },
  { field: "orderID", width: 300 },
  {
    field: "quantity",
    headerName: "Quantity",
    width: 100,
  },
  {
    field: "status",
    headerName: "Status",
    width: 200,
  },
  {
    field: "action",
    headerName: "Action",
    sortable: false,
    width: 150,
    renderCell: (params) => {
      const onClick = (e) => {
        e.stopPropagation(); // don't select this row after clicking

        const api = params.api;
        const thisRow = {};

        api
          .getAllColumns()
          .filter((c) => c.field !== "__check__" && !!c)
          .forEach(
            (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
          );

        updateOrder(thisRow.orderID);
      };

      return (
        <Button variant="contained" onClick={onClick}>
          NEXT STAGE
        </Button>
      );
    },
  },
];

export class Orders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Orders: [],
      FoodDetails: [],
      step2: false,
      DataisLoaded: false,
    };
  }

  componentDidMount() {
    axios
      .post("/api/order/get", {
        vendor_id: localStorage.getItem("token"),
      })
      .then((res) => {
        this.setState({
          Orders: res.data,
        });

        let results = [];
        for (let i = 0; i < this.state.Orders.length; i++) {
          let load = {
            food_id: this.state.Orders[i].__foodID,
          };
          results[i] = axios
            .post("/api/vendor/get_dish", load)
            .then((res) => {
              this.state.FoodDetails.push(res.data);
            });
        }

        axios.all(results).then(() => {
          if (this.state.FoodDetails.length === this.state.Orders.length) {
            this.setState({
              DataisLoaded: true,
            });
          }
        });
      });
  }

  render() {
    if (!this.state.DataisLoaded) {
      return <div>Loading...</div>;
    }

    // console.log(this.state);

    const get_rows = () => {
      let rows = [];
      for (let i = 0; i < this.state.Orders.length; i++) {
        let row = {};
        row["id"] = i + 1;
        row["dishName"] = this.state.FoodDetails[i].name;
        row["orderID"] = this.state.Orders[i]._id;
        row["placeTime"] = this.state.Orders[i].createdAt;
        row["quantity"] = this.state.Orders[i].quantity;
        row["status"] = this.state.Orders[i].status;
        rows.push(row);
      }

      return rows;
    };

    let rows = get_rows();

    return (
      <>
        <Grid container mt={10}>
          <Grid xs={2}></Grid>
          <Grid xs={8}>
            <Paper style={{ height: "80vh", width: "100%" }}>
              <DataGrid
                columnVisibilityModel={{ orderID: false }}
                mt={10}
                rows={rows}
                columns={columns}
              />
            </Paper>
          </Grid>
          <Grid xs={2}></Grid>
        </Grid>
      </>
    );
  }
}

export default Orders;
