import React from "react";
import { useState } from "react";

import {
  Container,
  Box,
  TextField,
  FormControl,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import AccountBalanceWalletTwoToneIcon from "@mui/icons-material/AccountBalanceWalletTwoTone";
import axios from "axios";

export default function Wallet() {
  const [total, setTotal] = useState(100);
  const [amount, setAmount] = useState();

  const onChangeAmount = (event) => {
    setAmount(event.target.value);
  };

  const onChangeTotal = (amount) => {
    axios
      .post("http://localhost:4000/wallet/add", {
        amount: amount,
        buyer_id: localStorage.getItem("token"),
      })
      
    setTotal(total + +amount);
  };

  let load = {
    buyer_id: localStorage.getItem("token"),
  };

  axios
    .post("http://localhost:4000/wallet", load)
    .then((res) => {
      setTotal(res.data["balance"]);
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
            <Grid container >
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

        <Box autoComplete="off">
          <FormControl>
            <TextField
              id="outlined-basic"
              name="amount"
              label="Amount"
              variant="outlined"
              size="small"
              onChange={onChangeAmount}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
                onChangeTotal(amount);
              }}
            >
              Add money
            </Button>
          </FormControl>
        </Box>
      </Box>
    </Container>
  );
}
