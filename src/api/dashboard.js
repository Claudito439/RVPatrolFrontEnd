import axios from './axios';

export const getAmbushes = async (userId) => userId === 'all'
    ? await axios.get('/ambushes')
    : await axios.get(`/ambushes/user/${userId}`);

export const getCombats = async (userId) => userId === 'all'
    ? await axios.get('/combats')
    : await axios.get(`/combats/user/${userId}`);

export const getPatrols = async (userId) => userId === 'all'
    ? await axios.get('/patrols')
    : await axios.get(`/patrols/users/${userId}`);

export const getRecognition = async (userId) => userId === 'all'
    ? await axios.get('/recognition-results')
    : await axios.get(`/recognition-results/user/${userId}`);



//holas