import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../Redux/Actions/ProductActions";
import { useNavigate } from "react-router-dom";

// ✅ Components import karo
import Input from "../../components/common/Input"; 
import Button from "../../components/common/Button";

function AddProduct() {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  
  // ✅ Safe useSelector
  const productState = useSelector((state) => state.product || {});
  const { error = null, loading = false } = productState;
  
  const navigate = useNavigate();
  
  // ✅ States add karo
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  
  const [categories] = useState([
    "Electronics",
    "Clothing", 
    "Books",
    "Home & Kitchen",
    "Sports",
    "Beauty"
  ]);

  // ✅ Success message dikhane ke baad automatically navigate karne ke liye
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        navigate('/products');
      }, 2000); // ✅ 2 seconds bad navigate hoga

      return () => clearTimeout(timer); // ✅ Cleanup
    }
  }, [showSuccess, navigate]);

  // ✅ Image preview ke liye
  useEffect(() => {
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setImagePreview(objectUrl);

      // ✅ Cleanup
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [selectedFile]);

  const updateData = (e) => {
    const { name, value } = e.target;
    
    // ✅ Quantity ko number mein convert karo
    if (name === 'quantity' || name === 'price') {
      setData({
        ...data,
        [name]: value === '' ? '' : Number(value)
      });
    } else {
      setData({
        ...data,
        [name]: value,
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // ✅ File validation
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!validTypes.includes(file.type)) {
        alert('Please select a valid image file (JPEG, PNG, GIF, WebP)');
        return;
      }

      if (file.size > maxSize) {
        alert('File size should be less than 5MB');
        return;
      }

      setSelectedFile(file);
      // ✅ Agar file upload ho rahi hai toh imageURL clear karo
      setData(prev => ({ ...prev, imageURL: "" }));
    }
  };

  const removeImage = () => {
    setSelectedFile(null);
    setImagePreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Product data...", data);
    setIsSubmitting(true);
    setShowSuccess(false);
    
    // ✅ Backend API ke according data structure banayein
    const productData = {
      title: data.name,
      description: data.description,
      price: parseFloat(data.price) || 0,
      quantity: parseInt(data.quantity) || 0, // ✅ Quantity add karo
      category: data.category,
      productType: data.productType || "physical",
      image: data.image
    };
    
    // ✅ Quantity validation
    if (productData.quantity < 0) {
      alert('Quantity cannot be negative');
      setIsSubmitting(false);
      return;
    }
    
    // ✅ Price validation
    if (productData.price < 0) {
      alert('Price cannot be negative');
      setIsSubmitting(false);
      return;
    }
    
    // ✅ Image field ko theek karo - imageURL ko image mein convert karo
    if (data.image) {
      productData.image = data.image; // ✅ Yahan "image" use karo, "imageURL" nahi
    } else if (selectedFile) {
      // ✅ File upload ke liye FormData use karo
      const formData = new FormData();
      formData.append('image', selectedFile);
      
      // ✅ Product data ko FormData mein add karo
      Object.keys(productData).forEach(key => {
        formData.append(key, productData[key]);
      });
      
      console.log("FormData with image file:", formData);
      
      // ✅ FormData ko use karenge actual implementation mein
      try {
        const result = await dispatch(createProduct(formData)).unwrap();
        // ... success handling
        return; // ✅ Important: yahan return karo taki do baar dispatch na ho
      } catch (error) {
        console.error("Error adding product:", error);
        setIsSubmitting(false);
        return;
      }
    }
    
    console.log("Sending to backend:", productData);
    
    try {
      // ✅ Normal data ke liye (without file upload)
      const result = await dispatch(createProduct(productData)).unwrap();
      
      if (result && result.status === 1) {
        setSuccessMessage(result.message || "Product added successfully!");
        setShowSuccess(true);
        setData({});
        setSelectedFile(null);
        setImagePreview("");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h2>
        
        {/* ✅ Success Message Display */}
        {showSuccess && (
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
        
        {/* ✅ Error Display */}
        {error && !showSuccess && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error.message || "Error adding product"}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Product Title"
              name="name"
              value={data.name || ""}
              onChange={updateData}
              required
            />
            
            <Input
              label="Price"
              type="number"
              name="price"
              value={data.price || ""}
              onChange={updateData}
              min="0"
              step="0.01"
              required
            />
            
            {/* ✅ QUANTITY FIELD ADD KIYA HAI */}
            <Input
              label="Quantity"
              type="number"
              name="quantity"
              value={data.quantity || ""}
              onChange={updateData}
              min="0"
              step="1"
              required
            />
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Type</label>
              <select
                name="productType"
                value={data.productType || ""}
                onChange={updateData}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">Select Type</option>
                <option value="physical">Physical</option>
                <option value="digital">Digital</option>
                <option value="service">Service</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                name="category"
                value={data.category || ""}
                onChange={updateData}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">Select Category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* ✅ Image URL Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL (Optional)
              </label>
              <input
                type="url"
                name="image"
                value={data.image || ""}
                onChange={(e) => {
                  updateData(e);
                  // ✅ Agar URL add ho raha hai toh file clear karo
                  if (e.target.value) {
                    setSelectedFile(null);
                    setImagePreview("");
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="https://example.com/image.jpg"
              />
              <p className="text-xs text-gray-500 mt-1">
                Provide image URL OR upload image below
              </p>
            </div>

            {/* ✅ Image Upload Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Image (Optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                JPEG, PNG, GIF, WebP (Max 5MB)
              </p>
            </div>

            {/* ✅ Image Preview */}
            {(imagePreview || data.image) && (
              <div className="md:col-span-2 mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image Preview
                </label>
                <div className="flex items-center space-x-4">
                  <img 
                    src={imagePreview || data.image} 
                    alt="Preview" 
                    className="h-24 w-24 object-cover rounded border"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded-md text-sm hover:bg-red-200"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
            
            <div className="md:col-span-2 mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={data.description || ""}
                onChange={updateData}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
                placeholder="Enter product description..."
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/products')}
              disabled={isSubmitting || showSuccess}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting || loading || showSuccess}
            >
              {isSubmitting || loading ? 'Adding Product...' : 'Add Product'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;