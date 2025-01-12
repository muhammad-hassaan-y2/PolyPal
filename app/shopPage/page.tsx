"use client"

import Navbar from '@/components/Navbar';
import ShopContainer from '../../components/shop/ShopContainer';
import ProfileContainer from '@/components/shop/ProfileContainer';
import { useState } from 'react'

const ShopPage = () => {
    const [pointsToPass, setPointsToPass] = useState(0)

    return (
        <div>
            <Navbar passedPoints={pointsToPass} setPassedPoints={setPointsToPass} disablePoints={false}/>
            <div className="flex h-screen">
                <ProfileContainer />
                <div className="w-1/2">
                    <ShopContainer passedPoints={pointsToPass} setPassedPoints={setPointsToPass} />
                </div>
            </div>
        </div>
    );
};

export default ShopPage;
