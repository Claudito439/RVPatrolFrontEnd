import axios from './axios';

const createParamObject = (aprobacion, reprobacion) => {
  const params = {};
  if (aprobacion !== undefined) params.aprobacion = aprobacion;
  if (reprobacion !== undefined) params.reprobacion = reprobacion;
  return params;
};

export const getAmbushes = async (userId, aprobacion, reprobacion) => {
  const params = createParamObject(aprobacion, reprobacion);
  return userId === 'all' 
    ? await axios.get('/ambushes', { params })
    : await axios.get(`/ambushes/user/${userId}`, { params });
};

export const getCombats = async (userId, aprobacion, reprobacion) => {
  const params = createParamObject(aprobacion, reprobacion);
  return userId === 'all'
    ? await axios.get('/combats', { params })
    : await axios.get(`/combats/user/${userId}`, { params });
};

export const getPatrols = async (userId, aprobacion, reprobacion) => {
  const params = createParamObject(aprobacion, reprobacion);
  return userId === 'all'
    ? await axios.get('/patrols', { params })
    : await axios.get(`/patrols/users/${userId}`, { params });
};

export const getRecognition = async (userId, aprobacion, reprobacion) => {
  const params = createParamObject(aprobacion, reprobacion);
  return userId === 'all'
    ? await axios.get('/recognition-results', { params })
    : await axios.get(`/recognition-results/user/${userId}`, { params });
};