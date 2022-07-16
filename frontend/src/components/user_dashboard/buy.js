import React, { Component } from "react";

import axios from "axios";
import {
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  styled,
  Chip,
  Rating,
  Divider,
  Box,
  ListItem,
  CardMedia,
  CardContent,
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

export default class Buy extends Component {
  constructor(props) {
    super(props);

    this.state = {
      NumberOfItems: 0,
      cost: 0,
      FoodDetails: [],
      VendorDetails: [],
      DataisLoaded: false,
      quantity: 1,
      isFav: false,
      selAddons: new Set([]),
    };
  }

  componentDidMount() {
    let load = {
      food_id: localStorage.getItem("foodId"),
    };

    axios.post("http://localhost:4000/vendor/get_dish", load).then((res) => {
      let v_id = res.data.__vendorID;

      let vDetails = [];
      axios
        .post("http://localhost:4000/vendor/details", { vendor_id: v_id })
        .then((res) => {
          vDetails = res.data;
          this.setState({ VendorDetails: vDetails });
        });

      axios
        .post("http://localhost:4000/buyer/get_buyer", {
          buyer_id: localStorage.getItem("token"),
        })
        .then((res) => {
          let favs = [];

          for (let i in res.data.favs) {
            favs.push(res.data.favs[i]);
          }

          if (favs.includes(localStorage.getItem("foodId"))) {
            this.setState({ isFav: true });
          } else {
            this.setState({ isFav: false });
          }
        });
      let food = {
        cost: res.data.price,
        FoodDetails: res.data,
        NumberOfItems: 0,
        DataisLoaded: true,
      };

      this.setState(food);
    });
  }

  render() {
    if (!this.state.DataisLoaded) {
      return (
        <div>
          <h1> Pleses wait some time.... </h1>{" "}
        </div>
      );
    }

    const TagItem = styled("li")(({ theme }) => ({
      margin: theme.spacing(0.5),
    }));

    const StyledRating = styled(Rating)({
      "& .MuiRating-iconFilled": {
        color: "#FFFF00",
      },
      "& .MuiRating-iconHover": {
        color: "#FFFF00",
      },
    });

    const handelQuantityChange = (e) => {
      this.setState({ quantity: e.target.value });
    };

    const handleAddonClick = (addon) => {
      if (this.state.selAddons.has(addon)) {
        this.state.selAddons.delete(addon);
      } else {
        this.state.selAddons.add(addon);
      }

      console.log(this.state.selAddons);
    };


    const handelBuy = () => {
      let load = {
        food_id: localStorage.getItem("foodId"),
        buyer_id: localStorage.getItem("token"),
        quantity: this.state.quantity,
      };
      axios.post("http://localhost:4000/order", load).then((res) => {
        if (res.status === 200) {
          alert("Order Placed Successfully");
        } else {
          alert(res.json.msg);
        }
      });
    };

    const unFav = () => {
      let load = {
        food_id: localStorage.getItem("foodId"),
        buyer_id: localStorage.getItem("token"),
      };
      axios.post("http://localhost:4000/buyer/unfav", load).then((res) => {
        if (res.status === 200) {
          this.setState({ isFav: false });
        } else {
          alert(res.json.msg);
        }
      });
    };

    const makeFav = () => {
      let load = {
        user_id: localStorage.getItem("token"),
        food_id: localStorage.getItem("foodId"),
      };

      axios.post("http://localhost:4000/buyer/make_fav", load).then((res) => {
        if (res.status === 200) {
          this.setState({ isFav: true });
        } else {
          alert(res.json.msg);
        }
      });
    };

    let is_veg;
    if (this.state.FoodDetails.veg) {
      is_veg = (
        <Chip
          label="Vegetarian"
          style={{ backgroundColor: "green", color: "white", width: "30vh" }}
        />
      );
    } else {
      is_veg = (
        <Chip label="Non-Vegetarian" style={{ backgroundColor: "red" }} />
      );
    }

    return (
      <Grid container mt={10} xs={12} md={12}>
        <Grid xs={1}></Grid>
        <Grid xs={10}>
          <Paper sx={{ padding: "2vh" }} elevation={3}>
            <Grid container sx={{ m: "2vh" }}>
              <Grid xs={11}>
                <Typography variant="h4" fontWeight={"bold"}>
                  {this.state.FoodDetails.name}{" "}
                </Typography>
              </Grid>
              <Grid xs={1}>
                {this.state.isFav ? (
                  <FavoriteIcon onClick={unFav} fontSize="large" />
                ) : (
                  <FavoriteBorderIcon onClick={makeFav} fontSize="large" />
                )}
              </Grid>
            </Grid>

            <Grid container gap={"2vh"}>
              <Grid xs={4}>
                <Paper elevation={"2"} sx={{ minHeight: "43vh", mt: "3vh" }}>
                  <Grid container>
                    <Grid xs={12} mt={2}>
                      <Typography fontWeight={"bold"} textAlign={"center"}>
                        Veg/Non-veg
                      </Typography>
                      <Typography
                        variant="h6"
                        fontWeight={"bold"}
                        display="inline"
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          flexWrap: "wrap",
                          listStyle: "none",
                          p: 0.5,
                          m: 0,
                        }}
                      >
                        {is_veg}
                      </Typography>
                    </Grid>
                    <ListItem divider></ListItem>

                    <Grid xs={12}>
                      <Typography textAlign={"center"} fontWeight={"bold"}>
                        Tags
                      </Typography>
                      <Typography
                        display="inline"
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          flexWrap: "wrap",
                          listStyle: "none",
                          p: 0.5,
                          m: 0,
                        }}
                      >
                        {this.state.FoodDetails.tags.map((tag, i) => {
                          return (
                            <TagItem key={i}>
                              <Chip label={tag} />
                            </TagItem>
                          );
                        })}
                      </Typography>
                    </Grid>

                    <ListItem divider></ListItem>
                    <Grid container>
                      <Grid xs={12}>
                        <Typography fontWeight={"Bold"} textAlign={"center"}>
                          Current Rating{" "}
                        </Typography>
                      </Grid>
                      <Grid xs={4}></Grid>
                      <Grid xs={8}>
                        <Box
                          display="flex"
                          sx={{
                            width: "100%",
                            alignItems: "center",
                            alignContent: "center",
                            textAlign: "center",
                          }}
                        >
                          <StyledRating
                            name="customized-color"
                            readOnly
                            defaultValue={this.state.FoodDetails.rating}
                            getLabelText={(value) => `${value}`}
                            precision={0.5}
                            icon={<StarIcon fontSize="inherit" />}
                            emptyIcon={<StarBorderIcon fontSize="inherit" />}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid xs={4}>
                <Paper elevation={"2"} sx={{ minHeight: "43vh", mt: "3vh" }}>
                  <Grid container>
                    <Grid xs={12} mt={2}>
                      <Typography textAlign={"center"} fontWeight={"bold"}>
                        {this.state.VendorDetails.shopName}
                      </Typography>
                    </Grid>
                    <ListItem divider />
                    <Grid xs={12} mb={2}></Grid>

                    <Grid
                      xs={6}
                      display="inline"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        flexWrap: "wrap",
                        listStyle: "none",
                        p: 0.5,
                        m: 0,
                      }}
                    >
                      <Chip
                        label={
                          <>
                            <Typography
                              textAlign={"center"}
                              fontWeight={"bold"}
                            >
                              Manager
                            </Typography>
                            <Divider />
                            <Typography textAlign={"center"}>
                              {this.state.VendorDetails.managerName}
                            </Typography>
                          </>
                        }
                        sx={{ height: "100%" }}
                      ></Chip>
                    </Grid>

                    <Grid
                      xs={6}
                      display="inline"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        flexWrap: "wrap",
                        listStyle: "none",
                        p: 0.5,
                        m: 0,
                      }}
                    >
                      <Chip
                        label={
                          <>
                            <Typography
                              textAlign={"center"}
                              fontWeight={"bold"}
                            >
                              Email
                            </Typography>
                            <Divider />
                            <Typography textAlign={"center"}>
                              {this.state.VendorDetails.email}
                            </Typography>
                          </>
                        }
                        sx={{ height: "100%" }}
                      ></Chip>
                    </Grid>

                    <ListItem divider />
                    <Grid xs={12} mb={2}></Grid>

                    <Grid
                      xs={6}
                      display="inline"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        flexWrap: "wrap",
                        listStyle: "none",
                        p: 0.5,
                        m: 0,
                      }}
                    >
                      <Chip
                        label={
                          <>
                            <Typography
                              textAlign={"center"}
                              fontWeight={"bold"}
                            >
                              Open Time
                            </Typography>
                            <Divider />
                            <Typography textAlign={"center"}>
                              {Date(this.state.VendorDetails.openTime).substr(
                                16,
                                8
                              )}
                            </Typography>
                          </>
                        }
                        sx={{ height: "100%" }}
                      ></Chip>
                    </Grid>
                    <Grid
                      xs={6}
                      display="inline"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        flexWrap: "wrap",
                        listStyle: "none",
                        p: 0.5,
                        m: 0,
                      }}
                    >
                      <Chip
                        label={
                          <>
                            <Typography
                              textAlign={"center"}
                              fontWeight={"bold"}
                            >
                              Close Time
                            </Typography>
                            <Divider />
                            <Typography textAlign={"center"}>
                              {Date(this.state.VendorDetails.closeTime).substr(
                                16,
                                8
                              )}
                            </Typography>
                          </>
                        }
                        sx={{ height: "100%" }}
                      ></Chip>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              <Grid xs={3.5}>
                <Paper elevation={"2"} sx={{ minHeight: "43vh", mt: "3vh" }}>
                  <Grid container>
                    <CardMedia
                      component="img"
                      height="194"
                      image="https://source.unsplash.com/random"
                      alt="Paella dish"
                    />
                    <CardContent>
                      <Typography textAlign={"center"}>
                        {this.state.FoodDetails.name}
                      </Typography>
                    </CardContent>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>

            <Grid container mt={2}>
              <Grid item xs={6}>
                <Typography textAlign={"center"} fontWeight={"Bold"}>
                  Addons
                </Typography>
                <Typography
                  display="inline"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    listStyle: "none",
                    p: 0.5,
                    m: 0,
                  }}
                >
                  {this.state.FoodDetails.addons.map((addon, i) => {
                    return (
                      <>
                        <TagItem key={i}>
                          <Chip
                            name={addon.name}
                            label={addon.name + " ( " + addon.price + " ₹)"}
                            onClick={() => {
                              handleAddonClick(addon);
                            }}
                            color="primary"
                          />
                        </TagItem>
                      </>
                    );
                  })}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography textAlign={"center"} fontWeight={"Bold"}>
                  Selected Addons
                </Typography>
                <Typography
                  display="inline"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    listStyle: "none",
                    p: 0.5,
                    m: 0,
                  }}
                >
                  {Array.from(this.state.selAddons).map((addon, i) => {
                    return (
                      <>
                        <TagItem key={i}>
                          <Chip
                            name={addon.name}
                            label={addon.name + " ( " + addon.price + " ₹)"}
                            onClick={() => {
                              handleAddonClick(addon);
                            }}
                            color="primary"
                          />
                        </TagItem>
                      </>
                    );
                  })}
                </Typography>
              </Grid>
            </Grid>

            <Grid container mt={4}>
              <Grid xs={1}></Grid>
              <Grid xs={3}>
                <TextField
                  label={"Quantity"}
                  type={"number"}
                  value={this.quantity}
                  onChange={handelQuantityChange}
                  fullWidth
                ></TextField>
              </Grid>
              <Grid xs={5}>
                <Typography textAlign={"center"} fontWeight={"bold"}>
                  {" "}
                  Total Cost: {this.state.cost} x {this.state.quantity} ={" "}
                  {this.state.cost * this.state.quantity} ₹
                </Typography>
              </Grid>
              <Grid xs={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    handelBuy();
                  }}
                >
                  Buy Now!!
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid xs={1}></Grid>
      </Grid>
    );
  }
}
