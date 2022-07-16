import {
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Box,
  CssBaseline,
  Divider,
  Rating,
  Link,
  styled,
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

let redirect_to_dishes = (id) => {
  localStorage.setItem("vendor_id", id);
  window.location.href = "/userdashboard/dishes";
};

export default function CanteenTile({ canteen }) {
  return (
    <Grid onClick={() => {redirect_to_dishes(canteen._id)}} item xs={12} md={6}>
      <Link underline="none">
        <CssBaseline />
        <Card>
          <CardMedia
            component="img"
            height="170"
            image="https://source.unsplash.com/random"
            title="Image title"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              align="center"
              sx={{ fontWeight: "bold", "text-transform": "uppercase" }}
            >
              {canteen.shopName}
            </Typography>
            <Divider />
            <Typography
              inline
              variant="body2"
              color="textSecondary"
              component="p"
            >
              <Grid container>
                <Grid item xs={6}>
                  <Typography display="inline" sx={{ fontWeight: "bold" }}>
                    Owner:
                  </Typography>
                  <Typography display="inline">
                    {canteen.managerName}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography display="inline" sx={{ fontWeight: "bold" }}>
                    Contact:
                  </Typography>
                  <Typography display="inline">{canteen.contact}</Typography>
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
          <CardActions>
            <Box
              display="flex"
              sx={{
                width: "100%",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <StyledRating
                name="customized-color"
                defaultValue={3.5}
                getLabelText={(value) =>
                  `${value} Heart${value !== 1 ? "s" : ""}`
                }
                precision={0.5}
                icon={<FavoriteIcon fontSize="inherit" />}
                emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
              />
            </Box>
          </CardActions>
        </Card>
      </Link>
    </Grid>
  );
}
