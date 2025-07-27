import { useForm } from "react-hook-form";
import useCreateProduct from "./useCreateProduct";
import useUpdateProduct from "./useUpdateProduct";

function ProductForm({ product, categories, onCancel }) {
    const { id: productId } = product;
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            name: product?.name || "",
            description: product?.description || "",
            quantity: product?.quantity || 0,
            price: product?.price || 0,
            category_id: product?.category_id || "",
        },
    });

    // Create mutation
    const { addNewProduct, ProductLoading, productError, error } =
        useCreateProduct();

    // Update mutation
    const { updateExistingProduct, isUpdating, isUpdateError, updateError } =
        useUpdateProduct();

    const onSubmit = (data) => {
        if (product) {
            updateExistingProduct(
                { productId, data },
                {
                    onSuccess: () => {
                        reset();
                        onCancel();
                    },
                }
            );
        } else {
            addNewProduct(
                { ...data },
                {
                    onSuccess: () => {
                        reset();
                        onCancel?.();
                    },
                }
            );
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white p-6 rounded-lg shadow-md mb-6"
        >
            {productError && (
                <div className="text-red-500 mb-4">Error: {error.message}</div>
            )}

            {isUpdateError && (
                <div className="text-red-500 mb-4">
                    Error: {updateError.message}
                </div>
            )}
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                    Product Name
                </label>
                <input
                    {...register("name", {
                        required: "Product name is required",
                    })}
                    placeholder="Product Name"
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
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                    Description
                </label>
                <textarea
                    {...register("description")}
                    placeholder="Description"
                    className="border border-gray-300 rounded-md p-2 w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                    Quantity
                </label>
                <input
                    type="number"
                    {...register("quantity", {
                        required: "Quantity is required",
                        min: {
                            value: 0,
                            message: "Quantity must be at least 0",
                        },
                    })}
                    placeholder="Quantity"
                    className={`border ${
                        errors.quantity ? "border-red-500" : "border-gray-300"
                    } rounded-md p-2 w-full`}
                />
                {errors.quantity && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.quantity.message}
                    </p>
                )}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                    Price
                </label>
                <input
                    type="number"
                    step="0.01"
                    {...register("price", {
                        required: "Price is required",
                        min: { value: 0, message: "Price must be at least 0" },
                    })}
                    placeholder="Price"
                    className={`border ${
                        errors.price ? "border-red-500" : "border-gray-300"
                    } rounded-md p-2 w-full`}
                />
                {errors.price && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.price.message}
                    </p>
                )}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                    Category
                </label>
                <select
                    {...register("category_id", {
                        required: "Category is required",
                    })}
                    className={`border ${
                        errors.category_id
                            ? "border-red-500"
                            : "border-gray-300"
                    } rounded-md p-2 w-full`}
                >
                    <option value="">Select Category</option>
                    {categories?.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                {errors.category_id && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.category_id.message}
                    </p>
                )}
            </div>
            <div className="flex space-x-4">
                <button
                    type="submit"
                    disabled={ProductLoading || isUpdating}
                    className={`bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 ${
                        ProductLoading || isUpdating
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                    }`}
                >
                    {ProductLoading || isUpdating
                        ? "Saving..."
                        : product
                        ? "Update Product"
                        : "Add Product"}
                </button>
                <button
                    onClick={() => onCancel()}
                    className="bg-slate-400 text-white px-4 py-2 rounded-md hover:bg-slate-500"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}

export default ProductForm;
