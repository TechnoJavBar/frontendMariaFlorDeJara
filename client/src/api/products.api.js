import { api } from "./axios.js";

export const getAllProducts = (page = 1, limit = 8) => {
  return api.get("/productos", {
    params: {
      page: page,
      limit: limit,
    },
  });
};

export const searchProductsByName = (nombre) => api.get(`/productos/search/${nombre}`);

export const getProductById = (id) => api.get(`/productos/${id}`);

export const createProduct = (productoData) => {
  return api.post("/productos", productoData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const updateProduct = (id, productoData) => {
  return api.put(`/productos/${id}`, productoData);
};

export const deleteProduct = (id) => {
  return api.delete(`/productos/${id}`);
};
