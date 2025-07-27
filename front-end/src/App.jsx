import { useState } from "react";
import ProductForm from "./features/products/createProduct";
import CategoryForm from "./features/categories/createCategory";
import Modal from "./ui/Modal";
import ConfirmDelete from "./ui/ConfirmDelete";
import useGetProduct from "./features/products/useGetProduct";
import useDeleteProduct from "./features/products/useDeleteProduct";
import useGetCategories from "./features/categories/useGetCategories";

function App() {
    const [showProductForm, setShowProductForm] = useState(false);
    const [showCategoryForm, setShowCategoryForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [categoryFilter, setCategoryFilter] = useState("");

    const { allProducts, productsLoading } = useGetProduct();

    const products = categoryFilter
        ? allProducts.filter((p) => p.category_id === parseInt(categoryFilter))
        : allProducts;

    const { categories } = useGetCategories();

    const { deleteMutation, isDeleting } = useDeleteProduct();

    if (productsLoading)
        return <div className="text-center text-gray-500">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                Inventory Management
            </h1>
            <div className="flex space-x-4 mb-4">
                <button
                    onClick={() => {
                        setShowProductForm((prev) => !prev);
                        setSelectedProduct(null);
                        setShowCategoryForm(false);
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Add Product
                </button>
                <button
                    onClick={() => {
                        setShowCategoryForm((prev) => !prev);
                        setShowProductForm(false);
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Add Category
                </button>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                    Filter by Category:
                </label>
                <select
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 w-full max-w-xs"
                >
                    <option value="">All</option>
                    {categories?.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            {showProductForm && (
                <ProductForm
                    product={selectedProduct}
                    categories={categories}
                    onCancel={() => setShowProductForm(false)}
                />
            )}
            {showCategoryForm && (
                <CategoryForm onCancel={() => setShowCategoryForm(false)} />
            )}
            <div>
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                    Products
                </h2>
                <ul className="space-y-2">
                    {products?.map((product) => (
                        <li
                            key={product.id}
                            className="flex justify-between items-center p-4 border-b border-gray-200"
                        >
                            <div>
                                <span className="font-medium">
                                    {product.name}
                                </span>
                                - {product.quantity} units - ${product.price}
                                <span className="text-gray-500">
                                    ({product.category?.name})
                                </span>
                            </div>
                            <div>
                                <button
                                    onClick={() => {
                                        setShowProductForm(true);
                                        setSelectedProduct(product);
                                        setShowCategoryForm(false);
                                    }}
                                    className="text-blue-500 hover:text-blue-700 mr-4"
                                >
                                    Edit
                                </button>
                                <Modal>
                                    <Modal.Open>
                                        <button className="text-red-500 hover:text-red-700">
                                            Delete
                                        </button>
                                    </Modal.Open>
                                    <Modal.Window>
                                        <ConfirmDelete
                                            resourceName="product"
                                            disabled={isDeleting}
                                            onConfirm={() =>
                                                deleteMutation(product.id)
                                            }
                                        />
                                    </Modal.Window>
                                </Modal>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;
