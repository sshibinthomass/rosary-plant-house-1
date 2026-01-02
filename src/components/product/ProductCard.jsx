import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const { isInWishlist, toggleWishlist } = useWishlist();
    const { success } = useToast();

    const inWishlist = isInWishlist(product.id);

    const handleAddToCart = (e) => {
        e.stopPropagation();
        addToCart(product);
        success(`${product.name} added to cart! 🛒`);
    };

    const handleToggleWishlist = (e) => {
        e.stopPropagation();
        const added = toggleWishlist(product);
        if (added) {
            success(`${product.name} added to wishlist! ❤️`);
        }
    };

    return (
        <div className="card overflow-hidden group cursor-pointer">
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                />

                {/* Stock Badge */}
                {!product.inStock && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        Out of Stock
                    </div>
                )}

                {/* Wishlist Button */}
                <button
                    onClick={handleToggleWishlist}
                    className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-md transition-all hover:scale-110"
                    aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill={inWishlist ? 'currentColor' : 'none'}
                        stroke="currentColor"
                        strokeWidth={inWishlist ? 0 : 2}
                        className={`w-5 h-5 transition-colors ${inWishlist ? 'text-red-500' : 'text-gray-600'}`}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                        />
                    </svg>
                </button>
            </div>

            {/* Product Info */}
            <div className="p-3">
                {/* Category */}
                <span className="text-xs text-gray-500 uppercase tracking-wide">
                    {product.category}
                </span>

                {/* Name */}
                <h3 className="font-semibold text-gray-900 mt-1 line-clamp-1">
                    {product.name}
                </h3>

                {/* Price & Add to Cart */}
                <div className="flex items-center justify-between mt-2">
                    <span className="text-lg font-bold text-accent">
                        ₹{product.price}
                    </span>

                    <button
                        onClick={handleAddToCart}
                        disabled={!product.inStock}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${product.inStock
                                ? 'bg-primary text-white hover:bg-primary-light active:scale-95'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
