import http from "./httpService";

const baseUrl = "/users";

export function register(user) {
  return http.post(baseUrl, {
    email: user.username,
    password: user.password,
    name: user.name
  });
}
