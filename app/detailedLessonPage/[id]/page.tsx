'use client';
import { useEffect, useState } from 'react';
import Navbar from "@/components/Navbar"
import { text } from 'stream/consumers';

const fetchAI = async (topic) => {
    try {
        const res = await fetch(`http://localhost:3000/api/ai`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inputText: "teach me chinese"
            })
        });        
        const data = await res.json()
        return data
    } catch(error) {
        console.error("Error loading ai", error);
    }
}

export default function DetailedLessonPage({params}) {
    const {topic} = params;
    const [aiOutput, setAiOutput] = useState("Waiting for your language partner");
    // const aiOutput = fetchAI(topic);
    useEffect(() => {
        async function getAIOutput() {
            const data = await fetchAI(topic);
            if (data && data.output && data.output.message && data.output.message.content) {
                const textOutput = data.output.message.content.map(item => item.text).join("\n\n");
                setAiOutput(textOutput);
            } else {
                setAiOutput("No output received from AI.");
            }
        }
        getAIOutput();
        console.log(aiOutput);
    }, [topic]);

    return (
        <div>
        <Navbar />
        <h1>AI Feature</h1>
        <p>{JSON.stringify(aiOutput, null, 2)}</p>
        </div>
    )
}