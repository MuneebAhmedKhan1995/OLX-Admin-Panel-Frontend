import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory, deleteCategory } from '../../Redux/Actions/CategoryAction';
import Button from '../../components/common/Button';
import Loading from '../../components/common/Loading';

const CategoryList = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(state => state.category);
  
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    dispatch(getAllCategory());
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

  const handleDeleteClick = (category) => {
    console.log('Delete clicked for category:', category);
    setSelectedCategory(category);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      setDeleteLoading(true);
      
      // ✅ _id یا id دونوں میں سے کوئی بھی استعمال کریں
      const categoryId = selectedCategory._id || selectedCategory.id;
      console.log('Confirm delete with ID:', categoryId);
      
      const result = await dispatch(deleteCategory(categoryId));
      console.log('Delete action result:', result);
      
      if (result.meta.requestStatus === 'fulfilled') {
        console.log('✅ Delete successful, payload:', result.payload);
        
        // ✅ Success message show karo
        setSuccessMessage(`"${selectedCategory.name}" successfully deleted!`);
        setShowSuccess(true);
        
        // ✅ Modal band karo
        setDeleteModalOpen(false);
        setSelectedCategory(null);
        
        // ✅ Refresh the category list after deletion
        setTimeout(() => {
          dispatch(getAllCategory());
        }, 500);
      } else {
        console.log('❌ Delete failed:', result);
        alert('Delete failed. Please try again.');
      }
    } catch (error) {
      console.error('❌ Delete action error:', error);
      alert('Error deleting category.');
    } finally {
      setDeleteLoading(false);
    }
  };

  // ✅ Modal band karne ka function
  const closeModal = () => {
    if (!deleteLoading) {
      setDeleteModalOpen(false);
      setSelectedCategory(null);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="container mx-auto px-4 py-6">
      {/* ✅ SUCCESS MESSAGE - ProductList کی طرح */}
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
        <h2 className="text-2xl font-bold text-gray-800">Categories Management</h2>
        <Link to="/categories/add">
          <Button variant="primary">Add Category</Button>
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Error: {error}
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories && categories.length > 0 ? (
                categories.map((category) => (
                  <tr 
                    key={category._id} 
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{category.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link to={`/categories/edit/${category._id}`}>
                          <Button variant="secondary" className="text-xs">
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant="danger"
                          className="text-xs"
                          onClick={() => handleDeleteClick(category)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="px-6 py-4 text-center text-gray-500">
                    No categories found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ✅ ProductList کی طرح Modal استعمال کریں */}
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
                  disabled={deleteLoading}
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
                  <span className="font-semibold text-gray-900"> "{selectedCategory?.name}"</span>?
                </p>
                <p className="text-sm text-gray-500 mt-3">
                  This will also remove all products in this category. This action cannot be undone.
                </p>
              </div>
              
              {/* Modal Footer */}
              <div className="flex justify-end space-x-3">
                <Button 
                  variant="secondary" 
                  onClick={closeModal}
                  className="px-6 py-2.5"
                  disabled={deleteLoading}
                >
                  Cancel
                </Button>
                <Button 
                  variant="danger" 
                  onClick={confirmDelete}
                  className="px-6 py-2.5"
                  disabled={deleteLoading}
                >
                  {deleteLoading ? 'Deleting...' : 'Delete'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryList;