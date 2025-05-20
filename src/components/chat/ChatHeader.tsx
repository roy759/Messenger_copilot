import React from 'react';
import { User, Conversation } from '../../types';
import { ChevronLeft, Info, X } from 'lucide-react';

interface ChatHeaderProps {
  user: User;
  conversation: Conversation;
  onBackToInbox: () => void;
  onViewDetails: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  user,
  conversation,
  onBackToInbox,
  onViewDetails
}) => {
  return (
    <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
      <div className="flex items-center">
        <button 
          className="md:hidden mr-2 p-1 rounded-full hover:bg-gray-100"
          onClick={onBackToInbox}
        >
          <ChevronLeft className="h-5 w-5 text-gray-500" />
        </button>
        
        <div className="flex items-center">
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="h-8 w-8 rounded-full object-cover mr-3"
          />
          <div>
            <h2 className="font-medium text-gray-900">{user.name}</h2>
            {user.company && (
              <p className="text-xs text-gray-500">{user.company}</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <button 
          className="md:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
          onClick={onViewDetails}
        >
          <Info className="h-5 w-5" />
        </button>
        
        <button className="px-3 py-1 rounded-md text-gray-700 hover:bg-gray-100 flex items-center text-sm">
          <X className="h-4 w-4 mr-1" />
          <span>Close</span>
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;