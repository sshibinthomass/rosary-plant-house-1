const Loader = ({ size = 'md', fullScreen = false }) => {
    const sizeClasses = {
        sm: 'w-5 h-5 border-2',
        md: 'w-8 h-8 border-3',
        lg: 'w-12 h-12 border-4'
    };

    const spinner = (
        <div
            className={`${sizeClasses[size]} border-primary/20 border-t-primary rounded-full animate-spin`}
        />
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 z-[200] flex items-center justify-center bg-cream/80 backdrop-blur-sm">
                <div className="flex flex-col items-center gap-3">
                    <div className={`${sizeClasses.lg} border-primary/20 border-t-primary rounded-full animate-spin`} />
                    <span className="text-primary font-medium">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center p-4">
            {spinner}
        </div>
    );
};

export default Loader;
