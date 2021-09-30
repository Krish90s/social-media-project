import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import NewsFeed from "../components/newsfeed";
import FindPeople from "../components/findpeople";
import { getMe } from "./../services/currentUserService";
import { listNewsFeed } from "../services/postService";
import { withStyles } from "@material-ui/styles";
import { findPeople } from "./../services/userService";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    margin: 30,
  },
});

class Home extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      posts: [],
      users: [],
    };
  }

  getUser = async () => {
    const { data: user } = await getMe();
    this.setState({ user });
    console.log(this.state.user);
  };

  getNewsFeed = async () => {
    const { data: posts } = await listNewsFeed(this.state.user._id);
    this.setState({ posts });
    console.log(this.state.posts);
  };

  getPeople = async () => {
    const { data: users } = await findPeople(this.state.user._id);
    this.setState({ users });
    console.log(this.state.users);
  };

  async componentDidMount() {
    await this.getUser();
    await this.getNewsFeed();
    await this.getPeople();
  }

  addPost = (post) => {
    const updatedPosts = [...this.state.posts];
    updatedPosts.unshift(post);
    this.setState({ posts: updatedPosts });
  };
  removePost = (post) => {
    const updatedPosts = [...this.state.posts];
    const index = updatedPosts.indexOf(post);
    updatedPosts.splice(index, 1);
    this.setState({ posts: updatedPosts });
  };

  updateUsers = (users) => {
    this.setState({ users });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={8}>
          <Grid item xs={12} sm={7}>
            <NewsFeed
              user={this.state.user}
              posts={this.state.posts}
              addUpdate={this.addPost}
              removeUpdate={this.removePost}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <FindPeople
              user={this.state.user}
              people={this.state.users}
              updateUsers={this.updateUsers}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Home);
