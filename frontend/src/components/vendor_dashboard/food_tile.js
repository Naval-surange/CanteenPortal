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
  Chip,
  IconButton,
  ListItem,
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import EditIcon from "@mui/icons-material/Edit";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

const TagItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

let redirect_edit = (id) => {
  localStorage.removeItem("food_id");
  localStorage.setItem("food_id", id);
  window.location.href = `/vendordashboard/editFood`;
};

export default function FoodTile({ FoodItem }) {
  return (
    <Grid item xs={12} md={6}>
      <Link href="#" underline="none">
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
              {FoodItem.name}
            </Typography>
            <Divider />
            <Typography
              inline
              variant="body2"
              color="textSecondary"
              component="p"
            >
              <Grid container>
                <Grid item xs={12}>
                  <Typography display="inline" sx={{ fontWeight: "bold" }}>
                    Price:
                  </Typography>
                  <Typography display="inline">{FoodItem.price}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography textAlign={"center"} fontWeight={"Bold"}>
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
                    {FoodItem.tags.map((tag, i) => {
                      return (
                        <TagItem key={i}>
                          <Chip label={tag} />
                        </TagItem>
                      );
                    })}
                  </Typography>
                </Grid>

                <ListItem divider />

                <Grid item xs={12}>
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
                    {FoodItem.addons.map((addon, i) => {
                      return (
                        <TagItem key={i}>
                          <Chip label={addon.name + " ( " + addon.price +" ₹)"} />
                        </TagItem>
                      );
                    })}
                  </Typography>
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
                defaultValue={FoodItem.rating}
                getLabelText={(value) =>
                  `${value} Heart${value !== 1 ? "s" : ""}`
                }
                precision={0.5}
                icon={<FavoriteIcon fontSize="inherit" />}
                emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
              />
            </Box>
            <Box sx={{ mr: 4 }}>
              <IconButton
                size="large"
                onClick={() => redirect_edit(FoodItem._id)}
                aria-label="wallet"
                color="inherit"
              >
                <EditIcon />
              </IconButton>
            </Box>
          </CardActions>
        </Card>
      </Link>
    </Grid>
  );
}
