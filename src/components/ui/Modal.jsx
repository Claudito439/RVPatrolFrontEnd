 export default function Modal ({ isOpen, onClose, children, type }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className={`bg-white p-6 rounded-lg ${type === 'error' ? 'border-red-500' : 'border-green-500'} border-4`}>
                {children}
                <button
                    onClick={onClose}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Close
                </button>
            </div>
        </div>
    );
};