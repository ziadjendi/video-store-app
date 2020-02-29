import React from "react";
import { ButtonGroup, Button } from "@material-ui/core";
const SideBar = ({ genres, selectedGenre, onSelectGenre }) => {
  return (
    <ButtonGroup
      orientation="vertical"
      variant="contained"
      aria-label="Genres category"
    >
      {genres.map(g => (
        <Button
          onClick={() => onSelectGenre(g)}
          key={g._id}
          color={selectedGenre === g.name && "primary"}
        >
          {g.name}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default SideBar;
