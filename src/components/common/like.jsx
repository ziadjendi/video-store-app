import React from "react";
import { IconButton } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const Like = ({ item, onLike }) => {
  return (
    <IconButton
      onClick={() => onLike(item)}
      aria-label="Like button"
      color="default"
    >
      {item.like ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );
};

export default Like;
