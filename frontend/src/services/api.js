import axios from 'axios';
import { API_URL } from '../constants';

export const getUsers = ()=> axios.get(`${API_URL}/users`);
export const createUser = (user) => axios.post(`${API_URL}/users`,user);
export const updateUser = (id,user) => axios.put(`${API_URL}/users/${id}`,user);
export const deleteUser = (id) => axios.delete(`${API_URL}/users/${id}`);