import React from "react";
import { Typography, List, ListItem } from "@material-ui/core";

const About = (props) => {
  return (
    <div>
      <Typography variant="h5">About</Typography>

      <List>
        <ListItem>
          <Typography variant="p">
            <b>Name :</b> {props.user.name}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="p">
            <b>Date of Birth :</b>{" "}
            {new Date(props.user.dateOfBirth).toDateString()}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="p">
            <b>Lives In :</b> {props.user.livesIn}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="p">
            <b>Gender :</b> {props.user.gender}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="p">
            <b>About :</b> {props.user.about}
          </Typography>
        </ListItem>
      </List>
    </div>
  );
};

export default About;
