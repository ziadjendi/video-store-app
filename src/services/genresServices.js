import http from "./httpService";
import { apiUrl } from "../config.json";

export const getGenres = async () => {
  return await http.get(apiUrl + "/genres");
};
