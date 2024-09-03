import axios from './axios';

export const getUsers = async () => await axios.get('/users');

export const addUser = async (user) => await axios.post ('/users',user);