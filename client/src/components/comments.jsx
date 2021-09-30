import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { CardHeader, TextField, Avatar } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import { Link } from "react-router-dom";
import { commentPost, uncommentPost } from "../services/postService";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  cardHeader: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  smallAvatar: {
    width: 25,
    height: 25,
  },
  commentField: {
    width: "96%",
  },
  commentText: {
    backgroundColor: "white",
    padding: theme.spacing(1),
    margin: `2px ${theme.spacing(2)}px 2px 2px`,
  },
  commentDate: {
    display: "block",
    color: "gray",
    fontSize: "0.8em",
  },
  commentDelete: {
    fontSize: "1.6em",
    verticalAlign: "middle",
    cursor: "pointer",
  },
}));

const Comments = (props) => {
  const classes = useStyles();
  const [text, setText] = useState("");

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const addComment = async (event) => {
    if (event.keyCode == 13 && event.target.value) {
      event.preventDefault();
      const { data: response } = await commentPost({
        name: props.user.name,
        photo: props.user.photo,
        comment: text,
        postedBy: props.user._id,
        postId: props.post._id,
      });
      setText("");
      props.updateComments(response.comments);
    }
  };

  const deleteComment = (comment) => async (event) => {
    event.preventDefault();
    const { data: response } = await uncommentPost({
      name: props.user.name,
      photo: props.user.photo,
      comment: comment,
      postedBy: props.user._id,
      postId: props.post._id,
    });
    props.updateComments(response.comments);
  };

  const commentBody = (item) => {
    return (
      <p className={classes.commentText}>
        <Link to={"/people-profile/" + item.postedBy}>{item.name}</Link>
        <br />
        {item.comment}
        <span className={classes.commentDate}>
          {new Date(item.created).toDateString()} |
          {props.user._id === item.postedBy && (
            <Icon
              onClick={deleteComment(item)}
              className={classes.commentDelete}
            >
              {" "}
              <DeleteIcon />
            </Icon>
          )}
        </span>
      </p>
    );
  };

  return (
    <div>
      <CardHeader
        avatar={
          <Avatar
            className={classes.smallAvatar}
            src={"http://localhost:5000/uploads/" + props.user.photo}
          />
        }
        title={
          <TextField
            onKeyDown={addComment}
            multiline
            value={text}
            onChange={handleChange}
            placeholder="Write something ..."
            className={classes.commentField}
            margin="normal"
          />
        }
        className={classes.cardHeader}
      />
      {props.comments.map((item, i) => {
        return (
          <CardHeader
            avatar={
              <Avatar
                className={classes.smallAvatar}
                src={"http://localhost:5000/uploads/" + item.photo}
              />
            }
            title={commentBody(item)}
            className={classes.cardHeader}
            key={i}
          />
        );
      })}
    </div>
  );
};

export default Comments;

Comments.propTypes = {
  postId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  updateComments: PropTypes.func.isRequired,
};
