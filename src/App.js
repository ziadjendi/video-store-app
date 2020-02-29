import React, { Component } from "react";
import { Grid, CssBaseline } from "@material-ui/core";
import Movies from "./components/movies";
import _ from "lodash";
import NavBar from "./components/NavBar";
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router
} from "react-router-dom";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import { ToastContainer, toast } from "react-toastify";
import { getGenres } from "./services/genresServices";
import { getMovies, deleteMovie, saveMovie } from "./services/moviesServices";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 3,
    selectedGenre: "All",
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" }
  };
  async componentDidMount() {
    let { data } = await getGenres();
    const genres = [{ _id: "All", name: "All" }, ...data];

    const { data: movies } = await getMovies();

    this.setState({ movies, genres });
  }

  async componentDidUpdate() {
    const { data: movies } = await getMovies();
    this.setState({ movies });
  }
  handleDelete = async movie => {
    const originalMovies = this.state.movies;
    let movies = [...originalMovies];
    movies = movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
    try {
      await deleteMovie(movie._id);
    } catch (error) {
      if (error.response && error.response.status === 404)
        toast.error("This movie has been already deleted!");
      this.setState({ movies: originalMovies });
    }
  };

  handleLike = async movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].like = !movie.like;
    movies[index].genreId = movies[index].genre._id;
    const genre = movies[index].genre;
    delete movies[index].genre;
    await saveMovie(movies[index]);
    delete movies[index].genreId;
    movies[index].genre = genre;
    this.setState({ movies });
  };

  handleSelectGenre = genre => {
    this.setState({
      selectedGenre: genre.name,
      searchQuery: "",
      currentPage: 1
    });
  };
  handleChangePage = (event, page) => {
    this.setState({ currentPage: page });
  };

  handleSort = column => {
    this.setState({ sortColumn: column });
  };
  handleSubmitMovie = movie => {
    // const movies = [...this.state.movies].filter(m => m._id !== movie._id);
    // delete movie.__v;
    // movies.push(movie);
    // this.setState({ movies });
  };
  handleSearch = query => {
    this.setState({
      searchQuery: query,
      selectedGenre: "All",
      currentPage: 1
    });
  };
  render() {
    const {
      genres,
      searchQuery,
      selectedGenre,
      currentPage,
      sortColumn
    } = this.state;
    var { moviesCount, totalPages, movies } = this.pagedMovies();
    return (
      <Router>
        <CssBaseline />
        <ToastContainer />
        <NavBar />
        <Grid container justify="center" style={{ padding: "20px 0 0 0" }}>
          <Grid item xs={10}>
            <Switch>
              <Route path="/movies/:_id" component={MovieForm} />
              <Route path="/movies">
                <Movies
                  currentPage={currentPage}
                  genres={genres}
                  selectedGenre={selectedGenre}
                  sortColumn={sortColumn}
                  moviesCount={moviesCount}
                  totalPages={totalPages}
                  movies={movies}
                  onLike={this.handleLike}
                  onDelete={this.handleDelete}
                  onChangePage={this.handleChangePage}
                  onSort={this.handleSort}
                  onSelectGenre={this.handleSelectGenre}
                  onSearch={this.handleSearch}
                  searchQuery={searchQuery}
                />
              </Route>
              <Route path="/login" component={LoginForm} />
              <Route path="/register" component={RegisterForm} />
              <Route path="/customers" component={Customers} />
              <Route path="/rentals" component={Rentals} />
              <Route path="/not-found" component={NotFound} />
              <Redirect exact from="/" to="/movies" />
              <Redirect to="/not-found" />
            </Switch>
          </Grid>
        </Grid>
      </Router>
    );
  }

  pagedMovies() {
    const {
      movies: allMoives,
      selectedGenre,
      searchQuery,
      currentPage,
      sortColumn,
      pageSize
    } = this.state;

    let filteredMovies = [...allMoives].filter(m =>
      selectedGenre !== "All" ? m.genre.name === selectedGenre : true
    );
    if (searchQuery !== "")
      filteredMovies = filteredMovies.filter(m =>
        m.title.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
      );
    let movies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );
    const moviesCount = movies.length;
    const totalPages = Math.ceil(moviesCount / pageSize);
    const startIndex = pageSize * (currentPage - 1);
    const endIndex = startIndex + pageSize;
    movies = [...movies].slice(startIndex, endIndex);
    return { moviesCount, totalPages, movies };
  }
}

export default App;
