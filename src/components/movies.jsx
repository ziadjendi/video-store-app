import React from "react";
import { Typography, Grid, Button } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import MoviesTable from "./moviesTable";
import SideBar from "./sideBar";
import { useHistory } from "react-router-dom";
import SearchInput from "./common/search";

const Movies = ({
  movies,
  moviesCount,
  selectedGenre,
  genres,
  totalPages,
  currentPage,
  sortColumn,
  onLike,
  onDelete,
  onChangePage,
  onSort,
  onSelectGenre,
  onSearch,
  searchQuery
}) => {
  const history = useHistory();
  const newMovie = path => history.push(path);

  // if () {
  //   return
  // }

  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={2}>
          <SideBar
            selectedGenre={selectedGenre}
            genres={genres}
            onSelectGenre={onSelectGenre}
          />
        </Grid>
        <Grid item xs={8}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => newMovie("/movies/new")}
            style={{ margin: "0 0 20px" }}
          >
            New
          </Button>
          {(moviesCount === 0 && (
            <Typography paragraph>No movies in the database!!</Typography>
          )) || (
            <Typography
              paragraph
            >{`Showing ${moviesCount} movies in the database.`}</Typography>
          )}
          <SearchInput onSearch={onSearch} value={searchQuery} />
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={onLike}
            onDelete={onDelete}
            onSort={onSort}
            history={history}
          />
          {totalPages !== 1 && (
            <Pagination
              page={currentPage}
              onChange={onChangePage}
              count={totalPages}
              style={{ padding: "20px 0" }}
            />
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Movies;
