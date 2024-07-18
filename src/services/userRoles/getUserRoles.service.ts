import axios from "axios";

const apiUrl = 'http://localhost:4000/roles';

export async function getUserRoles () {
  const response = await axios.get(apiUrl);
  return response.data;
}
