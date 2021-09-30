import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Avatar,
  Divider,
} from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import CommentIcon from "@material-ui/icons/Comment";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { removePost, like, unlike } from "../services/postService";
import Comments from "./comments";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    marginBottom: theme.spacing(3),
    backgroundColor: "rgba(0, 0, 0, 0.06)",
  },
  cardContent: {
    backgroundColor: "white",
    padding: `${theme.spacing(2)}px 0px`,
  },
  cardHeader: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  text: {
    margin: theme.spacing(2),
  },
  photo: {
    textAlign: "center",
    backgroundColor: "#f2f5f4",
    padding: theme.spacing(1),
  },
  media: {
    height: 200,
  },
  button: {
    margin: theme.spacing(1),
  },
  link: {
    textDecoration: "none",
    color: "#000",
  },
}));

export default function Post(props) {
  const classes = useStyles();
  const checkLike = (likes) => {
    let match = likes.indexOf(props.user._id) !== -1;
    return match;
  };
  const [values, setValues] = useState({
    like: checkLike(props.post.likes),
    likes: props.post.likes.length,
    comments: props.post.comments,
  });

  const clickLike = async () => {
    const body = {
      userId: props.user._id,
      postId: props.post._id,
    };
    let callApi = values.like ? unlike : like;
    const { data: response } = await callApi(body);
    setValues({ ...values, like: !values.like, likes: response.likes.length });
  };

  const updateComments = (comments) => {
    setValues({ ...values, comments: comments });
  };

  const deletePost = async () => {
    await removePost(props.post._id);
    props.onRemove(props.post);
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar
            src={"http://localhost:5000/uploads/" + props.post.userPhoto}
          />
        }
        action={
          props.post.postedBy === props.user._id && (
            <IconButton onClick={deletePost}>
              <DeleteIcon />
            </IconButton>
          )
        }
        title={
          <Link
            to={
              props.user._id === props.post.postedBy
                ? "/user-profile"
                : `/people-profile/${props.post.postedBy}`
            }
            className={classes.link}
          >
            {props.post.userName}
          </Link>
        }
        subheader={new Date(props.post.created).toDateString()}
        className={classes.cardHeader}
      />
      <CardContent className={classes.cardContent}>
        <Typography component="p" className={classes.text}>
          {props.post.text}
        </Typography>
        {props.post.photo && (
          <div className={classes.photo}>
            <img
              className={classes.media}
              src={"http://localhost:5000/uploads/" + props.post.photo}
            />
          </div>
        )}
      </CardContent>
      <CardActions>
        {values.like ? (
          <IconButton
            onClick={clickLike}
            className={classes.button}
            aria-label="Like"
            color="secondary"
          >
            <FavoriteIcon />
          </IconButton>
        ) : (
          <IconButton
            onClick={clickLike}
            className={classes.button}
            aria-label="Unlike"
            color="secondary"
          >
            <FavoriteBorderIcon />
          </IconButton>
        )}{" "}
        <span>{values.likes}</span>
        <IconButton
          className={classes.button}
          aria-label="Comment"
          color="secondary"
        >
          <CommentIcon />
        </IconButton>{" "}
        <span>{!values.comments ? null : values.comments.length}</span>
      </CardActions>
      <Divider />
      <Comments
        post={props.post}
        user={props.user}
        comments={values.comments}
        updateComments={updateComments}
      />
    </Card>
  );
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
};
