import axios from "axios";

const CategoryApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1/categories'
});

export const getAllCategory = () => CategoryApi.get('/');