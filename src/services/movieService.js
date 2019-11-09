import http from "./httpService";
import { apiUrl } from "../config.json";

const baseUrl = apiUrl + "/movies";

function movieUrl(id) {
  return `baseUrl/${id}`;
}

export function getMovies() {
  return http.get(baseUrl);
}

export async function getMovie(movieId) {
  return await http.get(movieUrl(movieId));
}

export async function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(movieUrl(movie._id), body);
  } else {
    return await http.post(baseUrl, movie);
  }
}

export function deleteMovie(movieId) {
  return http.delete(movieUrl(movieId));
}
