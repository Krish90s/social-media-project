import React, { useState } from "react";
import { AppBar, Typography, Tabs, Tab } from "@material-ui/core";
import FollowGrid from "./followgrid";
import PostList from "./postlist";
import PropTypes from "prop-types";
import About from "./about";

const ProfileTabs = (props) => {
  const [tab, setTab] = useState(0);

  const handleTabChange = (event, value) => {
    setTab(value);
  };
  return (
    <div>
      <AppBar position="static" color="default">
        <Tabs
          value={tab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="About" />
          <Tab label="Posts" />
          <Tab label="Following" />
          <Tab label="Followers" />
        </Tabs>
      </AppBar>
      {tab === 0 && (
        <TabContainer>
          <About user={props.user} />
        </TabContainer>
      )}
      {tab === 1 && (
        <TabContainer>
          <PostList
            posts={props.posts}
            removePostUpdate={props.removePostUpdate}
            user={props.user}
          />
        </TabContainer>
      )}
      {tab === 2 && (
        <TabContainer>
          <FollowGrid people={props.user.following} title="Following" />
        </TabContainer>
      )}
      {tab === 3 && (
        <TabContainer>
          <FollowGrid
            people={props.user.followers}
            currentUser={props.currentUser}
            title="Followers"
          />
        </TabContainer>
      )}
    </div>
  );
};

export default ProfileTabs;

const TabContainer = (props) => {
  return (
    <Typography component="div" style={{ padding: 8 * 2 }}>
      {props.children}
    </Typography>
  );
};

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
