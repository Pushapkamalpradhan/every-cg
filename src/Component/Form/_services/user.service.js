//import config from 'config';
import { authHeader, handleResponse } from '../_helpers';

export const userService = {
    getAll,
    getById
};

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`https://dev.demo-swapithub.com/ecomm/api/login`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`https://dev.demo-swapithub.com/ecomm/api/login/${id}`, requestOptions).then(handleResponse);
}