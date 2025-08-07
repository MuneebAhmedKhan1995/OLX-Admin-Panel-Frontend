import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const AddCategory = () => {
  const { addCategory, showNotification } = useContext(AppContext);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!name.trim()) {
      showNotification('Category name is required', 'error');
      setIsSubmitting(false);
      return;
    }

    const newCategory = {
      id: Date.now().toString(),
      name: name.trim()
    };

    addCategory(newCategory);
    navigate('/categories');
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Category</h2>
        
        <form onSubmit={handleSubmit}>
          <Input
            label="Category Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Electronics"
            required
          />
          
          <div className="flex justify-end space-x-3 mt-6">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/categories')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'Add Category'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;