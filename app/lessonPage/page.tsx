'use client'

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpen, MessageCircle, BookText, Globe, Plane, Heart } from 'lucide-react';

export default function LessonPage() {
    const topics = [
        { title: "Beginner Topics", items: [
            { name: "Foods", description: "Learn about Chinese cuisine", icon: BookOpen, href: "/detailedLessonPage/BeginnerFoods" },
            { name: "Conversations", description: "Practice basic dialogues", icon: MessageCircle, href: "/detailedLessonPage/BeginnerConversations" },
            { name: "Grammar", description: "Master fundamental grammar rules", icon: BookText, href: "/detailedLessonPage/BeginnerGrammar" },
        ]},
        { title: "Intermediate Topics", items: [
            { name: "Culture", description: "Explore Chinese traditions", icon: Globe, href: "/detailedLessonPage/IntermediateCulture" },
            { name: "Travel", description: "Learn travel-related vocabulary", icon: Plane, href: "/detailedLessonPage/IntermediateTravel" },
            { name: "Health", description: "Discuss health and wellness", icon: Heart, href: "/detailedLessonPage/IntermediateHealth" },
        ]},
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 to-pink-200">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-pink-800 mb-8 text-center">Chinese Language Lessons</h1>
                {topics.map((topic, index) => (
                    <div key={index} className="mb-12">
                        <h2 className="text-2xl font-semibold text-pink-700 mb-4">{topic.title}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {topic.items.map((item, itemIndex) => (
                                <Link key={itemIndex} href={item.href}>
                                    <Card className="hover:shadow-lg transition-shadow duration-300 bg-white bg-opacity-70 backdrop-blur-md">
                                        <CardHeader className="flex flex-col items-center text-center">
                                            <div className="bg-pink-200 p-3 rounded-full mb-4">
                                                <item.icon className="w-8 h-8 text-pink-600" />
                                            </div>
                                            <CardTitle className="text-pink-700">{item.name}</CardTitle>
                                            <CardDescription className="text-pink-600">{item.description}</CardDescription>
                                        </CardHeader>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

