import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../../api/apiProducts";
import toast from "react-hot-toast";

function useDeleteProduct() {
    const queryClient = useQueryClient();
    const { mutate: deleteMutation, isPending: isDeleting } = useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            toast.success("Product Delete Successfully");
            queryClient.invalidateQueries(["products"]);
        },
        onError: (error) => toast.error(error.message),
    });

    return { deleteMutation, isDeleting };
}

export default useDeleteProduct;
