import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

const WishlistItem = ({ item }) => {
    const { removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();
    const { success } = useToast();

    const handleMoveToCart = () => {
        addToCart({
            id: item.productId,
            name: item.name,
            price: item.price,
            imageUrl: item.imageUrl
        });
        removeFromWishlist(item.productId);
        success(`${item.name} moved to cart! 🛒`);
    };

    return (
        <div className="flex gap-3 bg-white rounded-xl p-3 shadow-sm">
            {/* Product Image */}
            <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Product Details */}
            <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 line-clamp-1">{item.name}</h3>
                <p className="text-accent font-bold mt-1">₹{item.price}</p>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-2">
                    <button
                        onClick={handleMoveToCart}
                        className="flex-1 px-3 py-1.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-light transition-colors"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>

            {/* Remove Button */}
            <button
                onClick={() => removeFromWishlist(item.productId)}
                className="text-gray-400 hover:text-red-500 transition-colors self-start"
                aria-label="Remove from wishlist"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
};

export default WishlistItem;
