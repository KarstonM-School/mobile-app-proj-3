import User from "../types/user";
import axios from "axios";

const api = axios.create({
  // run 'npx json-server --watch db.json --port 3333 --host your_ip_address_here' to start the server
  baseURL: "https://my-json-server.typicode.com/KarstonM-School/mobile-app-proj-3",
});

export function getUsers() {
  return api.get<User[]>("/users/").then(({ data }) => data);
}
