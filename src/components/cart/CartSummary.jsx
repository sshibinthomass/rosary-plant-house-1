import { useCart } from '../../context/CartContext';

const CartSummary = () => {
    const { cart, getCartTotal } = useCart();

    const subtotal = getCartTotal();
    const shipping = subtotal > 500 ? 0 : 50; // Free shipping over ₹500
    const total = subtotal + shipping;

    return (
        <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>

            <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cart.length} items)</span>
                    <span>₹{subtotal}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? 'text-primary font-medium' : ''}>
                        {shipping === 0 ? 'FREE' : `₹${shipping}`}
                    </span>
                </div>

                {subtotal > 0 && subtotal < 500 && (
                    <p className="text-xs text-gray-500 bg-cream rounded-lg p-2">
                        💡 Add ₹{500 - subtotal} more for free shipping!
                    </p>
                )}

                <hr className="my-2" />

                <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-accent">₹{total}</span>
                </div>
            </div>
        </div>
    );
};

export default CartSummary;
