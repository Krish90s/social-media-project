import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import {
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Avatar,
  IconButton,
  Typography,
  Divider,
} from "@material-ui/core";
import { getMe } from "./../services/currentUserService";
import ProfileTabs from "../components/profiletabs";
import { listByUser } from "../services/postService";

const styles = (theme) => ({
  root: theme.mixins.gutters({
    margin: "auto",
    padding: theme.spacing(3),
  }),
  title: {
    margin: `${theme.spacing(2)}px ${theme.spacing(1)}px 0`,
    color: theme.palette.protectedTitle,
    fontSize: "1.5em",
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 10,
  },
});

class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      posts: [],
    };
  }

  getUser = async () => {
    const { data: user } = await getMe();
    this.setState({ user });
  };

  newsFeedByUser = async () => {
    const { data: posts } = await listByUser(this.state.user._id);
    this.setState({ posts });
  };

  async componentDidMount() {
    await this.getUser();
    await this.newsFeedByUser();
  }

  removePost = (post) => {
    const updatedPosts = [...this.state.posts];
    const index = updatedPosts.indexOf(post);
    updatedPosts.splice(index, 1);
    this.setState({ posts: updatedPosts });
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Typography variant="h6" className={classes.title}>
          Profile
        </Typography>
        <List dense>
          <ListItem>
            <ListItemAvatar>
              <Avatar
                src={"http://localhost:5000/uploads/" + this.state.user.photo}
                className={classes.bigAvatar}
              />
            </ListItemAvatar>
            <ListItemText
              primary={this.state.user.name}
              secondary={this.state.user.email}
            />{" "}
          </ListItem>
        </List>
        <Divider />
        <ProfileTabs
          user={this.state.user}
          posts={this.state.posts}
          removePostUpdate={this.removePost}
        />
      </React.Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(UserProfile);
