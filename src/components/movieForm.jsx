import React from "react";
import Form from "./common/form";
import Joi from "@hapi/joi";
import { withStyles, Container, Typography } from "@material-ui/core";
import { getGenres } from "../services/genresServices";
import { getMovie, saveMovie } from "../services/moviesServices";

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  formControl: {
    margin: theme.spacing(2, 0, 1),
    minWidth: 120
  },

  submit: {
    margin: theme.spacing(3, 0, 2)
  }
});

class MovieForm extends Form {
  state = {
    data: {
      _id: "",
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    genres: [],
    errors: {}
  };

  async componentDidMount() {
    this.setSelectLabelWidth();

    await this.populateGenres();

    await this.populateMovies();
  }

  schema = {
    _id: Joi.string()
      .trim()
      .empty("")
      .optional(),
    title: Joi.string()
      .trim()
      .required()
      .min(2)
      .max(30)
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .integer()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Rate")
  };

  doSubmit = async () => {
    await saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

  async populateMovies() {
    try {
      const { params } = this.props.match;
      if (params._id === "new") return;
      const { data: movie } = await getMovie(params._id);
      this.setState({ data: this.maptoViewModel(movie) });
    } catch (error) {
      if (error.response && error.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  setSelectLabelWidth() {
    const lableWidth = this.selectLabel.current.offsetWidth;
    this.setState({ lableWidth });
  }

  maptoViewModel(movie) {
    const data = {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
    return data;
  }

  render() {
    const { classes, match } = this.props;
    const { genres } = this.state;
    return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            {(match.params._id === "new" && "New Movie") || "Edit Movie"}
          </Typography>
          <form
            onSubmit={this.handleSubmit}
            className={classes.form}
            noValidate
          >
            {this.renderInput("title", "Title")}
            {this.renderSelect("genreId", "Genre", genres)}
            {this.renderInput("numberInStock", "Number in Stock", "number")}
            {this.renderInput("dailyRentalRate", "Rate")}
            {this.renderHiddenInput("_id")}
            {this.renderSubmitButton("save")}
          </form>
        </div>
      </Container>
    );
  }
}

export default withStyles(styles)(MovieForm);
