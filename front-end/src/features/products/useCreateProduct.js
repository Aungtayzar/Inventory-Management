import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../../api/apiProducts";
import toast from "react-hot-toast";

function useCreateProduct() {
    const queryClient = useQueryClient();
    const {
        mutate: addNewProduct,
        isPending: ProductLoading,
        isError: productError,
        error,
    } = useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
            toast.success("New Product created!");
            queryClient.invalidateQueries(["products"]);
        },
        onError: (error) => toast.error(error.message),
    });

    return { addNewProduct, ProductLoading, productError, error };
}

export default useCreateProduct;
