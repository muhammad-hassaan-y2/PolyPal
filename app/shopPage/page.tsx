import ShopContainer from '../../components/shop/ShopContainer';
import Image from 'next/image'

const ShopPage = () => {
    
    return (
        <div className="flex h-screen">
            <div className="w-1/2 flex items-center justify-center">
                {/* Avatar profile*/}
                <div 
                id="wholeAvatar"
                style={{ 
                    position: "relative",
                    width: "200px",
                    height: "200px"
                }}
                >

                <div 
                id="baseAvatar"
                style={{
                    width: "100%",
                    height: "100%"
                }}
                >
                    <Image 
                    src="/testvibbyBlue.png" 
                    alt="error" 
                    width={100} 
                    height={100} 
                    />
                </div>

                <div 
                className="hat"
                style={{
                    position: "absolute",
                    top: "30%",
                    left: "45%",
                    transform: "translate(-50%, -50%)",
                    width: "100%",
                    height: "100%"
                }}
                >
                    <Image 
                        src="/testHat.png" 
                        alt="Nothing" 
                        width={100} 
                        height={100}
                    />
                </div>

                <div 
                className="glasses"
                style={{
                    position: "absolute",
                    top: "65%",
                    left: "45%",
                    transform: "translate(-50%, -50%)",
                    width: "100%",
                    height: "100%"
                }}
                >
                    <Image 
                        src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                        alt=""
                        width={100} 
                        height={100}
                    />
                </div>

                </div>
                {/* </div> */}
            </div>
            <div className="w-1/2">
                <ShopContainer />
            </div>
        </div>
    );
};

export default ShopPage;
