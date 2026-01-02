import { useState, useEffect } from 'react';
import CategoryFilter from '../components/product/CategoryFilter';
import ProductGrid from '../components/product/ProductGrid';

// Demo products for testing (will be replaced with Firestore data)
const demoProducts = [
    {
        id: '1',
        name: 'Echeveria Elegans',
        description: 'Beautiful rosette-shaped succulent with pale blue-green leaves',
        price: 299,
        category: 'succulents',
        imageUrl: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400&h=400&fit=crop',
        inStock: true
    },
    {
        id: '2',
        name: 'Snake Plant',
        description: 'Hardy indoor plant known for air purification',
        price: 449,
        category: 'indoor',
        imageUrl: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?w=400&h=400&fit=crop',
        inStock: true
    },
    {
        id: '3',
        name: 'Jade Plant',
        description: 'Symbol of good luck and prosperity',
        price: 349,
        category: 'succulents',
        imageUrl: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=400&fit=crop',
        inStock: true
    },
    {
        id: '4',
        name: 'Monstera Deliciosa',
        description: 'Trendy tropical plant with iconic split leaves',
        price: 899,
        category: 'indoor',
        imageUrl: 'https://images.unsplash.com/photo-1614594975525-e45c3431e84d?w=400&h=400&fit=crop',
        inStock: true
    },
    {
        id: '5',
        name: 'Aloe Vera',
        description: 'Medicinal succulent with healing properties',
        price: 199,
        category: 'succulents',
        imageUrl: 'https://images.unsplash.com/photo-1567331711402-509c12c41959?w=400&h=400&fit=crop',
        inStock: false
    },
    {
        id: '6',
        name: 'Hibiscus',
        description: 'Vibrant flowering plant for your garden',
        price: 399,
        category: 'outdoor',
        imageUrl: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=400&h=400&fit=crop',
        inStock: true
    },
    {
        id: '7',
        name: 'Peace Lily',
        description: 'Elegant white-flowered indoor plant',
        price: 549,
        category: 'indoor',
        imageUrl: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400&h=400&fit=crop',
        inStock: true
    },
    {
        id: '8',
        name: 'Bougainvillea',
        description: 'Colorful flowering vine for outdoor spaces',
        price: 499,
        category: 'outdoor',
        imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
        inStock: true
    }
];

const HomePage = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading from Firestore
        setTimeout(() => {
            setProducts(demoProducts);
            setLoading(false);
        }, 500);
    }, []);

    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(p => p.category === selectedCategory);

    return (
        <div className="pt-16 pb-4">
            {/* Hero Section */}
            <section className="container-app py-6">
                <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-6 text-white relative overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

                    <div className="relative z-10">
                        <span className="text-3xl mb-2 block">🌿</span>
                        <h1 className="text-2xl font-bold mb-2">
                            Bring Nature Home
                        </h1>
                        <p className="text-white/80 text-sm mb-4">
                            Handpicked succulents & plants delivered to your doorstep
                        </p>
                        <div className="flex items-center gap-2 text-xs">
                            <span className="bg-white/20 px-3 py-1 rounded-full">Free Shipping ₹500+</span>
                            <span className="bg-accent px-3 py-1 rounded-full">COD Available</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Category Filter */}
            <section className="container-app mb-4">
                <h2 className="text-lg font-bold text-gray-900 mb-3">Shop by Category</h2>
                <CategoryFilter
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                />
            </section>

            {/* Product Grid */}
            <section className="container-app">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-bold text-gray-900">
                        {selectedCategory === 'all' ? 'All Plants' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}`}
                    </h2>
                    <span className="text-sm text-gray-500">
                        {filteredProducts.length} items
                    </span>
                </div>
                <ProductGrid products={filteredProducts} loading={loading} />
            </section>
        </div>
    );
};

export default HomePage;
