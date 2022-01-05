import React from "react";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import moment from "moment";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import { deletePost, likePost } from "../../../redux/actions/posts";

export default function Post({ post, setCurrentId }) {
  const dispatch = useDispatch();

  const classes = useStyles();

  const onPostDelete = (id) => {
    dispatch(deletePost(id));
  };
  const onPostLike = (id, likeCount) => {
    dispatch(likePost(id, { likeCount: likeCount }));
  };

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="h6">{moment(post.createdAt).fromNow()}</Typography>
      </div>
      <div className={classes.overlay2}>
        <Button
          style={{ color: "white" }}
          size="small"
          onClick={() => {
            setCurrentId(post._id);
          }}
        >
          <MoreHorizIcon fontSize="medium" />
        </Button>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags[0].split(" ").map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <CardContent>
        <Typography variant="h5" className={classes.title} gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="h5" className={classes.message} gutterBottom>
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            onPostLike(post._id, post.likeCount);
          }}
        >
          <ThumbUpAltIcon fontSize="small" />
          Like {post.likeCount}
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            onPostDelete(post._id);
          }}
        >
          <DeleteIcon fontSize="small" />
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
