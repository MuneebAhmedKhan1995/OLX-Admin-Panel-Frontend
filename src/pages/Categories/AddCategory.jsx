// import { useContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AppContext } from '../../context/AppContext';
// import Input from '../../components/common/Input';
// import Button from '../../components/common/Button';

// const AddCategory = () => {
//   const { addCategory, showNotification } = useContext(AppContext);
//   const navigate = useNavigate();
//   const [name, setName] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     if (!name.trim()) {
//       showNotification('Category name is required', 'error');
//       setIsSubmitting(false);
//       return;
//     }

//     const newCategory = {
//       id: Date.now().toString(),
//       name: name.trim()
//     };

//     addCategory(newCategory);
//     navigate('/categories');
//   };

//   return (
//     <div className="container mx-auto px-4 py-6">
//       <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Category</h2>
        
//         <form onSubmit={handleSubmit}>
//           <Input
//             label="Category Name"
//             name="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="e.g., Electronics"
//             required
//           />
          
//           <div className="flex justify-end space-x-3 mt-6">
//             <Button
//               type="button"
//               variant="secondary"
//               onClick={() => navigate('/categories')}
//             >
//               Cancel
//             </Button>
//             <Button
//               type="submit"
//               variant="primary"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? 'Adding...' : 'Add Category'}
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddCategory;


import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategory } from "../../Redux/Actions/CategoryAction";
import { useNavigate } from "react-router-dom";

// ✅ Components import karo
import Input from "../../components/common/Input"; 
import Button from "../../components/common/Button";

function AddCategory() {
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
  

  // ✅ Success message dikhane ke baad automatically navigate karne ke liye
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        navigate('/categories');
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

  


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Product data...", data);
    setIsSubmitting(true);
    setShowSuccess(false);
    
    // ✅ Backend API ke according data structure banayein
    const productData = {
      name: data.name,
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
      const result = await dispatch(createCategory(productData)).unwrap();
      
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
              label="Category Name"
              name="name"
              value={data.name || ""}
              onChange={updateData}
              required
            />
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/categories')}
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

export default AddCategory;