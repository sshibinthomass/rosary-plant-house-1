import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-primary/10">
            <div className="container-app flex items-center justify-between h-14">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <span className="text-2xl">🌿</span>
                    <h1 className="text-lg font-bold text-primary">
                        Rosary<span className="text-accent">.</span>
                    </h1>
                </Link>

                {/* Search Icon */}
                <button
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary/10 transition-colors"
                    aria-label="Search"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5 text-primary"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                        />
                    </svg>
                </button>
            </div>
        </header>
    );
};

export default Navbar;
