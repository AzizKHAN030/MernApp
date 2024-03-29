import React from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";

import memories from "./images/memories.png";

import { getPosts } from "./redux/actions/posts";

import Form from "./components/Form/Form";
import Posts from "./components/Posts/Posts";

import useStyles from "./styles";

export default function App(params) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [currentId, setCurrentId] = React.useState(null);

  React.useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.AppBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">
          Memories
          <img
            className={classes.image}
            src={memories}
            alt="memories"
            height="60"
          />
        </Typography>
      </AppBar>
      <Grow in>
        <Container style={{ marginTop: "30px" }}>
          <Grid
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}
