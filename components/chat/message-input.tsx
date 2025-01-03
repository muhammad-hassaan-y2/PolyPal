import { Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface MessageInputProps {
  input: string;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function MessageInput({ input, isLoading, onSubmit, onInputChange }: MessageInputProps) {
  return (
    <form onSubmit={onSubmit} className="flex items-center space-x-2 p-4 border-t">
      <Input
        value={input}
        onChange={onInputChange}
        placeholder="Type a message..."
        disabled={isLoading}
        className="flex-1 bg-orange-100 border-[#594F43] text-orange-500 placeholder:text-orange-500"
      />

      <Button type="submit" size="icon" disabled={isLoading} className="bg-orange-400 hover:bg-orange-500 text-white">
        <Send className="h-4 w-4" />

        <span className="sr-only">Send message</span>
        
      </Button>
    </form>
  );
}
