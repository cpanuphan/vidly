import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";
import { Link } from "react-router-dom";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: movie => <Link to={`movies/${movie._id}`}>{movie.title}</Link>
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rental" },
    {
      key: "liked",
      content: movie => (
        <Like liked={movie.liked} onLiked={() => this.props.onLiked(movie)} />
      )
    },
    {
      key: "delete",
      content: movie => (
        <button
          className="btn btn-danger"
          onClick={() => this.props.onDelete(movie)}
        >
          Delete
        </button>
      )
    }
  ];

  render() {
    const { movies, onDelete, onLiked, onSort, sortColumn } = this.props;

    return (
      <Table
        movies={movies}
        columns={this.columns}
        onDelete={onDelete}
        onLiked={onLiked}
        onSort={onSort}
        sortColumn={sortColumn}
      />
    );
  }
}

export default MoviesTable;
