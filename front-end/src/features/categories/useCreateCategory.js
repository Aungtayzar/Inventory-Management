import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory } from "../../api/apiCategories";
import toast from "react-hot-toast";

function useCreateCategory() {
    const queryClient = useQueryClient();
    const {
        mutate: addNewCategory,
        isPending: CreatingCategory,
        isError: CategoryError,
        error,
    } = useMutation({
        mutationFn: createCategory,
        onSuccess: () => {
            toast.success("New Category created!");
            queryClient.invalidateQueries(["categories"]);
        },
        onError: (error) => toast.error(error.message),
    });

    return { addNewCategory, CreatingCategory, CategoryError, error };
}

export default useCreateCategory;
