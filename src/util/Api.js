import axios from 'axios';

export default axios.create({
  baseURL: `https://hashad.herokuapp.com/`,
  headers: {
    'Content-Type': 'application/json',
  }
});
