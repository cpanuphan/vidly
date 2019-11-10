import http from "./httpService";

export function getGenres() {
  return http.get("/genres");
}

export async function getGenre(id) {
  const genres = await http.post("/genres");
  return genres.find(m => m._id === id);
}
