import { motion } from 'framer-motion';

const Card = ({ children, className = '', hoverEffect = true }) => {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' } : {}}
      className={`bg-white rounded-lg shadow-sm overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Card;