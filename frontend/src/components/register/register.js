import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import TimePicker from "@mui/lab/TimePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

const axios = require("axios");
// import {FormControl , InputLabel , Select ,handleAge , MenuItem} from '@material-ui/core';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://researchweb.iiit.ac.in/~naval.s/html/index.html">
        canteen portal
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Register() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let load;

    let full_name = data.get("firstName") + " " + data.get("lastName");

    console.log("time",STime);

    if (data.get("for") === "buyer") {
      load = {
        for: data.get("for"),
        name: full_name,
        email: data.get("email"),
        contact: data.get("contact"),
        age: data.get("age"),
        batchName: data.get("batch"),
        password: data.get("password"),
      };
    } else {
      load = {
        for: data.get("for"),
        managerName: full_name,
        shopName: data.get("shopname"),
        email: data.get("email"),
        contact: data.get("contact"),
        password: data.get("password"),
        openTime: STime,
        closeTime: ETime,
      };
    }

    axios.post("http://localhost:4000/register", load).then((res) => {
      if (res.status === 200) {
        // alert(res.data.token);
        // localStorage.setItem("token", res.data.token);
        window.location.href = "/login";
      } else {
        alert("enter correct information");
      }
    });
  };

  // function handelFName(event) {
  //   setFName(event.target.value);
  // }

  const [ETime, setETime] = React.useState();
  const handleETime = (newValue) => {
    setETime(newValue);
  };

  const [STime, setSTime] = React.useState();
  const handleSTime = (newValue) => {
    setSTime(newValue);
  };

  const [batch, setBatch] = React.useState("");
  const handleBatch = (event) => {
    setBatch(event.target.value);
  };

  const [vendor, setVendor] = React.useState("buyer");
  const handleVendor = (event) => {
    setVendor(event.target.value);
  };

  // setVendor("vendor");

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl sx={{ width: 1 }}>
                  <InputLabel id="demo-simple-select-autowidth-label">
                    User Type
                  </InputLabel>
                  <Select
                    labelId="for-label"
                    id="for"
                    name="for"
                    value={vendor}
                    onChange={handleVendor}
                    autoWidth
                    label="vendor"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"buyer"} sx={{ width: 1 }}>
                      Student
                    </MenuItem>
                    <MenuItem value={"vendor"} sx={{ width: 1 }}>
                      Vendor
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onchange=""
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              {vendor === "buyer" ? (
                <>
                  <Grid item xs={12} sm={6}>
                    <FormControl sx={{ width: 1 }}>
                      <InputLabel id="demo-simple-select-autowidth-label">
                        Batch
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={batch}
                        name="batch"
                        onChange={handleBatch}
                        autoWidth
                        label="batch"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={"UG1"} sx={{ width: 1 }}>
                          UG1
                        </MenuItem>
                        <MenuItem value={"UG2"} sx={{ width: 1 }}>
                          UG2
                        </MenuItem>
                        <MenuItem value={"UG3"} sx={{ width: 1 }}>
                          UG3
                        </MenuItem>
                        <MenuItem value={"UG4"} sx={{ width: 1 }}>
                          UG4
                        </MenuItem>
                        <MenuItem value={"UG5"} sx={{ width: 1 }}>
                          UG5
                        </MenuItem>
                        <MenuItem value={"UG6"} sx={{ width: 1 }}>
                          UG6
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="age"
                      label="AGE"
                      name="age"
                      autoComplete="age"
                    />
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="shopname"
                      label="Shop's name"
                      name="shopname"
                      autoComplete="shopname"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <TimePicker
                        label="Start Time"
                        name="STime"
                        value={STime}
                        onChange={handleSTime}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <TimePicker
                        label="End Time"
                        name="ETime"
                        value={ETime}
                        onChange={handleETime}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Grid>
                </>
              )}

              <Grid item xs={12}>
                <TextField
                  required
                  type="number"
                  fullWidth
                  id="contact"
                  label="Phone Number"
                  name="contact"
                  autoComplete="phone"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
