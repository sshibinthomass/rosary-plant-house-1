import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import WhatsAppCheckout from '../components/cart/WhatsAppCheckout';
import { Link } from 'react-router-dom';

const CartPage = () => {
    const { cart } = useCart();

    return (
        <div className="pt-16 pb-4">
            <div className="container-app py-4">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Your Cart</h1>

                {cart.length === 0 ? (
                    <div className="text-center py-12">
                        <span className="text-5xl mb-4 block">🛒</span>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">
                            Your cart is empty
                        </h2>
                        <p className="text-gray-500 mb-6">
                            Add some beautiful plants to get started!
                        </p>
                        <Link
                            to="/"
                            className="inline-block btn-primary"
                        >
                            Browse Plants
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {/* Cart Items */}
                        <div className="space-y-3">
                            {cart.map((item) => (
                                <CartItem key={item.productId} item={item} />
                            ))}
                        </div>

                        {/* Cart Summary */}
                        <CartSummary />

                        {/* WhatsApp Checkout */}
                        <WhatsAppCheckout />

                        {/* Continue Shopping */}
                        <Link
                            to="/"
                            className="block text-center text-primary font-medium py-2 hover:underline"
                        >
                            ← Continue Shopping
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;
