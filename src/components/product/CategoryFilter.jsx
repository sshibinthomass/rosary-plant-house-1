const categories = [
    { id: 'all', label: 'All Plants', emoji: '🌿' },
    { id: 'succulents', label: 'Succulents', emoji: '🪴' },
    { id: 'indoor', label: 'Indoor', emoji: '🌱' },
    { id: 'outdoor', label: 'Outdoor', emoji: '🌳' }
];

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
    return (
        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
            <div className="flex gap-2 pb-2">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => onCategoryChange(category.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${selectedCategory === category.id
                                ? 'bg-primary text-white shadow-md'
                                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                            }`}
                    >
                        <span>{category.emoji}</span>
                        <span>{category.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoryFilter;
