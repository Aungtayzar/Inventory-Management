function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {
    return (
        <div className="w-[40rem] flex flex-col gap-3">
            <h3 className="text-xl font-semibold text-gray-900">
                Delete {resourceName}
            </h3>
            <p className="text-gray-500 mb-3">
                Are you sure you want to delete this {resourceName} permanently?
                This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3 px-3">
                <button
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={disabled}
                    onClick={onCloseModal}
                >
                    Cancel
                </button>
                <button
                    className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={disabled}
                    onClick={onConfirm}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default ConfirmDelete;
