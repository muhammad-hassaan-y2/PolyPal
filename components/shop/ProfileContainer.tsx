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
        <div className="w-1/2 flex items-center justify-center">
            {hasProfile === false ? (
                <div className="text-center text-red-500">
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

                {/* Accessories */}
                {Object.entries(profileImages).map(([type, imageUrl]) => (
                    <div
                        key={type}
                        className={type}
                        style={{
                            position: 'absolute',
                            top: type === 'hats' ? '60%' : type === 'glasses' ? '70%' : type === 'collars' ? '105%' : '80%',
                            left: '83%',
                            transform: 'translate(-50%, -50%)',
                            width: '100%',
                            height: '100%',
                        }}
                    >
                        <Image src={imageUrl} alt={`${type}`} width={100} height={100} />
                    </div>
                ))}
            </div>
        )}
        </div>
    )
}