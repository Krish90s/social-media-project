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
import { getUserById } from "../services/userService";
import ProfileTabs from "../components/profiletabs";
import { listByUser } from "../services/postService";
import { getMe } from "../services/currentUserService";
import FollowProfileButton from "./../components/followprofilebutton";

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

class PeopleProfile extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {},
      user: {},
      posts: [],
      following: false,
    };
  }

  getCurrentUser = async () => {
    const { data: currentUser } = await getMe();
    this.setState({ currentUser });
  };

  getUser = async () => {
    const { data: user } = await getUserById(this.props.match.params.id);
    this.setState({ user });
    let following = this.checkFollow(user);
    this.setState({ following: following });
    this.newsFeedByUser(user._id);
  };

  checkFollow = (user) => {
    const match = user.followers.some((follower) => {
      return follower.userId === this.state.currentUser._id;
    });
    return match;
  };

  newsFeedByUser = async (userId) => {
    const { data: posts } = await listByUser(userId);
    this.setState({ posts });
  };

  async componentDidMount() {
    await this.getCurrentUser();
    await this.getUser();

    // await this.newsFeedByUser();
  }

  removePost = (post) => {
    const updatedPosts = [...this.state.posts];
    const index = updatedPosts.indexOf(post);
    updatedPosts.splice(index, 1);
    this.setState({ posts: updatedPosts });
  };

  clickFollowButton = async (callApi) => {
    const { data: response } = await callApi(
      this.state.currentUser._id,
      this.state.user._id
    );
    console.log(response);
    this.setState({ user: response });
    this.setState({ following: !this.state.following });
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
            <FollowProfileButton
              following={this.state.following}
              onButtonClick={this.clickFollowButton}
            />
          </ListItem>
        </List>
        <Divider />
        <ProfileTabs
          user={this.state.user}
          posts={this.state.posts}
          removePostUpdate={this.removePost}
          currentUser={this.state.currentUser}
        />
      </React.Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PeopleProfile);
