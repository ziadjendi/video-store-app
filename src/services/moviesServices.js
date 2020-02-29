import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/movies";

export const getMovies = async () => {
  return await http.get(apiEndpoint);
};

export const getMovie = async id => {
  return await http.get(movieUrl(id));
};

export const saveMovie = async movie => {
  const body = { ...movie };
  delete body._id;
  if (movie._id) {
    return await http.put(movieUrl(movie._id), body);
  }
  return await http.post(apiEndpoint, body);
};

export const deleteMovie = async id => {
  return await http.delete(movieUrl(id));
};

function movieUrl(movieId) {
  return apiEndpoint + "/" + movieId;
}
