'use client';

import { SetStateAction, useEffect, useState } from 'react';
import Image from 'next/image';

const fetchProfileImages = async () => {
    try {
        const res = await fetch(`/api/db/updateProfile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json()
        return data
    } catch (error) {
        console.error("Error fetching profile images", error);
    }
}

export interface ProfileData{
    success: boolean,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    clothesImagesMap : any
}
interface ProfileContainerProps {
    profileData : ProfileData,
    setProfileData: (value: SetStateAction<ProfileData>) => void
}

export const ProfileContainer: React.FC<ProfileContainerProps> = ({ profileData, setProfileData}) => {
    const [profileImages, setProfileImages] = useState<{ [key: string]: string }>({});
    const [hasProfile, setHasProfile] = useState(false);

    //TODO : it should update after every purchase, rn it only updates on page load
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchProfileImages();

            setProfileData(data)
        };
        fetchData();
    }, [setProfileData]);

    useEffect(() => {
        const fetchData = async () => {
            if (profileData && profileData.success === true) {
                setProfileImages(profileData.clothesImagesMap);
                setHasProfile(true);
            } else {
                setHasProfile(false);
            }
        };
        fetchData();
    }, [profileData]);

    return (
        <div className="relative w-1/2 flex items-center justify-center">
            <div className="absolute inset-0 opacity-70">
                <Image
                    src="/petShop.png"
                    alt="Pet Shop Background"
                    layout="fill"
                    objectFit="contain"
                    className="z-0 transform -translate-y-40"
                />
            </div>
            {hasProfile === false ? (
                <div className="text-center text-red-500 z-10">
                    <p>No profile or fetching profile</p>
                </div>
            ) : (
            //Avatar profile
            <div 
            id="profile" 
            style={{ 
                position: "relative",
                width: "300px",
                height: "300px",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
            }}
            >
                <div 
                    id="avatar"
                    style={{
                        backgroundColor: 'white',
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                        border: "5px solid #000",
                        overflow: "hidden",
                        marginTop: "-20px",
                    }}
                >
                    <Image 
                        src="/catAva.png" 
                        alt="error" 
                        width={300} 
                        height={300} 
                    />
                </div>

                {/* Accessories (play around with positioning) */}
                {Object.entries(profileImages).map(([type, imageUrl]) => (
                    <div
                        key={type}
                        className={type}
                        style={{
                            position: 'absolute',
                            top: type === 'hats' ? '30%' : type === 'glasses' ? '70%' : type === 'collars' ? '105%' : '80%',
                            left: '83%',
                            transform: type === 'hats' ? 'translate(-50%, -22%)' : type === 'glasses' ? 'translate(-61%, -50%)' : 'translate(-50%, -50%)',
                            width: '100%',
                            height: '100%',
                        }}
                    >
                        {/*glasses should be bigger*/}
                        <Image src={imageUrl} alt={`${type}`} width={type === 'glasses' ? 170 : 100} height={type === 'glasses' ? 170 : 100} />
                    </div>
                ))}
            </div>
        )}
        </div>
    )
}