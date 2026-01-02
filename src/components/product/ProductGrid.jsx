import ProductCard from './ProductCard';
import Loader from '../common/Loader';

const ProductGrid = ({ products, loading }) => {
    if (loading) {
        return (
            <div className="py-8">
                <Loader size="lg" />
            </div>
        );
    }

    if (!products || products.length === 0) {
        return (
            <div className="py-12 text-center">
                <span className="text-4xl mb-3 block">🌵</span>
                <p className="text-gray-500">No plants found</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductGrid;
