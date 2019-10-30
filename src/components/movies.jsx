import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Movie from "./movie";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";

class Movies extends Component {
  state = {
    movies: getMovies(),
    currentPage: 1,
    pageSize: 4,
    genres: getGenres(),
    selectedGenre: ""
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

  handleSelectedGenre = genre => {
    this.setState({ selectedGenre: genre });
  };

  render() {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      genres,
      selectedGenre
    } = this.state;

    if (allMovies.length === 0)
      return (
        <p className="font-weight-bold mt-3">There are no movie to show.</p>
      );

    const moviesByGenre = allMovies.filter(
      m => m.genre._id === selectedGenre._id || !selectedGenre
    );
    const movies = paginate(moviesByGenre, currentPage, pageSize);
    const { length: count } = moviesByGenre;

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-3 pt-5">
            <ListGroup
              listItem={genres}
              selectedItem={selectedGenre}
              onSelectedItem={this.handleSelectedGenre}
            />
          </div>
          <div className="col">
            <p className="mt-3">
              Showing {movies.length} movies in the database.
            </p>
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Genre</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Rate</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {movies.map(movie => (
                  <Movie
                    key={movie._id}
                    movie={movie}
                    onDelete={this.handleDelete}
                    onLiked={this.handleLike}
                  />
                ))}
              </tbody>
            </table>
            <Pagination
              itemCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
