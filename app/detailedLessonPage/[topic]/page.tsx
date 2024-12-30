'use client';
import { useEffect, useState } from 'react';
import Navbar from "@/components/Navbar"
import ReactMarkdown from 'react-markdown';
import { useParams } from 'next/navigation';
import Notes from "@/components/Notes";

const fetchAI = async (topic) => {
    try {
        const res = await fetch(`http://localhost:3000/api/ai`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inputText: `Please focus on ${topic} topics when teaching Chinese.`
            })
        });        
        const data = await res.json()
        return data
    } catch(error) {
        console.error("Error loading ai", error);
    }
}

export default function DetailedLessonPage() {
    const params = useParams();
    // Access 'topic' from the URL query string, ex href="/detailedLessonPage/BeginnerFoods"
    const topic = params?.topic; 
    const [aiOutput, setAiOutput] = useState("Waiting for your language partner");
    console.log(topic);
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
        <Notes />
        <h1>AI Feature</h1>
        <ReactMarkdown>{aiOutput}</ReactMarkdown>
        </div>
    )
}