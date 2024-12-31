'use client';

import { useEffect, useState } from 'react';

import { Card, CardTitle, CardHeader, CardDescription, CardImage } from "@/components/ui/card";

interface ShopItem {
    itemId: number;
    imageUrl: string;
    price: number;
    name: string;
    type: string;
}

const fetchShopItems = async () => {
    try {
        const res = await fetch(`http://localhost:3000/api/db/inventory`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json()
        console.log("data retrieved", data);

        // Map the DynamoDB format to a simpler structure
        return data.map((item: any) => ({
            itemId: item.itemId.N,
            imageUrl: item.imageUrl.S,
            price: parseFloat(item.price.N),
            name: item.name.S,
            type: item.type.S,
        }));
    } catch(error) {
        console.error("Error loading shop items", error);
    }
}

export default function ShopContainer() {
    const [shopItems, setShopItems] = useState<ShopItem[]>([]);

    useEffect(() => {
        async function getShopItems() {
            const data = await fetchShopItems();
            console.log("useEffect", data);
            setShopItems(data);
        }
        getShopItems();
    }, []);

    return (
        <div>
            <h1>Shop Items</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {shopItems.map((item, index) => (
                        <Card key={index} className="m-4">
                            <CardImage src={item.imageUrl} alt={item.name} width={100} height={100} />
                            <CardHeader>
                                <CardTitle>{item.name}</CardTitle>
                                <CardDescription>Price: ${item.price}</CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>

        </div>
    )
}
