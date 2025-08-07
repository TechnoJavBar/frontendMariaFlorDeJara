import axios from "axios";

const CategoryApi = axios.create({
    baseURL: 'https://mariaflordejara.pythonanywhere.com/api/v1/categories'
});

export const getAllCategory = () => CategoryApi.get('/');