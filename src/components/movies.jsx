import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "title", order: "asc" }
  };

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies: movies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies: movies });
  };

  handlePageChange = pageNumber => {
    this.setState({ currentPage: pageNumber });
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({
      movies: getMovies(),
      genres: genres
    });
  }

  handleSelectedGenre = selectedItem => {
    this.setState({
      selectedGenre: selectedItem,
      currentPage: 1
    });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  render() {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      genres,
      selectedGenre,
      sortColumn
    } = this.state;

    if (allMovies.length === 0)
      return (
        <p className="font-weight-bold mt-3">There are no movie to show.</p>
      );

    const moviesByGenre =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;
    const { length: count } = moviesByGenre;
    const movies = paginate(moviesByGenre, currentPage, pageSize);
    const sorted = _.orderBy(movies, [sortColumn.path], [sortColumn.order]);

    return (
      <div className="row">
        <div className="col-3 pt-5">
          <ListGroup
            listItem={genres}
            selectedItem={selectedGenre ? selectedGenre : ""}
            onItemSelect={this.handleSelectedGenre}
          />
        </div>
        <div className="col">
          <p className="mt-3">
            Showing {moviesByGenre.length} movies in the database.
          </p>
          <MoviesTable
            sortColumn={sortColumn}
            movies={sorted}
            onLiked={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
