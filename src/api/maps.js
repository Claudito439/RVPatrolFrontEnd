import axios from './axios';

export const getMaps = async () => await axios.get('/maps');

export const getMap = async (id) => await axios.get('/maps/'+id);