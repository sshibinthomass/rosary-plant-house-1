import { useWishlist } from '../context/WishlistContext';
import WishlistItem from '../components/wishlist/WishlistItem';
import { Link } from 'react-router-dom';

const WishlistPage = () => {
    const { wishlist } = useWishlist();

    return (
        <div className="pt-16 pb-4">
            <div className="container-app py-4">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    Your Wishlist
                    {wishlist.length > 0 && (
                        <span className="text-gray-500 font-normal text-lg ml-2">
                            ({wishlist.length})
                        </span>
                    )}
                </h1>

                {wishlist.length === 0 ? (
                    <div className="text-center py-12">
                        <span className="text-5xl mb-4 block">💚</span>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">
                            Your wishlist is empty
                        </h2>
                        <p className="text-gray-500 mb-6">
                            Save plants you love for later!
                        </p>
                        <Link
                            to="/"
                            className="inline-block btn-primary"
                        >
                            Explore Plants
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {wishlist.map((item) => (
                            <WishlistItem key={item.productId} item={item} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WishlistPage;
