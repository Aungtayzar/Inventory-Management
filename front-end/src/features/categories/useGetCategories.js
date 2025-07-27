import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../api/apiCategories";

function useGetCategories() {
    const { data: categories } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });
    return { categories };
}

export default useGetCategories;
