import React from "react";
import {
  CssBaseline,
  Grid,
  TextField,
  Typography,
  Button,
  Box,
  Container,
  ListItem,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";

import TagFacesIcon from "@mui/icons-material/TagFaces";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

import { useState } from "react";
import axios from "axios";

const TagItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const Input = styled("input")({
  display: "none",
});

export default function AddFood() {
  const [newTag, setNewTag] = useState("");
  const handleNewTag = (e) => {
    setNewTag(e.target.value.toUpperCase());
  };

  const [chipData, setChipData] = useState([]);
  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  const [newAddon, setNewAddon] = useState("");
  const handleNewAddon = (e) => {
    setNewAddon(e.target.value.toUpperCase());
  };

  const [newAddonPrice, setNewAddonPrice] = useState("");
  const handleNewAddonPrice = (e) => {
    setNewAddonPrice(e.target.value.toUpperCase());
  };

  const [addonData, setAddonData] = useState([]);
  const handleAddonDelete = (addonToDelete) => () => {
    setAddonData((addons) =>
      addons.filter((addon) => addon.key !== addonToDelete.key)
    );
  };

  const [veg, setVeg] = React.useState("");
  const handleVeg = (event) => {
    setVeg(event.target.value);
  };

  const addTag = () => {
    if (newTag.length > 0) {
      setChipData([...chipData, { key: chipData.length, label: newTag }]);
    }
  };

  const addAddon = () => {
    if (newAddon.length > 0) {
      setAddonData([
        ...addonData,
        { key: addonData.length, label: newAddon, price: newAddonPrice },
      ]);
    }
  };

  const addDish = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (
      data.get("dishName").length > 0 &&
      data.get("price").length > 0 &&
      data.get("veg").length > 0 &&
      chipData.length > 0
    ) {
      let veg_bool = true;
      if (data.get("veg") === "Veg") {
        veg_bool = true;
      } else {
        veg_bool = false;
      }

      let tags_arr = [];
      for (let x in chipData) {
        tags_arr.push(chipData[x].label);
      }

      let addon_arr = [];
      for (let x in addonData) {
        addon_arr.push({ name: addonData[x].label, price: addonData[x].price });
      }
      console.log(addon_arr);

      let vendor_id = localStorage.getItem("token");

      let load = {
        name: data.get("dishName"),
        price: data.get("price"),
        image: data.get("image"),
        veg: veg_bool,
        rating: 0,
        tags: tags_arr,
        addons: addon_arr,
        vendor_id: vendor_id,
      };

      axios
        .post("http://localhost:4000/vendor/addDish", load)
        .then((res) => {
          if (res.status === 201) {
            alert("Dish Added");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Fill all required fields!!");
    }
  };

  return (
    <>
      {/* <ThemeProvider theme={theme}> */}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,

            display: "flex",
            flexDirection: "column",
            alignItems: "left",
          }}
        >
          <FormControl>
            <Box component="form" noValidate sx={{ mt: 6 }} onSubmit={addDish}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    autoComplete="dish-name"
                    name="dishName"
                    required
                    fullWidth
                    id="dishName"
                    label="Dish Name"
                    autoFocus
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    type="number"
                    required
                    fullWidth
                    id="price"
                    label="Price (₹)"
                    name="price"
                    autoComplete="price"
                  />
                </Grid>
                <ListItem divider />
                <Grid item xs={12} textAlign={"center"}>
                  <Typography>TAGS</Typography>
                </Grid>
                <Grid
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    listStyle: "none",
                    p: 0.5,
                    m: 0,
                    mt: 2,
                  }}
                >
                  {chipData.map((data) => {
                    let icon;
                    icon = <TagFacesIcon />;

                    return (
                      <TagItem key={data.key}>
                        <Chip
                          icon={icon}
                          label={data.label}
                          onDelete={handleDelete(data)}
                        />
                      </TagItem>
                    );
                  })}
                </Grid>

                <ListItem divider />

                <Grid item xs={12} md={10}>
                  <TextField
                    type="text"
                    required
                    fullWidth
                    id="tag"
                    label="Add Tag"
                    name="tag"
                    value={newTag}
                    onChange={handleNewTag}
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ height: 1 }}
                    onClick={addTag}
                  >
                    Add
                  </Button>
                </Grid>

                {/* Addon starts here */}

                <ListItem divider />
                <Grid item xs={12} textAlign={"center"}>
                  <Typography>Addons</Typography>
                </Grid>
                <Grid
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    listStyle: "none",
                    p: 0.5,
                    m: 0,
                    mt: 2,
                  }}
                >
                  {addonData.map((data) => {
                    let icon;
                    icon = <TagFacesIcon />;

                    return (
                      <TagItem key={data.key}>
                        <Chip
                          icon={icon}
                          label={data.label + " " + String(data.price)}
                          onDelete={handleAddonDelete(data)}
                        />
                      </TagItem>
                    );
                  })}
                </Grid>
                <ListItem divider />

                <Grid item xs={12} md={5}>
                  <TextField
                    type="text"
                    required
                    fullWidth
                    id="addonName"
                    label="Add Addon"
                    name="addonName"
                    value={newAddon}
                    onChange={handleNewAddon}
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12} md={5}>
                  <TextField
                    type="text"
                    required
                    fullWidth
                    id="AddonPrice"
                    label="Addon Price"
                    name="AddonPrice"
                    value={newAddonPrice}
                    onChange={handleNewAddonPrice}
                    autoComplete="off"
                  />
                </Grid>

                <Grid item xs={12} md={2}>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ height: 1 }}
                    onClick={addAddon}
                  >
                    Add
                  </Button>
                </Grid>

                {/* Addon ends here */}

                <Grid item sx={{ width: 1 }}>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={veg}
                    name="veg"
                    onChange={handleVeg}
                    label="Veg/Non-Veg"
                    sx={{ width: "100%" }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"Veg"} sx={{ width: 1 }}>
                      Veg
                    </MenuItem>
                    <MenuItem value={"Non-Veg"} sx={{ width: 1 }}>
                      Non-Veg
                    </MenuItem>
                  </Select>
                </Grid>
                <Grid
                  item
                  alignItems={"center"}
                  alignContent={"center"}
                  sx={{ width: 1, alignItems: "center" }}
                >
                  <label htmlFor="contained-button-file">
                    <Input
                      accept="image/*"
                      id="contained-button-file"
                      multiple
                      type="file"
                      name="image"
                    />
                    <Button variant="contained" component="span">
                      Upload
                      <PhotoCamera />
                    </Button>
                  </label>
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Add Dish
              </Button>
            </Box>
          </FormControl>
        </Box>
      </Container>
      {/* </ThemeProvider> */}
    </>
  );
}
