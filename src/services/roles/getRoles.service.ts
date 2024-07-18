import axios from "axios";

const apiUrl = 'http://localhost:4000/roles';

export async function getRoles () {
  const response = await axios.get(apiUrl);
  return response.data;
}
