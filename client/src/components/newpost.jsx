import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  TextField,
  Typography,
  Avatar,
} from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { createPost } from "./../services/postService";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#efefef",
    padding: `${theme.spacing(3)}px 0px 1px`,
  },
  card: {
    maxWidth: 600,
    margin: "auto",
    marginBottom: theme.spacing(3),
    backgroundColor: "rgba(65, 150, 136, 0.09)",
    boxShadow: "none",
  },
  cardContent: {
    backgroundColor: "white",
    paddingTop: 0,
    paddingBottom: 0,
  },
  cardHeader: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  photoButton: {
    height: 30,
    marginBottom: 5,
  },
  input: {
    display: "none",
  },
  textField: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: "90%",
  },
  submit: {
    margin: theme.spacing(2),
  },
  filename: {
    verticalAlign: "super",
  },
}));

const NewPost = (props) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    text: "",
    photo: "",
    error: "",
    user: {},
  });
  const clickPost = async () => {
    let postData = new FormData();
    postData.append("text", values.text);
    postData.append("photo", values.photo);
    postData.append("userId", props.user._id);
    postData.append("userName", props.user.name);
    postData.append("userPhoto", props.user.photo);

    try {
      const { data: response } = await createPost(postData, props.user._id);
      setValues({ ...values, text: "", photo: "" });
      props.addUpdate(response);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        setValues({ ...values, error: ex.response.data });
      }
    }
  };
  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };

  const photoUrl = "http://localhost:5000/uploads/" + props.user.photo;
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardHeader
          avatar={<Avatar src={photoUrl} />}
          title={props.user.name}
          className={classes.cardHeader}
        />
        <CardContent className={classes.cardContent}>
          <TextField
            placeholder="Share your thoughts ..."
            multiline
            rows="3"
            value={values.text}
            onChange={handleChange("text")}
            className={classes.textField}
            margin="normal"
          />
          <input
            accept="image/*"
            onChange={handleChange("photo")}
            className={classes.input}
            id="icon-button-file"
            type="file"
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="secondary"
              className={classes.photoButton}
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          </label>{" "}
          <span className={classes.filename}>
            {values.photo ? values.photo.name : ""}
          </span>
          {values.error && (
            <Typography component="p" color="error">
              <Icon color="error" className={classes.error}>
                error
              </Icon>
              {values.error}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            disabled={values.text === ""}
            onClick={clickPost}
            className={classes.submit}
          >
            POST
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default NewPost;

NewPost.propTypes = {
  addUpdate: PropTypes.func.isRequired,
};
