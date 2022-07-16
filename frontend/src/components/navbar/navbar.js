import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import Link from "@mui/material/Link";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

import { Button } from "@mui/material";

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const redirectToOrders = () => {
    window.location.href = "/vendordashboard/orders";
  };

  const handleWalletOpen = () => {
    window.location.href = "/userdashboard/wallet";
  };

  const handleWalletOpenVendor = () => {
    window.location.href = "/vendordashboard/wallet";
  };

  const handelEditRedirectVendor = () => {
    window.location.href = "/vendordashboard/edit";
  };
  
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const handleAdd = () => {
    window.location.href = "/vendordashboard/addFood";
  };

  const handleLogin = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleOrderRedirect = () => {
    window.location.href = "/userdashboard/orders";
  };

  const handleEditRedirect = () => {
    window.location.href = "/userdashboard/edit";
  };

  const handleFavRedirect = () => {
    window.location.href = "/userdashboard/favs";
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {localStorage.getItem("token") === null ? (
        <MenuItem onClick={handleLogin}>Login</MenuItem>
      ) : (
        <>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
          <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleWalletOpen}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <AccountBalanceWalletRoundedIcon />
        </IconButton>
        <p>Wallet</p>
      </MenuItem>

      <MenuItem onClick={handleEditRedirect}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  if (localStorage.getItem("userType") === "vendor") {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>

            <Link href="\dashboard" color="white" underline="none">
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  display: { xs: "none", sm: "block" },
                  fontWeight: "bold",
                }}
              >
                CANTEEN PORTAL
              </Typography>
            </Link>

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {localStorage.getItem("token") != null ? (
                <>
                  <MenuItem>
                    <IconButton
                      size="large"
                      aria-label="wallet"
                      color="inherit"
                      onClick={handleWalletOpenVendor}
                    >
                      <AccountBalanceWalletRoundedIcon />
                    </IconButton>
                  </MenuItem>
                </>
              ) : (
                <></>
              )}

              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handelEditRedirectVendor}
                color="inherit"
                sx={{ marginRight: 1 }}
              >
                <AccountCircle />
              </IconButton>
              <Box sx={{ margin: 1 }}>
                {localStorage.getItem("token") === null ? (
                  <Button variant="contained" onClick={handleLogin}>
                    Login
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      sx={{ mr: 2 }}
                      onClick={redirectToOrders}
                    >
                      <FormatListBulletedIcon sx={{ mr: 2 }} />
                      {"  "}orders
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleAdd}
                      sx={{ marginRight: 2 }}
                    >
                      <FastfoodIcon sx={{ mr: 1 }} />
                      Add Food!!
                    </Button>

                    <Button variant="contained" onClick={handleLogout}>
                      Logout
                    </Button>
                  </>
                )}
              </Box>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>
    );
  } else {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>

            <Link href="\dashboard" color="white" underline="none">
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  display: { xs: "none", sm: "block" },
                  fontWeight: "bold",
                }}
              >
                CANTEEN PORTAL
              </Typography>
            </Link>

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {localStorage.getItem("token") != null ? (
                <>
                  <MenuItem>
                    <IconButton
                      size="large"
                      aria-label="wallet"
                      color="inherit"
                      onClick={handleWalletOpen}
                    >
                      <AccountBalanceWalletRoundedIcon />
                    </IconButton>
                  </MenuItem>
                  <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleEditRedirect}
                    color="inherit"
                    sx={{ marginRight: 1 }}
                  >
                    <AccountCircle />
                  </IconButton>

                  <MenuItem>
                    <Button variant="contained" onClick={handleOrderRedirect}>
                      My Orders
                    </Button>
                  </MenuItem>

                  <MenuItem>
                    <Button variant="contained" onClick={handleFavRedirect}>
                      Favorite{" "}
                    </Button>
                  </MenuItem>
                </>
              ) : (
                <></>
              )}

              <Box sx={{ margin: 1 }}>
                {localStorage.getItem("token") === null ? (
                  <MenuItem>
                    <Button variant="contained" onClick={handleLogin}>
                      Login
                    </Button>
                  </MenuItem>
                ) : (
                  <MenuItem>
                    <Button variant="contained" onClick={handleLogout}>
                      Logout
                    </Button>
                  </MenuItem>
                )}
              </Box>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>
    );
  }
}
