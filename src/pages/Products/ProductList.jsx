import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Loading from '../../components/common/Loading';
import { getAllProducts, deleteProduct } from '../../Redux/Actions/ProductActions';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);
  
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch products using Redux
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // ✅ Success message auto hide
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const productId = selectedProduct._id || selectedProduct.id;
      console.log('Deleting product:', selectedProduct);
      
      await dispatch(deleteProduct(productId));
      
      // ✅ Success message show karo
      setSuccessMessage(`"${selectedProduct.title}" successfully deleted!`);
      setShowSuccess(true);
      
      // ✅ Modal band karo
      setDeleteModalOpen(false);
      setSelectedProduct(null);
      
      // ✅ Refresh the product list after deletion
      setTimeout(() => {
        dispatch(getAllProducts());
      }, 500);
      
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // ✅ Modal band karne ka function
  const closeModal = () => {
    setDeleteModalOpen(false);
    setSelectedProduct(null);
  };

  if (loading) return <Loading />;

  // Add error state display
  if (error) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error: </strong> {error.message || 'Failed to load products'}
        </div>
      </div>
    );
  }

  // Safe array check before mapping
  const productsArray = Array.isArray(products) ? products : [];

  // Better placeholder image URL
  const placeholderImage = 'https://placehold.co/300x300/ffffff/cccccc?text=No+Image';

  return (
    <div className="container mx-auto px-4 py-6">
      {/* ✅ SUCCESS MESSAGE - Green color ka beautiful message */}
      {showSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">
                Success!
              </h3>
              <div className="mt-1 text-sm text-green-700">
                <p>{successMessage}</p>
              </div>
            </div>
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                <button
                  onClick={() => setShowSuccess(false)}
                  className="inline-flex bg-green-50 rounded-md p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600"
                >
                  <span className="sr-only">Dismiss</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Products Management</h2>
        <Link to="/products/add">
          <Button variant="primary">Add Product</Button>
        </Link>
      </div>

      {/* Safe rendering with fallback */}
      {productsArray.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No products found.</p>
        </div>
      ) : (
       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {productsArray.map((product, index) => (
    <div 
      key={product._id || product.id || `product-${index}`} 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
              <div className="h-48 bg-gray-200 overflow-hidden">
                <img
                  src={product.images?.[0] || product.image || placeholderImage}
                 
                  alt={product.title || 'Product Image'}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = placeholderImage;
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {product.title || 'No Title'}
                </h3>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                  {product.description || 'No description available'}
                </p>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-indigo-600">
                    {product.category || 'Uncategorized'}
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    ${product.price || '0'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    (product.quantity > 0) 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.quantity > 0 
                      ? `In Stock (${product.quantity})` 
                      : 'Out of Stock'
                    }
                  </span>
                  <div className="flex space-x-2">
                    <Link to={`/products/edit/${product._id || product.id}`}>
                      <Button variant="secondary" className="text-xs py-1 px-2">
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="danger"
                      className="text-xs py-1 px-2"
                      onClick={() => handleDeleteClick(product)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ✅ LIGHT BACKGROUND MODAL - Black ki jagah light overlay */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-white bg-opacity-80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Confirm Delete</h3>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 transition-colors p-1 hover:bg-gray-100 rounded-full"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Modal Body */}
              <div className="mb-6">
                <p className="text-gray-700 text-lg">
                  Are you sure you want to delete 
                  <span className="font-semibold text-gray-900"> "{selectedProduct?.title}"</span>?
                </p>
                <p className="text-sm text-gray-500 mt-3">
                  This action cannot be undone and the product will be permanently removed.
                </p>
              </div>
              
              {/* Modal Footer */}
              <div className="flex justify-end space-x-3">
                <Button 
                  variant="secondary" 
                  onClick={closeModal}
                  className="px-6 py-2.5"
                >
                  Cancel
                </Button>
                <Button 
                  variant="danger" 
                  onClick={confirmDelete}
                  className="px-6 py-2.5"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;