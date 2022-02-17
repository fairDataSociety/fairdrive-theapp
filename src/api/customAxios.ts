import axios from 'axios';

export default axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_FAIROSHOST,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
