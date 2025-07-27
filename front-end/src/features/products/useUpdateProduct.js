import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from "../../api/apiProducts";
import toast from "react-hot-toast";

function useUpdateProduct() {
    const queryClient = useQueryClient();
    const {
        mutate: updateExistingProduct,
        isPending: isUpdating,
        isError: isUpdateError,
        error: updateError,
    } = useMutation({
        mutationFn: ({ productId, data }) => updateProduct(productId, data),
        onSuccess: () => {
            toast.success("Product updated!");
            queryClient.invalidateQueries(["products"]);
        },
        onError: (error) => toast.error(error.message),
    });

    return { updateExistingProduct, isUpdating, isUpdateError, updateError };
}

export default useUpdateProduct;
