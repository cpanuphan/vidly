import http from "./httpService";
import { apiUrl } from "../config.json";

const baseUrl = apiUrl + "/users";

export function register(user) {
  return http.post(baseUrl, {
    email: user.username,
    password: user.password,
    name: user.name
  });
}
