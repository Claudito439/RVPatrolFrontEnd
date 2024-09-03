import axios from './axios';


export const registerRequest = async(user) => await axios.post('/users', user);

export const loginRequest = async(user) => await axios.post('/auth/login', user);

export const profile = async ( accessToken) => await axios.post('/auth/sign-up-by-token',accessToken);

export const logout = () =>  axios.post('/logout');