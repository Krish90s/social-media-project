import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Avatar,
  Button,
  IconButton,
  Typography,
  Snackbar,
} from "@material-ui/core";

import { Link } from "react-router-dom";
import ViewIcon from "@material-ui/icons/Visibility";
import { findPeople, follow } from "./../services/userService";

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    padding: theme.spacing(1),
    margin: 0,
  }),
  title: {
    margin: `${theme.spacing(3)}px ${theme.spacing(1)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
    fontSize: "1.5em",
  },
  avatar: {
    marginRight: theme.spacing(1),
  },
  follow: {
    right: theme.spacing(2),
  },
  snack: {
    color: theme.palette.protectedTitle,
  },
  viewButton: {
    verticalAlign: "middle",
  },
}));

export default function FindPeople(props) {
  const classes = useStyles();
  const [values, setValues] = useState({
    users: [],
    open: false,
    followMessage: "",
  });

  const clickFollow = async (user, index) => {
    const payload = { userId: props.user._id, followId: user._id };

    await follow(payload);
    let toFollow = props.people;
    toFollow.splice(index, 1);
    setValues({
      ...values,
      open: true,
      followMessage: `Following ${user.name}!`,
    });
    props.updateUsers(toFollow);
  };

  const handleRequestClose = (event, reason) => {
    setValues({ ...values, open: false });
  };
  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          Who to follow
        </Typography>
        <List>
          {props.people.map((item, i) => {
            return (
              <span key={i}>
                <ListItem>
                  <ListItemAvatar className={classes.avatar}>
                    <Avatar
                      src={"http://localhost:5000/uploads/" + item.photo}
                    />
                  </ListItemAvatar>
                  <ListItemText primary={item.name} />
                  <ListItemSecondaryAction className={classes.follow}>
                    <Link to={"/people-profile/" + item._id}>
                      <IconButton
                        variant="contained"
                        color="secondary"
                        className={classes.viewButton}
                      >
                        <ViewIcon />
                      </IconButton>
                    </Link>
                    <Button
                      aria-label="Follow"
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        clickFollow(item, i);
                      }}
                    >
                      Follow
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              </span>
            );
          })}
        </List>
      </Paper>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={values.open}
        onClose={handleRequestClose}
        autoHideDuration={6000}
        message={<span className={classes.snack}>{values.followMessage}</span>}
      />
    </div>
  );
}

FindPeople.propTypes = {
  updateUsers: PropTypes.func.isRequired,
};
