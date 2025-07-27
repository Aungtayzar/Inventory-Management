import { fetchApi } from "./useFetch";

//Product API call
export const getProducts = () => fetchApi("/products");
export const getProduct = (id) => fetchApi(`/products/${id}`);
export const createProduct = (data) => fetchApi("/products", "POST", data);
export const updateProduct = (id, data) =>
    fetchApi(`/products/${id}`, "PUT", data);
export const deleteProduct = (id) => fetchApi(`/products/${id}`, "DELETE");
