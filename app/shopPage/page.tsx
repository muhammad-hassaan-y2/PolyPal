import ShopContainer from '../../components/shop/ShopContainer';

const ShopPage = () => {
    return (
        <div className="flex">
            <div className="w-1/2 flex items-center justify-center">
                {/* Avatar or other content */}
                <div className="avatar-placeholder bg-gray-200 w-32 h-32 rounded-full flex items-center justify-center">
                    <span>Avatar</span>
                </div>
            </div>
            <div className="w-1/2">
                <ShopContainer />
            </div>
        </div>
    );
};

export default ShopPage;