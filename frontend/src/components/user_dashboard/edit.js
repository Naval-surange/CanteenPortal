import React from "react";
import {
  Grid,
  Paper,
  TextField,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  FormControl,
} from "@mui/material";
import axios from "axios";

import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";

class EditBuyer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      BuyerDetails: [],
      is_open1: false,
      is_open2: false,
      is_open3: false,
      to_be_updated: "",
      new_data: "",
      DataisLoaded: false,
    };
  }

  componentDidMount() {
    let load = { buyer_id: localStorage.getItem("token") };
    axios.post("/api/buyer/get_buyer", load).then((res) => {
      this.setState({
        BuyerDetails: res.data,
        DataisLoaded: true,
      });
    });
  }
  render() {
    let handleOpen = (inp, to_update) => {
      this.setState({ is_open1: true });
      this.setState({ details: inp });
      this.setState({ to_be_updated: to_update });
    };

    let handleClose = () => {
      this.setState({ is_open1: false });
      this.setState({ is_open2: false });
      this.setState({ is_open3: false });
      this.setState({ details: "" });
    };

    let handleChange = (e) => {
      this.setState({ new_data: e.target.value });
    };

    let handleUpdate = () => {
      let load = {
        user_id: localStorage.getItem("token"),
        target: this.state.to_be_updated,
        new_data: this.state.new_data,
      };

      console.log(load);

      axios
        .post("/api/buyer/update", load)
        .then((res, err) => {
          this.setState({ is_open: false });
          this.setState({ details: "" });
          window.location.reload();
        });
    };

    if (!this.state.DataisLoaded) {
      return (
        <div>
          <Typography sx={{ mt: 10 }}> Please wait some time.... </Typography>{" "}
        </div>
      );
    } else {
      return (
        <Grid container mt={10}>
          <Grid item xs={3} />
          <Grid item xs={6}>
            <Paper
              elevation={4}
              sx={{
                padding: "2vh",
                alignItems: "center",
                textAlign: "center",
                justifyContent: "center",
                justifyItems: "center",
              }}
            >
              <PersonIcon sx={{fontSize:"60px"}}/>
              <Dialog open={this.state.is_open1} onClose={handleClose}>
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
                    InputProps={{
                      readOnly: true,
                    }}
                    label="Name"
                    value={this.state.BuyerDetails.name}
                    variant="outlined"
                  ></TextField>
                </Grid>
                <Grid item>
                  <IconButton
                    aria-label="edit"
                    onClick={() =>
                      handleOpen("Enter new Name of Person!!", "name")
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
                    InputProps={{
                      readOnly: true,
                    }}
                    label="Email"
                    value={this.state.BuyerDetails.email}
                    variant="outlined"
                  ></TextField>
                </Grid>
                <Grid item>
                  <IconButton
                    aria-label="edit"
                    onClick={() => handleOpen("Enter new email id!!", "email")}
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
                    InputProps={{
                      readOnly: true,
                    }}
                    label="Contact"
                    value={this.state.BuyerDetails.contact}
                    variant="outlined"
                  ></TextField>
                </Grid>
                <Grid item>
                  <IconButton
                    aria-label="edit"
                    onClick={() =>
                      handleOpen("Enter new Contact number !!", "contact")
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
                    InputProps={{
                      readOnly: true,
                    }}
                    label="Batch Name"
                    value={this.state.BuyerDetails.batchName}
                    variant="outlined"
                  ></TextField>
                </Grid>
                <Grid item>
                  <IconButton
                    aria-label="edit"
                    onClick={() =>
                      handleOpen(
                        "Enter new Batch name (out of UG1-UG6 ) !!",
                        "batchName"
                      )
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
                    InputProps={{
                      readOnly: true,
                    }}
                    label="Age"
                    value={this.state.BuyerDetails.age}
                    variant="outlined"
                  ></TextField>
                </Grid>
                <Grid item>
                  <IconButton
                    aria-label="edit"
                    onClick={() => handleOpen("Enter new age !!", "age")}
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
                    InputProps={{
                      readOnly: true,
                    }}
                    label="Password"
                    type={"password"}
                    value={this.state.BuyerDetails.password}
                    variant="outlined"
                  ></TextField>
                </Grid>
                <Grid item>
                  <IconButton
                    aria-label="edit"
                    onClick={() =>
                      handleOpen("Enter new password !!", "password")
                    }
                  >
                    <EditIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={3} />
        </Grid>
      );
    }
  }
}

export default EditBuyer;
