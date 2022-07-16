import React from "react";
import { useState } from "react";

import { Container, Box, Typography, Grid } from "@mui/material";
import AccountBalanceWalletTwoToneIcon from "@mui/icons-material/AccountBalanceWalletTwoTone";
import axios from "axios";

export default function VendorWallet() {
  const [total, setTotal] = useState(0);

  let load = {
    vendor_id: localStorage.getItem("token"),
  };

  axios
    .post("http://localhost:4000/vendor/details", load)
    .then((res) => {
      setTotal(res.data.balance);
    })
    .catch((err) => {
      console.log(err);
    });

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <AccountBalanceWalletTwoToneIcon sx={{ fontSize: "350px" }} />

        {/* Show current amount */}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: -2,
            marginBottom: 2,
          }}
        >
          <Typography
            inline
            variant="body2"
            color="textSecondary"
            component="p"
          >
            <Grid container>
              <Grid item xs={24}>
                <Typography
                  display="inline"
                  variant="h5"
                  sx={{ fontWeight: "bold" }}
                >
                  Current Amount:
                </Typography>
                <Typography display="inline" variant="h5">
                  {total}
                </Typography>
              </Grid>
            </Grid>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
