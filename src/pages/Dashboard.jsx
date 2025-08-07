import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import StatsCard from '../components/common/StatsCard';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const { users, products, categories, orders } = useContext(AppContext);

  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Sales ($)',
      data: [5000, 7000, 4500, 8000, 6000, 9000],
      backgroundColor: 'rgba(79, 70, 229, 0.7)',
      borderRadius: 6
    }]
  };

  const categoryData = {
    labels: categories.map(cat => cat.name),
    datasets: [{
      data: categories.map(cat => cat.productCount || 0),
      backgroundColor: [
        'rgba(79, 70, 229, 0.7)',
        'rgba(16, 185, 129, 0.7)',
        'rgba(59, 130, 246, 0.7)',
        'rgba(168, 85, 247, 0.7)',
      ],
      borderWidth: 0
    }]
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
      </div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
  <motion.div whileHover={{ y: -5, scale: 1.03 }} transition={{ type: 'spring', stiffness: 300 }}>
    <StatsCard 
      title="PRODUCTS" 
      value="300" 
      icon="inventory" 
      color="bg-blue"
    />
  </motion.div>
  
  <motion.div whileHover={{ y: -5, scale: 1.03 }} transition={{ type: 'spring', stiffness: 300 }}>
    <StatsCard 
      title="CATEGORIES" 
      value="15" 
      secondaryValue="22" 
      icon="category" 
      color="bg-indigo"
    />
  </motion.div>
  
  <motion.div whileHover={{ y: -5, scale: 1.03 }} transition={{ type: 'spring', stiffness: 300 }}>
    <StatsCard 
      title="CUSTOMERS" 
      value="3000" 
      secondaryValue="25" 
      icon="people" 
      color="bg-blue"
    />
  </motion.div>
  
  <motion.div whileHover={{ y: -5, scale: 1.03 }} transition={{ type: 'spring', stiffness: 300 }}>
    <StatsCard 
      title="ALERTS" 
      value="50" 
      icon="warning" 
      color="bg-purple"
    />
  </motion.div>
</div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Monthly Sales</h2>
          <div className="h-80">
            <Bar 
              data={salesData} 
              options={{
                maintainAspectRatio: false,
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(0,0,0,0.05)' }
                  },
                  x: {
                    grid: { display: false }
                  }
                }
              }}
            />
          </div>
        </div>
<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
  <h2 className="text-xl font-semibold mb-4 text-gray-800">Category Distribution</h2>
  
  <div className="space-y-4">
    {categories.slice(0, 4).map((category, index) => {
      const colors = [
        'bg-blue-500', 
        'bg-green-500',
        'bg-purple-500',
        'bg-orange-500',
        'bg-yellow-500',

      ];
      const percentage = Math.round((category.productCount / products.length) * 100);
      
      return (
        <div key={category.id} className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-gray-700">{category.name}</span>
            <span className="text-gray-500">{percentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${colors[index % colors.length]}`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
      );
    })}
  </div>

  <div className="mt-6 pt-4 border-t border-gray-100">
    <div className="flex justify-between text-sm text-gray-500">
      <span>Total Categories</span>
      <span className="font-medium">{categories.length}</span>
    </div>
  </div>
</div>
      </div>
    </div>
  );
};


export default Dashboard;