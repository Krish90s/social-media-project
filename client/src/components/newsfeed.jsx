import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Card, Typography, Divider } from "@material-ui/core";
import NewPost from "./newpost";
import PostList from "./postlist";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "auto",
    paddingTop: 0,
    paddingBottom: theme.spacing(3),
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(
      2
    )}px`,
    color: theme.palette.openTitle,
    fontSize: "1.5em",
  },
  media: {
    minHeight: 330,
  },
}));

const NewsFeed = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Typography type="title" className={classes.title}>
        Newsfeed
      </Typography>
      <Divider />
      <NewPost user={props.user} addUpdate={props.addUpdate} />
      <Divider />
      <PostList
        user={props.user}
        posts={props.posts}
        removeUpdate={props.removeUpdate}
      />
    </Card>
  );
};

export default NewsFeed;
