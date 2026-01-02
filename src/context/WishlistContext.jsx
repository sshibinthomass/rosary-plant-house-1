import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuth } from './AuthContext';

const WishlistContext = createContext(null);

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};

export const WishlistProvider = ({ children }) => {
    const { user } = useAuth();
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(false);

    // Sync wishlist from Firestore when user is logged in
    useEffect(() => {
        if (!user) {
            // Load wishlist from localStorage for guest users
            const localWishlist = localStorage.getItem('rosary_wishlist');
            if (localWishlist) {
                setWishlist(JSON.parse(localWishlist));
            }
            return;
        }

        // Subscribe to user's wishlist in Firestore
        const userRef = doc(db, 'users', user.uid);
        const unsubscribe = onSnapshot(userRef, (doc) => {
            if (doc.exists()) {
                const userData = doc.data();
                setWishlist(userData.wishlist || []);
            }
        });

        return () => unsubscribe();
    }, [user]);

    // Save wishlist to localStorage for guest users
    useEffect(() => {
        if (!user) {
            localStorage.setItem('rosary_wishlist', JSON.stringify(wishlist));
        }
    }, [wishlist, user]);

    const syncWishlistToFirestore = useCallback(async (newWishlist) => {
        if (!user) return;

        try {
            const userRef = doc(db, 'users', user.uid);
            await updateDoc(userRef, { wishlist: newWishlist });
        } catch (error) {
            console.error('Error syncing wishlist:', error);
        }
    }, [user]);

    const addToWishlist = useCallback(async (product) => {
        setWishlist(prevWishlist => {
            const exists = prevWishlist.some(item => item.productId === product.id);
            if (exists) return prevWishlist;

            const newWishlist = [...prevWishlist, {
                productId: product.id,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
                addedAt: new Date().toISOString()
            }];

            syncWishlistToFirestore(newWishlist);
            return newWishlist;
        });
    }, [syncWishlistToFirestore]);

    const removeFromWishlist = useCallback(async (productId) => {
        setWishlist(prevWishlist => {
            const newWishlist = prevWishlist.filter(item => item.productId !== productId);
            syncWishlistToFirestore(newWishlist);
            return newWishlist;
        });
    }, [syncWishlistToFirestore]);

    const isInWishlist = useCallback((productId) => {
        return wishlist.some(item => item.productId === productId);
    }, [wishlist]);

    const toggleWishlist = useCallback(async (product) => {
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id);
            return false;
        } else {
            addToWishlist(product);
            return true;
        }
    }, [isInWishlist, addToWishlist, removeFromWishlist]);

    const value = {
        wishlist,
        loading,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        toggleWishlist
    };

    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    );
};

export default WishlistContext;
