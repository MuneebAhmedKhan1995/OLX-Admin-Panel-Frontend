import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../Redux/Actions/ProductActions";
import { useNavigate } from "react-router-dom";
import Input from "../../components/common/Input"; 
import Button from "../../components/common/Button";

function AddProduct() {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  
  const productState = useSelector((state) => state.product || {});
  const { error = null, loading = false } = productState;
  
  const navigate = useNavigate();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [imageFiles, setImageFiles] = useState([]); // ✅ Fixed: array instead of object
  const [imagePreviews, setImagePreviews] = useState([]);
  
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
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess, navigate]);

  // ✅ Image preview ke liye - MULTIPLE files support
  useEffect(() => {
    if (imageFiles.length > 0) {
      const previewUrls = imageFiles.map(file => URL.createObjectURL(file));
      setImagePreviews(previewUrls);

      // ✅ Cleanup
      return () => {
        previewUrls.forEach(url => URL.revokeObjectURL(url));
      };
    } else {
      setImagePreviews([]);
    }
  }, [imageFiles]);

  const updateData = (e) => {
    const { name, value } = e.target;
    
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

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files); // ✅ Directly set files array
    
    // ✅ Agar files upload ho rahi hain, toh image URL clear karo
    if (files.length > 0) {
      setData(prev => ({ ...prev, image: "" }));
    }
  };

  const removeImage = (index) => {
    const updatedFiles = [...imageFiles];
    const updatedPreviews = [...imagePreviews];
    
    // ✅ Cleanup URL
    URL.revokeObjectURL(updatedPreviews[index]);
    
    updatedFiles.splice(index, 1);
    updatedPreviews.splice(index, 1);
    
    setImageFiles(updatedFiles);
    setImagePreviews(updatedPreviews);
  };

  const removeAllImages = () => {
    // ✅ Cleanup all URLs
    imagePreviews.forEach(url => URL.revokeObjectURL(url));
    setImageFiles([]);
    setImagePreviews([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      console.log("Product data...", data);
      
      const formData = new FormData();
      
      // ✅ Correct field names use karo
      formData.append('title', data.title || '');
      formData.append('description', data.description || '');
      formData.append('price', data.price || 0);
      formData.append('quantity', data.quantity || 0);
      formData.append('category', data.category || '');
      formData.append('productType', data.productType || 'physical');
      
      // ✅ Agar image files hain toh unhe append karo
      if (imageFiles.length > 0) {
        imageFiles.forEach((file) => {
          formData.append('image', file); // ✅ Field name 'image' for multiple files
        });
      } else if (data.image) {
        // ✅ Agar URL hai toh woh bhejo as a field
        formData.append('imageURL', data.image); // ✅ Different field name for URL
      }
      
      // ✅ FormData content check karo
      console.log("FormData contents:");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      
      // ✅ Dispatch createProduct
      const result = await dispatch(createProduct(formData)).unwrap();
      
      if (result && result.status === 1) {
        setSuccessMessage(result.message || "Product added successfully!");
        setShowSuccess(true);
        setData({});
        setImageFiles([]);
        setImagePreviews([]);
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
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707-9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
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
              name="title"
              value={data.title || ""}
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
                  // ✅ Agar URL add ho raha hai toh files clear karo
                  if (e.target.value) {
                    removeAllImages();
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
                multiple
                onChange={handleImageChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                JPEG, PNG, GIF, WebP (Max 5MB)
              </p>
            </div>

            {/* ✅ Multiple Image Previews */}
            {(imagePreviews.length > 0 || data.image) && (
              <div className="md:col-span-2 mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image Preview
                </label>
                <div className="flex flex-wrap gap-4 items-center">
                  {/* URL Preview */}
                  {data.image && (
                    <div className="relative">
                      <img 
                        src={data.image} 
                        alt="URL Preview" 
                        className="h-24 w-24 object-cover rounded border"
                      />
                      <button
                        type="button"
                        onClick={() => setData(prev => ({ ...prev, image: "" }))}
                        className="absolute -top-2 -right-2 bg-red-100 text-red-700 rounded-full p-1 text-xs hover:bg-red-200"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                  
                  {/* File Previews */}
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative">
                      <img 
                        src={preview} 
                        alt={`Preview ${index + 1}`} 
                        className="h-24 w-24 object-cover rounded border"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-100 text-red-700 rounded-full p-1 text-xs hover:bg-red-200"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
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


// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { createProduct} from "../../Redux/Actions/ProductActions";
// import { getAllCategory  } from "../../Redux/Actions/CategoryAction";
// import { useNavigate } from "react-router-dom";
// import Input from "../../components/common/Input"; 
// import Button from "../../components/common/Button";

// function AddProduct() {
//   const dispatch = useDispatch();
//   const [data, setData] = useState({});
  
//   const productState = useSelector((state) => state.product || {});
//   const { error = null, loading = false, categories = [] } = productState;
  
//   const navigate = useNavigate();
  
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [imageFiles, setImageFiles] = useState([]);
//   const [imagePreviews, setImagePreviews] = useState([]);
  
//   // ✅ Categories fetch on component mount
//   useEffect(() => {
//     dispatch(getAllCategory ());
//   }, [dispatch]);

//   // ✅ Success message dikhane ke baad automatically navigate karne ke liye
//   useEffect(() => {
//     if (showSuccess) {
//       const timer = setTimeout(() => {
//         navigate('/products');
//       }, 2000);
//       return () => clearTimeout(timer);
//     }
//   }, [showSuccess, navigate]);

//   // ✅ Image preview ke liye - MULTIPLE files support
//   useEffect(() => {
//     if (imageFiles.length > 0) {
//       const previewUrls = imageFiles.map(file => URL.createObjectURL(file));
//       setImagePreviews(previewUrls);

//       // ✅ Cleanup
//       return () => {
//         previewUrls.forEach(url => URL.revokeObjectURL(url));
//       };
//     } else {
//       setImagePreviews([]);
//     }
//   }, [imageFiles]);

//   const updateData = (e) => {
//     const { name, value } = e.target;
    
//     if (name === 'quantity' || name === 'price') {
//       setData({
//         ...data,
//         [name]: value === '' ? '' : Number(value)
//       });
//     } else {
//       setData({
//         ...data,
//         [name]: value,
//       });
//     }
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     setImageFiles(files);
    
//     // ✅ Agar files upload ho rahi hain, toh image URL clear karo
//     if (files.length > 0) {
//       setData(prev => ({ ...prev, image: "" }));
//     }
//   };

//   const removeImage = (index) => {
//     const updatedFiles = [...imageFiles];
//     const updatedPreviews = [...imagePreviews];
    
//     // ✅ Cleanup URL
//     URL.revokeObjectURL(updatedPreviews[index]);
    
//     updatedFiles.splice(index, 1);
//     updatedPreviews.splice(index, 1);
    
//     setImageFiles(updatedFiles);
//     setImagePreviews(updatedPreviews);
//   };

//   const removeAllImages = () => {
//     // ✅ Cleanup all URLs
//     imagePreviews.forEach(url => URL.revokeObjectURL(url));
//     setImageFiles([]);
//     setImagePreviews([]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     try {
//       console.log("Product data...", data);
      
//       const formData = new FormData();
      
//       // ✅ Correct field names use karo
//       formData.append('title', data.title || '');
//       formData.append('description', data.description || '');
//       formData.append('price', data.price || 0);
//       formData.append('quantity', data.quantity || 0);
//       formData.append('category', data.category || '');
//       formData.append('productType', data.productType || 'physical');
      
//       // ✅ Agar image files hain toh unhe append karo
//       if (imageFiles.length > 0) {
//         imageFiles.forEach((file) => {
//           formData.append('image', file);
//         });
//       } else if (data.image) {
//         // ✅ Agar URL hai toh woh bhejo as a field
//         formData.append('imageURL', data.image);
//       }
      
//       // ✅ FormData content check karo
//       console.log("FormData contents:");
//       for (let [key, value] of formData.entries()) {
//         console.log(`${key}:`, value);
//       }
      
//       // ✅ Dispatch createProduct
//       const result = await dispatch(createProduct(formData)).unwrap();
      
//       if (result && result.status === 1) {
//         setSuccessMessage(result.message || "Product added successfully!");
//         setShowSuccess(true);
//         setData({});
//         setImageFiles([]);
//         setImagePreviews([]);
        
//         // ✅ Refresh categories after adding new product
//         setTimeout(() => {
//           dispatch(getCategories());
//         }, 1000);
//       }
//     } catch (error) {
//       console.error("Error adding product:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-6">
//       <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h2>
        
//         {/* ✅ Success Message Display */}
//         {showSuccess && (
//           <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
//             <div className="flex items-center">
//               <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707-9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//               </svg>
//               <strong>Success!</strong>
//             </div>
//             <p className="mt-1">{successMessage}</p>
//           </div>
//         )}
        
//         {/* ✅ Error Display */}
//         {error && !showSuccess && (
//           <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
//             {error.message || "Error adding product"}
//           </div>
//         )}
        
//         <form onSubmit={handleSubmit}>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <Input
//               label="Product Title"
//               name="title"
//               value={data.title || ""}
//               onChange={updateData}
//               required
//             />
            
//             <Input
//               label="Price"
//               type="number"
//               name="price"
//               value={data.price || ""}
//               onChange={updateData}
//               min="0"
//               step="0.01"
//               required
//             />
            
//             <Input
//               label="Quantity"
//               type="number"
//               name="quantity"
//               value={data.quantity || ""}
//               onChange={updateData}
//               min="0"
//               step="1"
//               required
//             />
            
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Product Type</label>
//               <select
//                 name="productType"
//                 value={data.productType || ""}
//                 onChange={updateData}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 required
//               >
//                 <option value="">Select Type</option>
//                 <option value="physical">Physical</option>
//                 <option value="digital">Digital</option>
//                 <option value="service">Service</option>
//               </select>
//             </div>
            
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
//               <select
//                 name="category"
//                 value={data.category || ""}
//                 onChange={updateData}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 required
//               >
//                 <option value="">Select Category</option>
//                 {/* ✅ DYNAMIC CATEGORIES from database */}
//                 {categories.length > 0 ? (
//                   categories.map((category, index) => (
//                     <option key={index} value={category}>
//                       {category}
//                     </option>
//                   ))
//                 ) : (
//                   // ✅ Fallback agar categories load nahi hui
//                   <option value="" disabled>
//                     Loading categories...
//                   </option>
//                 )}
//               </select>
              
//               {/* ✅ Categories loading/error state */}
//               {loading && (
//                 <p className="text-xs text-gray-500 mt-1">Loading categories...</p>
//               )}
              
//               {categories.length === 0 && !loading && (
//                 <p className="text-xs text-yellow-600 mt-1">
//                   No categories found. Add a product to create categories.
//                 </p>
//               )}
//             </div>

//             {/* ✅ Image URL Input */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Image URL (Optional)
//               </label>
//               <input
//                 type="url"
//                 name="image"
//                 value={data.image || ""}
//                 onChange={(e) => {
//                   updateData(e);
//                   if (e.target.value) {
//                     removeAllImages();
//                   }
//                 }}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 placeholder="https://example.com/image.jpg"
//               />
//               <p className="text-xs text-gray-500 mt-1">
//                 Provide image URL OR upload image below
//               </p>
//             </div>

//             {/* ✅ Image Upload Input */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Upload Image (Optional)
//               </label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 multiple
//                 onChange={handleImageChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//               />
//               <p className="text-xs text-gray-500 mt-1">
//                 JPEG, PNG, GIF, WebP (Max 5MB)
//               </p>
//             </div>

//             {/* ✅ Multiple Image Previews */}
//             {(imagePreviews.length > 0 || data.image) && (
//               <div className="md:col-span-2 mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Image Preview
//                 </label>
//                 <div className="flex flex-wrap gap-4 items-center">
//                   {/* URL Preview */}
//                   {data.image && (
//                     <div className="relative">
//                       <img 
//                         src={data.image} 
//                         alt="URL Preview" 
//                         className="h-24 w-24 object-cover rounded border"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setData(prev => ({ ...prev, image: "" }))}
//                         className="absolute -top-2 -right-2 bg-red-100 text-red-700 rounded-full p-1 text-xs hover:bg-red-200"
//                       >
//                         ✕
//                       </button>
//                     </div>
//                   )}
                  
//                   {/* File Previews */}
//                   {imagePreviews.map((preview, index) => (
//                     <div key={index} className="relative">
//                       <img 
//                         src={preview} 
//                         alt={`Preview ${index + 1}`} 
//                         className="h-24 w-24 object-cover rounded border"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => removeImage(index)}
//                         className="absolute -top-2 -right-2 bg-red-100 text-red-700 rounded-full p-1 text-xs hover:bg-red-200"
//                       >
//                         ✕
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
            
//             <div className="md:col-span-2 mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//               <textarea
//                 name="description"
//                 value={data.description || ""}
//                 onChange={updateData}
//                 rows="4"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 required
//                 placeholder="Enter product description..."
//               />
//             </div>
//           </div>
          
//           <div className="flex justify-end space-x-3 mt-6">
//             <Button
//               type="button"
//               variant="secondary"
//               onClick={() => navigate('/products')}
//               disabled={isSubmitting || showSuccess}
//             >
//               Cancel
//             </Button>
//             <Button
//               type="submit"
//               variant="primary"
//               disabled={isSubmitting || loading || showSuccess}
//             >
//               {isSubmitting || loading ? 'Adding Product...' : 'Add Product'}
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default AddProduct;