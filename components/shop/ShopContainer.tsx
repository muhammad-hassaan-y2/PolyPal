/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { SetStateAction, useEffect, useState } from 'react';
import { Card, CardTitle, CardHeader, CardDescription, CardImage } from "@/components/ui/card";
import { Button } from '../ui/button';
import { ProfileData } from './ProfileContainer';

interface ShopItem {
    itemId: number;
    imageUrl: string;
    price: number;
    name: string;
    type: string;
    s3Key: string;
    equipped: boolean;
    owned: boolean;
}

const fetchUserSession = async() => {
    try {
        const res = await fetch('/api/get-session', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return (await res.json()).userId
    } catch (err) {
        return false;
    }
}

const fetchShopItems = async () => {
    try {
        const res = await fetch(`/api/db/inventory`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json()
        // Map the DynamoDB format to a simpler structure
        return data.map((item: any) => ({
            itemId: item.itemId.N,
            imageUrl: item.imageUrl.S,
            price: item.price.N,
            name: item.name.S,
            type: item.type.S,
            equipped: item.equipped,
            owned: item.owned
        }));
    } catch (error) {
        console.error("Error loading shop items", error)
        return []
    }
}

const buyItem = async (item: ShopItem) => {
    try {
        await fetch('/api/db/inventory/buyItem', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newItemId: item.itemId, newItemPrice: item.price }),
        })
    } catch (err) {
        console.log(err)
    }
}

const equipItem = async (item: ShopItem, setProfileData: (value: SetStateAction<ProfileData>) => void) => {
    try {
        await fetch('/api/db/userProgress/updateItem', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newItemId: item.itemId, newItemType: item.type }),
        })
    } catch (err) {
        console.log(err)
    }

    const profileData = await fetchProfileImages()
    setProfileData(profileData)
}

interface ShopContainerProps {
    passedPoints : number,
    setPassedPoints: (value: SetStateAction<number>) => void
    setProfileData: (value: SetStateAction<ProfileData>) => void
}

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

export const ShopContainer: React.FC<ShopContainerProps> = ({ passedPoints, setPassedPoints, setProfileData}) => {
    const [shopItems, setShopItems] = useState<ShopItem[]>([]);
    const [filteredShopItems, setFilteredShopItems] = useState<ShopItem[]>([]);
    const [userSession, setUserSession] = useState(false)

    useEffect(() => {
        async function setupShop() {
            const fetchedSession = await fetchUserSession();
            setUserSession(fetchedSession)

            const data = await fetchShopItems();
            setShopItems(data);
            setFilteredShopItems(data);
        }
        setupShop();
    }, []);

    const filterByItemType = (type: string) => {
        if (type === "all") {
            setFilteredShopItems(shopItems);
            return;
        }
        const filteredItems = shopItems.filter(item => item.type === type);
        setFilteredShopItems(filteredItems);
    }

    const handleBuyItem = (index: number) => {
        const boughtItem = filteredShopItems[index]

        if (passedPoints - boughtItem.price >= 0){
            buyItem(boughtItem)

            boughtItem.owned = true
            filteredShopItems[index] = boughtItem
    
            setPassedPoints(passedPoints - boughtItem.price)
            setFilteredShopItems(filteredShopItems.slice())
        }
    }

    const handleEquipItem = (index: number, setProfileData : (value: SetStateAction<ProfileData>) => void) => {
        equipItem(filteredShopItems[index], setProfileData)

        const equippedItem = filteredShopItems[index]

        equippedItem.equipped = !equippedItem.equipped
        filteredShopItems[index] = equippedItem

        filteredShopItems.map((item: ShopItem)=>{
            if (item.itemId != equippedItem.itemId && 
                item.type === equippedItem.type){
                item.equipped = false
            }
        })

        setFilteredShopItems(filteredShopItems.slice())
    }

    return (
        <div>
            <h1>Shop Items</h1>
            <Button onClick={() => filterByItemType("all")}>All</Button>
            <Button onClick={() => filterByItemType("hats")}>Hats</Button>
            <Button onClick={() => filterByItemType("glasses")}>Glasses</Button>
            <Button onClick={() => filterByItemType("collars")}>Collars</Button>
            <Button onClick={() => filterByItemType("avatar")}>Avatar</Button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredShopItems.map((item, index) => (
                    <Card key={index} className="m-4" style={{ backgroundColor: item.equipped ? "rgb(255 251 232 / var(--tw-bg-opacity, 1))" : "white"}}>
                        <div className="w-1/3 mx-auto">
                            <CardImage src={item.imageUrl} alt={item.name} width={100} height={100} />
                        </div>
                        <CardHeader>
                            <CardTitle>{item.name}</CardTitle>
                            <CardDescription>Price: ${item.price}</CardDescription>
                            <div>
                                {userSession?  
                                    (item.owned ?
                                        (<Button onClick={() => {handleEquipItem(index, setProfileData)}}> {item.equipped? "Unequip" : "Equip" + " Item"}</Button>)
                                        :
                                        (<Button style={{backgroundColor: "#e25237"}} onClick={() => handleBuyItem(index)}>Buy Item</Button>)
                                    )  
                                    : "" }
                            </div>
                        </CardHeader>
                    </Card>
                ))}
            </div>

        </div>
    )
}
