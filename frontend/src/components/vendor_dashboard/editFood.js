import React from "react";
import axios from "axios";

import {
  Grid,
  Container,
  CssBaseline,
  CardMedia,
  Paper,
  FormControl,
  TextField,
  IconButton,
  InputLabel,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Select,
  MenuItem,
  ListItem,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import EditIcon from "@mui/icons-material/Edit";

class editFood extends React.Component {
  // Constructor

  constructor(props) {
    super(props);

    this.state = {
      FoodDetails: [],
      is_open: false,
      is_open2: false,
      is_open3: false,
      is_open4: false,
      details: "Dialog box",
      DataisLoaded: false,
      to_be_updated: "",
      new_data: "",
      chipData: [],
      newTag: "",
    };
  }

  componentDidMount() {
    let load = {
      food_id: localStorage.getItem("food_id"),
    };

    axios.post("http://localhost:4000/vendor/get_dish", load).then((res) => {
      let new_chip_data = [];

      for (let x in res.data.tags) {
        new_chip_data.push({ key: x, label: res.data.tags[x] });
      }

      let food = {
        FoodDetails: res.data,
        DataisLoaded: true,
        chipData: new_chip_data,
      };
      this.setState(food);
    });
  }

  render() {
    const { DataisLoaded, FoodDetails } = this.state;

    if (!DataisLoaded) {
      return (
        <div>
          <h1> Please wait some time.... </h1>{" "}
        </div>
      );
    } else {
      let is_veg;
      if (FoodDetails.veg) {
        is_veg = "Veg";
      } else {
        is_veg = "Non Veg";
      }

      const TagItem = styled("li")(({ theme }) => ({
        margin: theme.spacing(0.5),
      }));


      const handleChipDelete = (chipToDelete) => () => {
        let new_chip_data = this.state.chipData.filter(
          (chip) => chip.key !== chipToDelete.key
        );
        this.setState({ chipData: new_chip_data });
      };

      const handleNewTag = (e) => {
        this.setState({ newTag: e.target.value.toUpperCase() });
      };

      const addTag = () => {
        if (this.state.newTag.length > 0) {
          let new_chip_data = [
            ...this.state.chipData,
            { key: this.state.chipData.length, label: this.state.newTag },
          ];
          this.setState({ chipData: new_chip_data });
        }
      };

      

      let handleChange = (e) => {
        this.setState({ new_data: e.target.value });
      };

      let handleOpen = (inp, to_update) => {
        this.setState({ is_open: true });
        this.setState({ details: inp });
        this.setState({ to_be_updated: to_update });
      };

      let handleOpen2 = (inp, to_update) => {
        this.setState({ is_open2: true });
        this.setState({ details: inp });
        this.setState({ to_be_updated: to_update });
      };

      let handleOpen3 = (inp, to_update) => {
        this.setState({ is_open3: true });
        this.setState({ details: inp });
        this.setState({ to_be_updated: to_update });
      };

      let handleUpdate = () => {
        let load = {
          food_id: localStorage.getItem("food_id"),
          target: this.state.to_be_updated,
          new_data: this.state.new_data,
        };

        if (this.state.to_be_updated === "tags") {
          let d = [];
          for (let x in this.state.chipData) {
            d.push(this.state.chipData[x].label);
          }
          load.new_data = d;
        }

        console.log(load);

        axios
          .post("http://localhost:4000/vendor/update_dish", load)
          .then((res, err) => {
            this.setState({ is_open: false });
            this.setState({ details: "" });
            window.location.reload();
          });
      };

      let handleClose = () => {
        this.setState({ is_open: false });
        this.setState({ is_open2: false });
        this.setState({ is_open3: false });
        this.setState({ details: "" });
      };

      let handleDelete = () => {
        let load = {
          food_id: localStorage.getItem("food_id"),
        };

        axios
          .post("http://localhost:4000/vendor/delete_dish", load)
          .then((res, err) => {
            alert("Dish Deleted");
            window.location.href = "/dashboard";
          });
      };

      return (
        <>
          <CssBaseline />
          <Container maxWidth="lg">
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
              spacing={1}
              width={"100%"}
              mt={10}
            >
              {/* default wala */}
              <Dialog open={this.state.is_open} onClose={handleClose}>
                <DialogTitle>Edit dialog</DialogTitle>
                <DialogContent>
                  <DialogContentText>{this.state.details}</DialogContentText>
                  <FormControl>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="New Detail"
                      fullWidth
                      variant="standard"
                      value={this.state.new_data}
                      onChange={handleChange}
                    />
                  </FormControl>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={handleUpdate}>Update</Button>
                </DialogActions>
              </Dialog>

              {/* veg/non veg */}
              <Dialog open={this.state.is_open2} onClose={handleClose}>
                <DialogTitle>Edit dialog</DialogTitle>
                <DialogContent>
                  <DialogContentText>{this.state.details}</DialogContentText>
                  <FormControl sx={{ width: 1 }}>
                    <InputLabel id="demo-simple-select-label">
                      Veg/Non-Veg
                    </InputLabel>
                    <Select
                      width={"100%"}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={this.state.new_data}
                      label="Age"
                      onChange={handleChange}
                    >
                      <MenuItem value={true}>Veg</MenuItem>
                      <MenuItem value={false}>Non-Veg</MenuItem>
                    </Select>
                  </FormControl>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={handleUpdate}>Update</Button>
                </DialogActions>
              </Dialog>

              {/* tags wala */}
              <Dialog open={this.state.is_open3} onClose={handleClose}>
                <DialogTitle>Edit dialog</DialogTitle>
                <DialogContent
                  sx={{
                    listStyle: "none",
                  }}
                >
                  <DialogContentText>{this.state.details}</DialogContentText>
                  <Grid>
                    {this.state.chipData.map((data) => {
                      let icon;
                      icon = <TagFacesIcon />;

                      return (
                        <TagItem key={data.key}>
                          <Chip
                            icon={icon}
                            label={data.label}
                            onDelete={handleChipDelete(data)}
                          />
                        </TagItem>
                      );
                    })}
                  </Grid>
                  <ListItem divider />

                  <Grid xs={12}>
                    <Grid item xs={12} md={10}>
                      <TextField
                        type="text"
                        required
                        fullWidth
                        id="tag"
                        label="Add Tag"
                        name="tag"
                        value={this.state.newTag}
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
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={handleUpdate}>Update</Button>
                </DialogActions>
              </Dialog>

              <Grid item xs={12} md={8}>
                <Paper sx={{ maxWidth: 0.9 }}>
                  <Grid>
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      justifyContent={"center"}
                      wrap="nowrap"
                      m={2}
                    >
                      <Grid item>
                        <TextField
                          id="outlined-read-only-input"
                          label="Dish Name"
                          defaultValue={FoodDetails.name}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </Grid>
                      <Grid item>
                        <IconButton
                          aria-label="edit"
                          onClick={() =>
                            handleOpen("Enter new Name of dish!!", "name")
                          }
                        >
                          <EditIcon />
                        </IconButton>
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      justifyContent={"center"}
                      wrap="nowrap"
                      m={2}
                    >
                      <Grid item>
                        <TextField
                          id="outlined-read-only-input"
                          label="Price"
                          defaultValue={FoodDetails.price}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </Grid>
                      <Grid item>
                        <IconButton
                          aria-label="edit"
                          onClick={() =>
                            handleOpen("Enter new Price of dish!!", "price")
                          }
                        >
                          <EditIcon />
                        </IconButton>
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      justifyContent={"center"}
                      wrap="nowrap"
                      m={2}
                    >
                      <Grid item>
                        <TextField
                          id="outlined-read-only-input"
                          label="veg/non-veg"
                          defaultValue={is_veg}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </Grid>
                      <Grid item>
                        <IconButton
                          aria-label="edit"
                          onClick={() =>
                            handleOpen2("Enter new veg/non-veg!!", "veg")
                          }
                        >
                          <EditIcon />
                        </IconButton>
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      justifyContent={"center"}
                      wrap="nowrap"
                      m={2}
                    >
                      <Grid item>
                        <TextField
                          id="outlined-read-only-input"
                          label="Tags"
                          defaultValue={FoodDetails.tags}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </Grid>
                      <Grid item>
                        <IconButton
                          aria-label="edit"
                          onClick={() =>
                            handleOpen3("Edit or add tags!!", "tags")
                          }
                        >
                          <EditIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      justifyContent={"center"}
                      wrap="nowrap"
                      m={2}
                    >
                      <Grid item>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={handleDelete}
                        >
                          Delete?
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              <Grid item direction={"row"} justify="flex-start" xs={12} md={4}>
                <CardMedia
                  component="img"
                  sx={{ maxWidth: "300px", maxHeight: "300px" }}
                  image="https://source.unsplash.com/random"
                  alt={FoodDetails.name}
                />
              </Grid>
            </Grid>
          </Container>
        </>
      );
    }
  }
}

export default editFood;
