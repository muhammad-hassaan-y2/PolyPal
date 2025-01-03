import { cn } from "@/lib/utils";
import { User, Bot } from 'lucide-react';

interface MessageBubbleProps {
  content: string;
  role: 'user' | 'assistant';
}

export function MessageBubble({ content, role }: MessageBubbleProps) {
  return (
    <div className={cn("flex space-x-2", role === 'user' ? "flex-row-reverse space-x-reverse" : "flex-row")}>

      <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", role === 'assistant' ?
         "bg-pink-200" : "bg-[#8CDBF3]")}>

        {role === 'assistant' ? <Bot className="w-5 h-5 text-pink-700" /> :
         <User className="w-5 h-5 text-pink-700" />}
      </div>

      <div className={cn("rounded-lg px-4 py-2 text-sm max-w-[80%]", role === 'user' ?
        "bg-[#8CDBF3] text-[#020202] border-[#594F43]" : "bg-[#FF9000] text-[#020202] border-[#594F43]")}>
        {content}
      </div>
      
    </div>
  );
}
