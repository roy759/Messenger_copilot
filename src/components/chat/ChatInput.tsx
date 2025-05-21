import React, { useState } from 'react';
import { Smile, Paperclip, Send, Zap, ChevronDown } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (content: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showAiTools, setShowAiTools] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    if (!isTyping && e.target.value) {
      setIsTyping(true);
    } else if (isTyping && !e.target.value) {
      setIsTyping(false);
    }
  };

  const insertAiSuggestion = () => {
    setMessage("I understand your concern. I'd be happy to help you resolve this issue. Could you please provide more details?");
  };

  const handleAiAction = (action: string) => {
    switch (action) {
      case 'polish':
        setMessage(message => message.trim() + "\n\nI hope this helps! Let me know if you need any clarification.");
        break;
      case 'concise':
        setMessage(message => message.split('.')[0] + ".");
        break;
      case 'empathy':
        setMessage(message => "I understand how frustrating this must be. " + message);
        break;
    }
    setShowAiTools(false);
  };
  
  return (
    <div className="p-4 bg-white border-t border-gray-200">
      {isTyping && (
        <div className="text-xs text-gray-500 mb-2 animate-pulse">
          Support Team is typing...
        </div>
      )}

      {/* AI Tools Dropdown */}
      <div className="relative mb-2">
        <button
          onClick={() => setShowAiTools(!showAiTools)}
          className="flex items-center space-x-1 px-3 py-1 text-sm bg-purple-50 text-purple-700 rounded-full hover:bg-purple-100 transition-colors"
        >
          <Zap className="h-4 w-4" />
          <span>AI Tools</span>
          <ChevronDown className="h-3 w-3" />
        </button>

        {showAiTools && (
          <div className="absolute left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
            <button
              onClick={() => handleAiAction('polish')}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
            >
              Polish response
            </button>
            <button
              onClick={() => handleAiAction('concise')}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
            >
              Make it concise
            </button>
            <button
              onClick={() => handleAiAction('empathy')}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
            >
              Add empathy
            </button>
          </div>
        )}
      </div>
      
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
              className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
            >
              <Smile className="h-5 w-5" />
            </button>
            <button 
              type="button" 
              className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
            >
              <Paperclip className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <button
          type="button"
          onClick={insertAiSuggestion}
          className="ml-2 p-2 rounded-full bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors"
          title="Insert AI Suggestion"
        >
          <Zap className="h-5 w-5" />
        </button>
        
        <button 
          type="submit" 
          className={`ml-2 p-2 rounded-full ${
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