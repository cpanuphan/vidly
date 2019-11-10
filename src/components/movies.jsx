import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { getMovies, deleteMovie } from "../services/movieService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/genreService";
import MoviesTable from "./moviesTable";
import Searchbox from "./common/serchbox";
import logger from "../services/logService";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" }
  };

  handleDelete = async movie => {
    const originalMovies = this.state.movies;

    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies: movies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This movie has already been deleted.");
        logger.log(ex);
      }
      this.setState({ movies: originalMovies });
    }
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

  async componentDidMount() {
    const { data: resultGenres } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...resultGenres];
    const { data: resultMovies } = await getMovies();
    this.setState({
      movies: resultMovies,
      genres: genres
    });
  }

  handleSelectedGenre = selectedItem => {
    this.setState({
      selectedGenre: selectedItem,
      searchQuery: "",
      currentPage: 1
    });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleSearch = query => {
    this.setState({
      searchQuery: query,
      selectedGenre: "",
      currentPage: 1
    });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      searchQuery,
      selectedGenre,
      sortColumn
    } = this.state;

    let filteredMovies = allMovies;
    if (selectedGenre && selectedGenre._id) {
      filteredMovies = allMovies.filter(m => m.genre._id === selectedGenre._id);
    } else if (searchQuery) {
      filteredMovies = allMovies.filter(m =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    const movies = paginate(filteredMovies, currentPage, pageSize);
    const sorted = _.orderBy(movies, [sortColumn.path], [sortColumn.order]);

    return { totalCount: filteredMovies.length, data: sorted };
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

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            listItem={genres}
            selectedItem={selectedGenre ? selectedGenre : ""}
            onItemSelect={this.handleSelectedGenre}
          />
        </div>
        <div className="col">
          {this.props.user && (
            <Link className="btn btn-primary" to="/movies/new">
              New Movie
            </Link>
          )}
          <p className="mt-3">Showing {totalCount} movies in the database.</p>
          <Searchbox onChange={this.handleSearch} />
          <MoviesTable
            sortColumn={sortColumn}
            movies={movies}
            onLiked={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemCount={totalCount}
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
