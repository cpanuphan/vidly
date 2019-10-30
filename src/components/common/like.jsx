import React from "react";

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

export default Like;
