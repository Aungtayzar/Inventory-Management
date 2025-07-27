import { fetchApi } from "./useFetch";

export const getCategories = () => fetchApi("/categories");
export const createCategory = (data) => fetchApi("/categories", "POST", data);
