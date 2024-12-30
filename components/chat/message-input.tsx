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
    <form onSubmit={onSubmit} className="flex items-center space-x-2 p-4 border-t border-pink-200">
      <Input
        value={input}
        onChange={onInputChange}
        placeholder="Type a message..."
        disabled={isLoading}
        className="flex-1 bg-pink-50 border-pink-200 text-pink-900 placeholder:text-pink-400"
      />

      <Button type="submit" size="icon" disabled={isLoading} className="bg-pink-500 hover:bg-pink-600 text-white">
        <Send className="h-4 w-4" />

        <span className="sr-only">Send message</span>
        
      </Button>
    </form>
  );
}
