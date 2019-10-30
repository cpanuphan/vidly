import React from "react";
import PropTypes from "prop-types";

const Like = ({ liked, onLiked }) => {
  let classes = "fa fa-heart";
  if (!liked) classes += "-o";

  return (
    <i
      style={{ cursor: "pointer" }}
      className={classes}
      aria-hidden="true"
      onClick={onLiked}
    />
  );
};

Like.propTypes = {
  liked: PropTypes.bool.isRequired,
  onLiked: PropTypes.func.isRequired
};

export default Like;
