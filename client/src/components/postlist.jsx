import React from "react";
import PropTypes from "prop-types";
import Post from "./post";

const PostList = (props) => {
  return (
    <div style={{ marginTop: "24px" }}>
      {props.posts.map((item, i) => {
        return (
          <Post
            user={props.user}
            post={item}
            key={i}
            onRemove={props.removeUpdate}
          />
        );
      })}
    </div>
  );
};

export default PostList;

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
  removeUpdate: PropTypes.func.isRequired,
};
