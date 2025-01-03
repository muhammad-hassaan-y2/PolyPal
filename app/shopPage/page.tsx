import ShopContainer from '../../components/shop/ShopContainer';
import Navbar from '@/components/Navbar';

const ShopPage = () => {
    return (
        <div className="min-h-screen bg-[#FFFBE8]">
            <Navbar />
            <div className="flex pt-16">
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
        </div>
    );
};

export default ShopPage;

