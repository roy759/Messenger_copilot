import React, { useState } from 'react';
import { Smile, Paperclip, Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (content: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit on Enter (without Shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Show typing indicator when user starts typing
    if (!isTyping && e.target.value) {
      setIsTyping(true);
    } else if (isTyping && !e.target.value) {
      setIsTyping(false);
    }
  };
  
  return (
    <div className="p-4 bg-white border-t border-gray-200">
      {isTyping && (
        <div className="text-xs text-gray-500 mb-2 animate-pulse">
          Support Team is typing...
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="flex items-end">
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Use ⌘K for shortcuts"
            className="w-full resize-none border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={2}
          />
          
          <div className="absolute bottom-3 left-3 flex space-x-1">
            <button 
              type="button" 
              className="text-red-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
            >
              <Smile className="h-5 w-5" />
            </button>
            <button 
              type="button" 
              className="text-red-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
            >
              <Paperclip className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <button 
          type="submit" 
          className={`ml-3 p-2 rounded-full ${
            message.trim() 
              ? 'bg-blue-500 text-white hover:bg-blue-600' 
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          } transition-colors`}
          disabled={!message.trim()}
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;