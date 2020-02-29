import React, { Component } from "react";
import { Button, withStyles } from "@material-ui/core";
import Like from "./common/like";
import TTable from "./common/ttabel";
import PropTypes from "prop-types";

const styles = theme => ({
  linkbtn: {
    "&,&:hover": {
      textDecoration: "underline",
      textTransform: "capitalize",
      color: theme.palette.primary.main
    }
  }
});

class MoviesTable extends Component {
  handlViewMovieForm = movie => this.props.history.push("/movies/" + movie._id);
  columns = [
    {
      lable: "Title",
      path: "title",
      content: movie => (
        <Button
          className={this.props.classes.linkbtn}
          variant="text"
          onClick={() => this.handlViewMovieForm(movie)}
        >
          {movie.title}
        </Button>
      )
    },
    { path: "genre.name", lable: "Genre" },
    { path: "numberInStock", lable: "Stock" },
    { path: "dailyRentalRate", lable: "Rate" },

    {
      key: "like",
      content: item => <Like item={item} onLike={this.props.onLike} />
    },
    {
      key: "delete",
      content: item => (
        <Button
          onClick={() => this.props.onDelete(item)}
          variant="contained"
          color="secondary"
        >
          Delete
        </Button>
      )
    }
  ];

  render() {
    const { movies, sortColumn, onSort } = this.props;
    return (
      <TTable
        data={movies}
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

MoviesTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MoviesTable);
