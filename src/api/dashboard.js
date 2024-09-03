import axios from './axios';

export const getAmbushes = async () => await axios.get('/ambushes');

export const getCombats = async () => await axios.get('/combats');

export const getPatrols = async () => await axios.get('/patrols');

export const getRecognition = async () => await axios.get('/recognition-results');




