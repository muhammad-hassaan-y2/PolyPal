import * as React from "react"
import { useEffect, useState } from "react";

export default function NavbarPoints() {
    const [data, setData] = useState(null);
    useEffect(() => {
        try {
            fetch('/api/db/userProgress/points', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(response => response.json())
                .then(data => setData(data.points))

        } catch (error) {
            console.error('Error:', error)
        }

    }, [])

    return (
        <span
            className="px-4 py-2 font-bold hover:scale-110 transition-transform text-black justify-left">
            Points: {data}
        </span>

    )
}