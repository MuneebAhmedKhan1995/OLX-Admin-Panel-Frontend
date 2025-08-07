const StatsCard = ({ title, value, statusIcon, icon }) => {
  const colorSchemes = {
  inventory: {
      bg: 'blue' ? 'bg-blue-800' : 'bg-orange-50', 
      iconBg:'blue' ? 'bg-green-900' : 'bg-orange-500',
      text:'black' ? 'text-black' : 'text-orange-700', 
      statusBg:'blue' ? 'bg-green-700' : 'bg-orange-100'
    },
    category: {
      bg: 'blue' ? 'bg-orange-800' : 'bg-orange-50',
      iconBg:'blue' ? 'bg-green-900' : 'bg-orange-500',
      text:'black' ? 'text-black' : 'text-orange-700', 
      statusBg:'blue' ? 'bg-green-700' : 'bg-orange-100'
    },
    people: {
      bg: 'blue' ? 'bg-green-800' : 'bg-orange-50', 
      iconBg:'blue' ? 'bg-green-900' : 'bg-orange-500',
      text:'black' ? 'text-black' : 'text-orange-700',
      statusBg:'blue' ? 'bg-green-700' : 'bg-orange-100'
    },
    warning: {
      bg: 'blue' ? 'bg-red-800' : 'bg-orange-50', 
      iconBg:'blue' ? 'bg-green-900' : 'bg-orange-500',
      text:'black' ? 'text-black' : 'text-orange-700', 
      statusBg:'blue' ? 'bg-green-700' : 'bg-orange-100'
    }
  };

  const colors = colorSchemes[icon] || colorSchemes.inventory;

  return (
    <div className={`aspect-square p-4 rounded-lg ${colors.bg} border border-gray-200 shadow-sm flex flex-col`}>
      <h3 className="text-sm font-medium text-black-600 mb-4">{title}</h3>
      <div className="flex-grow flex flex-col items-center justify-center gap-2">
        <p className={`text-3xl font-bold ${colors.text}`}>{value}</p>
        {statusIcon && (
          <span className={`text-lg ${colors.text} p-2 rounded-full ${colors.statusBg}`}>
            {statusIcon}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatsCard;