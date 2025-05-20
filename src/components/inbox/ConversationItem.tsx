import React from 'react';
import { AppState, Conversation } from '../../types';
import { formatRelativeTime, getUserById, getLastMessageForConversation } from '../../data/mockData';

interface ConversationItemProps {
  conversation: Conversation;
  isSelected: boolean;
  state: AppState;
  onClick: () => void;
}

const ConversationItem: React.FC<ConversationItemProps> = ({ 
  conversation, 
  isSelected, 
  state,
  onClick 
}) => {
  const user = getUserById(state, conversation.userId);
  const lastMessage = getLastMessageForConversation(state, conversation.id);
  
  if (!user || !lastMessage) return null;
  
  const relativeTime = formatRelativeTime(lastMessage.timestamp);
  
  // Truncate message preview
  const messagePreview = lastMessage.content.length > 65
    ? `${lastMessage.content.substring(0, 65)}...`
    : lastMessage.content;
  
  return (
    <div 
      className={`p-4 border-b border-gray-200 cursor-pointer transition duration-150 ease-in-out ${
        isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'
      }`}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="h-10 w-10 rounded-full object-cover"
          />
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-900 truncate">
              {user.name}
            </h3>
            <span className="text-xs text-gray-500">
              {relativeTime}
            </span>
          </div>
          
          {/* Tags */}
          {conversation.tags && (
            <div className="flex items-center mt-1 space-x-1">
              {conversation.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-1.5 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          {/* Message preview */}
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            {messagePreview}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationItem;