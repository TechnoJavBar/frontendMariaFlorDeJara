import axios from 'axios';

const ProductApi = axios.create({
    //baseURL: 'https://mariaflordejara.pythonanywhere.com/api/v1/products'
     baseURL: 'http://localhost:1234/productos'
})

export const getAllProducts = () => {
    return ProductApi.get();
};

export const getLatestProducts =(limit) => {
    return ProductApi.get(`?limit=${limit}`);
}

export const getProductById = (code) => ProductApi.get(`/${code}`);