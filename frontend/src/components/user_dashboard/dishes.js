import React from "react";
import {
  CssBaseline,
  Grid,
  Container,
  Typography,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from "@mui/material";
import axios from "axios";

import Fuse from "fuse.js";
import {
  Paper,
  IconButton,
  InputBase,
  ListItem,
  TextField,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

import FoodTile from "./food_tile";

class Dishes extends React.Component {
  // Constructor
  constructor(props) {
    super(props);

    this.state = {
      allFoodItems: [],
      FoodItems: [],
      searchQuery: "",
      DataisLoaded: false,
    };
  }

  componentDidMount() {
    let load = {
      vendor_id: localStorage.getItem("vendor_id"),
    };

    axios.post("/api/vendor/get_dishes", load).then((res) => {
      let result = [];
      for (let x in res.data) {
        result.push(res.data[x]);
      }
      let food = {
        allFoodItems: result,
        FoodItems: result,
        DataisLoaded: true,
      };

      this.setState(food);
    });
  }
  render() {
    if (!this.state.DataisLoaded)
      return (
        <div>
          <h1> Pleses wait some time.... </h1>{" "}
        </div>
      );

    const fuse = new Fuse(this.state.FoodItems, {
      keys: ["name", "tags"],
    });

    const search = (query) => {
      let search_text = query;
      if (search_text === "") {
        this.setState({
          FoodItems: this.state.allFoodItems,
        });
      } else {
        let result = fuse.search(search_text);
        this.setState({
          FoodItems: result.map((food) => food.item),
        });
      }
    };

    const handelSearchChange = (e) => {
      console.log(e.target.value);
      this.setState({
        searchQuery: e.target.value,
      });
    };
    // this.state.FoodItems = fuse.search("SWEET").map((food) => food.item);

    return (
      <>
        <CssBaseline />
        <Grid container mt={10} width={1}>
          <Grid item xs={3.5}></Grid>
          <Grid item xs={3} sx={{ position: "fixed" }}>
            <Grid container padding={"2vh"}>
              <Paper elevation={4} padding={"1vh"}>
                <Grid container>
                  <Grid item xs={12}>
                    <IconButton sx={{ p: "10px" }} aria-label="menu">
                      <MenuIcon />
                    </IconButton>
                    <InputBase
                      sx={{ ml: 1, flex: 1 }}
                      placeholder="Search Food Item"
                      value={this.state.searchQuery}
                      onChange={handelSearchChange}
                      inputProps={{ "aria-label": "search food canteen" }}
                    />
                    <IconButton
                      sx={{ p: "10px" }}
                      aria-label="search"
                      onClick={() => search(this.state.searchQuery)}
                    >
                      <SearchIcon />
                    </IconButton>
                  </Grid>
                  <ListItem divider />
                  <Grid item xs={12}>
                    <Typography
                      variant="h6"
                      textAlign={"center"}
                      fontWeight={"bold"}
                    >
                      SORT
                    </Typography>
                    <Grid container padding={2} spacing={2}>
                      <Grid item xs={6}>
                        <FormControl fullWidth>
                          <InputLabel>Sort by</InputLabel>
                          <Select label="Sort by" fullWidth>
                            <MenuItem value={"none"}>None</MenuItem>
                            <MenuItem value={"price"}>Price</MenuItem>
                            <MenuItem value={"rating"}>Rating</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={6}>
                        <FormControl fullWidth>
                          <InputLabel>Order</InputLabel>
                          <Select label="Order" fullWidth>
                            <MenuItem value={"asc"}>Ascending</MenuItem>
                            <MenuItem value={"desc"}>Descending</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <Grid item xs={8}>
            <Grid container spacing={3} mb={2}>
              {this.state.FoodItems.map((food, i) => (
                <FoodTile FoodItem={food} key={i} />
              ))}
            </Grid>
          </Grid>
          <Grid item xs={0.5}></Grid>
        </Grid>
      </>
    );
  }
}
export default Dishes;
