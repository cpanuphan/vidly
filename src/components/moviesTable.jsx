import React, { Component } from "react";
import { Link } from "react-router-dom";
import auth from "../services/authService";

import Like from "./common/like";
import Table from "./common/table";

class MoviesTable extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    if (user) this.setState({ user });
  }

  columns = [
    {
      path: "title",
      label: "Title",
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rental" },
    {
      key: "liked",
      content: movie => (
        <Like liked={movie.liked} onLiked={() => this.props.onLiked(movie)} />
      )
    }
  ];

  deleteColumn = {
    key: "delete",
    content: movie => (
      <button
        className="btn btn-danger"
        onClick={() => this.props.onDelete(movie)}
      >
        Delete
      </button>
    )
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) {
      this.columns.push(this.deleteColumn);
    }
  }

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
