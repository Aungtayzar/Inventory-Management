import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../api/apiProducts";

function useGetProduct() {
    const { data: allProducts = [], isPending: productsLoading } = useQuery({
        queryKey: ["products"],
        queryFn: getProducts,
    });

    return { allProducts, productsLoading };
}

export default useGetProduct;
