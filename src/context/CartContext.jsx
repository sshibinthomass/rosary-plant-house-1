import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const { user } = useAuth();
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);

    // Sync cart from Firestore when user is logged in
    useEffect(() => {
        if (!user) {
            // Load cart from localStorage for guest users
            const localCart = localStorage.getItem('rosary_cart');
            if (localCart) {
                setCart(JSON.parse(localCart));
            }
            return;
        }

        // Subscribe to user's cart in Firestore
        const userRef = doc(db, 'users', user.uid);
        const unsubscribe = onSnapshot(userRef, (doc) => {
            if (doc.exists()) {
                const userData = doc.data();
                setCart(userData.cart || []);
            }
        });

        return () => unsubscribe();
    }, [user]);

    // Save cart to localStorage for guest users
    useEffect(() => {
        if (!user) {
            localStorage.setItem('rosary_cart', JSON.stringify(cart));
        }
    }, [cart, user]);

    const syncCartToFirestore = useCallback(async (newCart) => {
        if (!user) return;

        try {
            const userRef = doc(db, 'users', user.uid);
            await updateDoc(userRef, { cart: newCart });
        } catch (error) {
            console.error('Error syncing cart:', error);
        }
    }, [user]);

    const addToCart = useCallback(async (product, quantity = 1) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.productId === product.id);

            let newCart;
            if (existingItem) {
                newCart = prevCart.map(item =>
                    item.productId === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                newCart = [...prevCart, {
                    productId: product.id,
                    name: product.name,
                    price: product.price,
                    imageUrl: product.imageUrl,
                    quantity
                }];
            }

            syncCartToFirestore(newCart);
            return newCart;
        });
    }, [syncCartToFirestore]);

    const removeFromCart = useCallback(async (productId) => {
        setCart(prevCart => {
            const newCart = prevCart.filter(item => item.productId !== productId);
            syncCartToFirestore(newCart);
            return newCart;
        });
    }, [syncCartToFirestore]);

    const updateQuantity = useCallback(async (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }

        setCart(prevCart => {
            const newCart = prevCart.map(item =>
                item.productId === productId
                    ? { ...item, quantity }
                    : item
            );
            syncCartToFirestore(newCart);
            return newCart;
        });
    }, [removeFromCart, syncCartToFirestore]);

    const clearCart = useCallback(async () => {
        setCart([]);
        syncCartToFirestore([]);
    }, [syncCartToFirestore]);

    const getCartTotal = useCallback(() => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }, [cart]);

    const getCartCount = useCallback(() => {
        return cart.reduce((count, item) => count + item.quantity, 0);
    }, [cart]);

    const value = {
        cart,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
