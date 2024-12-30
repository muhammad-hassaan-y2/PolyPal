'use client';

import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { MessageBubble } from '@/components/chat/message-bubble';
import { MessageInput } from '@/components/chat/message-input';
import { Button } from "@/components/ui/button";
import { FileText } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
        const response = await fetch('/api/ai', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ inputText: input }),
        });
      
        const data = await response.json();
      
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: data.message || "I couldn't process your request. Please try again.",
          role: 'assistant',
        };
      
        setMessages((prev) => [...prev, assistantMessage]);
      } catch (error) {
        console.error('Error:', error);
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: "I'm sorry, there was an error processing your request.",
          role: 'assistant',
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
      
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-pink-100 to-pink-200">
      <Card className="flex flex-col w-full max-w-2xl mx-auto my-4 bg-white/80 backdrop-blur-sm border-pink-200">
        <div className="flex justify-between items-center p-4 border-b border-pink-200">
          <h1 className="text-xl font-semibold text-pink-900">Chat Interface</h1>
          <Button
            variant="ghost"
            size="icon"
            className="text-pink-700 hover:text-pink-800 hover:bg-pink-100"
          >
            <FileText className="h-5 w-5" />
            <span className="sr-only">Notes</span>
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <MessageBubble key={message.id} content={message.content} role={message.role} />
          ))}
          {isLoading && (
            <div className="flex items-center space-x-2">
              <div className="animate-pulse h-2 w-2 rounded-full bg-pink-400" />
              <div className="animate-pulse h-2 w-2 rounded-full bg-pink-400 animation-delay-200" />
              <div className="animate-pulse h-2 w-2 rounded-full bg-pink-400 animation-delay-400" />
            </div>
          )}
        </div>
        <MessageInput
          input={input}
          isLoading={isLoading}
          onSubmit={handleSubmit}
          onInputChange={(e) => setInput(e.target.value)}
        />
      </Card>
    </div>
  );
}
