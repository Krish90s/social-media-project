import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Avatar,
  Typography,
  GridList,
  GridListTile,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Paper,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import ViewIcon from "@material-ui/icons/Visibility";
import { follow } from "../services/userService";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    background: theme.palette.background.paper,
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: "auto",
  },
  gridList: {
    width: 500,
    height: 220,
  },
  tileText: {
    textAlign: "center",
    marginTop: 10,
  },
  avatar: {
    marginRight: theme.spacing(1),
  },
  follow: {
    right: theme.spacing(2),
  },
  paper: theme.mixins.gutters({
    padding: theme.spacing(1),
  }),
  viewButton: {
    marginLeft: "2px",
  },
}));

const FollowGrid = (props) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    open: false,
    followMessage: "",
  });

  return (
    <div>
      <Typography variant="h5" type="title" className={classes.tileText}>
        {props.title}
      </Typography>
      <List>
        {props.people.map((person, i) => {
          return (
            <span key={i}>
              <Paper className={classes.paper} elevation={2}>
                <ListItem>
                  <ListItemAvatar className={classes.avatar}>
                    <Avatar
                      src={`http://localhost:5000/uploads/${person.photo}`}
                    />
                  </ListItemAvatar>
                  <ListItemText primary={person.name} />
                  <ListItemSecondaryAction className={classes.follow}>
                    <Button
                      variant="contained"
                      color="primary"
                      component={Link}
                      to={`/people-profile/${person.userId}`}
                      className={classes.follow}
                    >
                      View Profile <ViewIcon className={classes.viewButton} />
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              </Paper>
            </span>
          );
        })}
      </List>
    </div>
  );
};

export default FollowGrid;
