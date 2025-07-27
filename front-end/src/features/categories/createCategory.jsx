import { useForm } from "react-hook-form";
import useCreateCategory from "./useCreateCategory";

function CategoryForm({ onCancel }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            name: "",
        },
    });

    const { addNewCategory, CreatingCategory, CategoryError, error } =
        useCreateCategory();

    const onSubmit = (data) => {
        addNewCategory(
            { ...data },
            {
                onSuccess: () => {
                    reset();
                    onCancel?.();
                },
            }
        );
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white p-6 rounded-lg shadow-md mb-6"
        >
            {CategoryError && (
                <div className="text-red-500 mb-4">Error: {error.message}</div>
            )}
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                    Category Name
                </label>
                <input
                    {...register("name", {
                        required: "Category name is required",
                    })}
                    placeholder="Category Name"
                    className={`border ${
                        errors.name ? "border-red-500" : "border-gray-300"
                    } rounded-md p-2 w-full`}
                />
                {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.name.message}
                    </p>
                )}
            </div>
            <div className="flex space-x-4">
                <button
                    type="submit"
                    disabled={CreatingCategory}
                    className={`bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 ${
                        CreatingCategory ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                    {CreatingCategory ? "Saving..." : "Add Category"}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}

export default CategoryForm;
