import http from "./httpService";
import { apiUrl } from "../config.json";

export function getGenres() {
  return http.get(apiUrl + "/genres");
}

export async function getGenre(id) {
  const genres = await http.post(apiUrl + "/genres");
  return genres.find(m => m._id === id);
}
