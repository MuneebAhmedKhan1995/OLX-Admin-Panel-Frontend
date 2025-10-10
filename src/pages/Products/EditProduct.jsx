// src/pages/Products/EditProduct.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct } from '../../Redux/Actions/ProductActions';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ Redux state se data lo
  const { products, loading, error } = useSelector((state) => state.product);
  // const categories = useSelector((state) => state.category?.categories || []);

  const [categories] = useState([
    "Electronics",
    "Clothing",
    "Books",
    "Home & Kitchen",
    "Sports",
    "Beauty"
  ]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    quantity: '',
    category: '',
    productType: '',
    image: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const product = products.find(p => p._id === id || p.id === id);
    if (product) {
      setFormData({
        title: product.title || product.name || '',
        description: product.description || '',
        price: product.price ? product.price.toString() : '',
        quantity: product.quantity ? product.quantity.toString() : '',
        category: product.category || '',
        productType: product.productType || 'physical',
        image: product.image || ''
      });
    } else {
      setLocalError('Product not found');
    }
  }, [id, products]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // ✅ Error clear karo jab user type kare
    if (localError) setLocalError(null);
    if (successMessage) setSuccessMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setLocalError(null);
    setSuccessMessage(null);

    try {
      // ✅ Sirf provided fields ko update karo
      const updateData = {};

      if (formData.title !== undefined && formData.title !== '') updateData.title = formData.title;
      if (formData.description !== undefined && formData.description !== '') updateData.description = formData.description;
      if (formData.price !== undefined && formData.price !== '') updateData.price = parseFloat(formData.price);
      if (formData.quantity !== undefined && formData.quantity !== '') updateData.quantity = parseInt(formData.quantity);
      if (formData.category !== undefined && formData.category !== '') updateData.category = formData.category;
      if (formData.productType !== undefined && formData.productType !== '') updateData.productType = formData.productType;
      if (formData.image !== undefined) updateData.image = formData.image;



      // ✅ Check if any fields to update
      if (Object.keys(updateData).length === 0) {
        setLocalError('No changes to update');
        setIsSubmitting(false);
        return;
      }

      // ✅ Price validation
      if (updateData.price !== undefined && (isNaN(updateData.price) || updateData.price < 0)) {
        setLocalError('Please enter a valid price');
        setIsSubmitting(false);
        return;
      }

      // ✅ Quantity validation
      if (updateData.quantity !== undefined && (isNaN(updateData.quantity) || updateData.quantity < 0)) {
        setLocalError('Please enter a valid quantity');
        setIsSubmitting(false);
        return;
      }

      // ✅ Redux action dispatch karo
      const result = await dispatch(updateProduct({ id, updateData })).unwrap();

      if (result) {
        setSuccessMessage('Product updated successfully!');
        setTimeout(() => {
          navigate('/products');
        }, 1500);
      }

    } catch (error) {
      console.error('Update error:', error);
      setLocalError(error.message || 'Failed to update product');
    } finally {
      setIsSubmitting(false);
    }
  };

  // EditProduct.js - Dispatch call change karo
// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setIsSubmitting(true);
//   setLocalError(null);
//   setSuccessMessage(null);

//   try {
//     // ✅ Sirf provided fields ko update karo
//     const updateData = {};

//     if (formData.title !== undefined && formData.title !== '') updateData.title = formData.title;
//     if (formData.description !== undefined && formData.description !== '') updateData.description = formData.description;
//     if (formData.price !== undefined && formData.price !== '') updateData.price = parseFloat(formData.price);
//     if (formData.quantity !== undefined && formData.quantity !== '') updateData.quantity = parseInt(formData.quantity);
//     if (formData.category !== undefined && formData.category !== '') updateData.category = formData.category;
//     if (formData.productType !== undefined && formData.productType !== '') updateData.productType = formData.productType;
//     if (formData.image !== undefined) updateData.image = formData.image;

//     // ✅ Validation
//     if (Object.keys(updateData).length === 0) {
//       setLocalError('No changes to update');
//       setIsSubmitting(false);
//       return;
//     }

//     // ✅ Direct id pass karo aur updateData ko separate parameter mein
//     const result = await dispatch(updateProduct({ 
//       id: id, 
//       updateData: updateData 
//     })).unwrap();

//     if (result) {
//       setSuccessMessage('Product updated successfully!');
//       setTimeout(() => {
//         navigate('/products');
//       }, 1500);
//     }

//   } catch (error) {
//     console.error('Update error:', error);
//     setLocalError(error.message || 'Failed to update product');
//   } finally {
//     setIsSubmitting(false);
//   }
// };

  // ✅ Agar product nahi mila toh error show karo
  if (localError === 'Product not found') {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you are trying to edit does not exist.</p>
          <Button
            variant="primary"
            onClick={() => navigate('/products')}
          >
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Product</h2>

        {/* ✅ Success Message */}
        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <strong>Success!</strong>
            </div>
            <p className="mt-1">{successMessage}</p>
          </div>
        )}

        {/* ✅ Error Messages */}
        {(localError || error) && !successMessage && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {localError || error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Product Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <Input
              label="Price"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />

            <Input
              label="Quantity"
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="0"
              required
            />

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">Select Category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}

              </select>
            </div>


            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Type</label>
              <select
                name="productType"
                value={formData.productType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="physical">Physical</option>
                <option value="digital">Digital</option>
                <option value="service">Service</option>
              </select>
            </div>

            <div className="md:col-span-2 mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="https://example.com/image.jpg"
              />
              {formData.image && (
                <div className="mt-2">
                  <img
                    src={formData.image}
                    alt="Product preview"
                    className="h-24 w-24 object-cover rounded border"
                  />
                </div>
              )}
            </div>

            <div className="md:col-span-2 mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/products')}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting || loading}
            >
              {isSubmitting ? 'Updating...' : 'Update Product'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;