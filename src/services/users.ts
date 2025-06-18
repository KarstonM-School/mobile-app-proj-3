import User from "../types/user";
import axios from "axios";

const api = axios.create({
  baseURL: "https://my-json-server.typicode.com/KarstonM-School/mobile-app-proj-3",
});

// Get user json from api which is getting data from our db.json
export function getUsers() {
  return api.get<User[]>("/users/").then(({ data }) => data);
}
