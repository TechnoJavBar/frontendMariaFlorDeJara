import axios from 'axios';

const ProductApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1/products'
})

export const getAllProducts = () => ProductApi.get('/');
export const getProductById = (id) => ProductApi.get(`/${id}`);