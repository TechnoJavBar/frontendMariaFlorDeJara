import axios from 'axios';

const ProductApi = axios.create({
    baseURL: 'https://mariaflordejara.pythonanywhere.com/api/v1/products'
    // baseURL: 'http://localhost:8000/api/v1/products'
})

export const getAllProducts = () => {
    return ProductApi.get();
};
export const getProductById = (id) => ProductApi.get(`/${id}`);