import axios from 'axios';

const ProductApi = axios.create({
    baseURL: 'https://mariaflordejara.pythonanywhere.com/api/v1/products'
})

export const getAllProducts = (query = "") => {
    const url = query ? `/?${query}` : "/";
    return ProductApi.get(url);
};
export const getProductById = (id) => ProductApi.get(`/${id}`);