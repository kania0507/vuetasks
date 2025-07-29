import axios from 'axios';

const API_URL = 'https://gorest.co.in/public/v2/users';

export async function fetchUsers() {
  const res = await axios.get(API_URL);
  return res.data;
}