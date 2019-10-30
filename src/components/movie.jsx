import React, { Component } from "react";
import Like from "./common/like";

class Movie extends Component {
  render() {
    const { movie, onDelete, onLiked } = this.props;

    return (
      <tr>
        <td>{movie.title}</td>
        <td>{movie.genre.name}</td>
        <td>{movie.numberInStock}</td>
        <td>{movie.dailyRentalRate}</td>
        <td className="text-center">
          <Like liked={movie.liked} onLiked={() => onLiked(movie)} />
        </td>
        <td className="text-center">
          <button className="btn btn-danger" onClick={() => onDelete(movie)}>
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

export default Movie;
