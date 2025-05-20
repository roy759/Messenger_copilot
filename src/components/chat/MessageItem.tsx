import React from 'react';
import { Message, User } from '../../types';

interface MessageItemProps {
  message: Message;
  sender: User;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, sender }) => {
  const isAdmin = message.isAdmin;
  const timestamp = new Date(message.timestamp).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit'
  });
  
  // Format large blocks of text with proper paragraph breaks
  const formattedContent = message.content.split('\n').map((line, i) => (
    <p key={i} className={i > 0 ? 'mt-2' : ''}>{line}</p>
  ));
  
  return (
    <div className={`flex mb-4 ${isAdmin ? 'justify-end' : 'justify-start'}`}>
      {/* Avatar for non-admin messages */}
      {!isAdmin && (
        <div className="flex-shrink-0 mr-3">
          <img 
            src={sender.avatar} 
            alt={sender.name} 
            className="h-8 w-8 rounded-full object-cover"
          />
        </div>
      )}
      
      <div className={`max-w-[75%] ${isAdmin ? 'order-1' : 'order-2'}`}>
        <div className={`px-4 py-3 rounded-lg ${
          isAdmin 
            ? 'bg-purple-200 text-purple-800' 
            : 'bg-gray border border-black-200'
        }`}>
          {formattedContent}
        </div>
        
        <div className={`mt-1 flex items-center text-xs ${
          isAdmin ? 'justify-end' : 'justify-start'
        }`}>
          <span className="text-gray-500">{timestamp}</span>
          
          {isAdmin && message.seen && (
            <span className="ml-2 text-blue-500 flex items-center">
              <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Seen
            </span>
          )}
        </div>
      </div>
      
      {/* Avatar for admin messages */}
      {isAdmin && (
        <div className="flex-shrink-0 mr-3">
          <img 
            src={sender.avatar} 
            alt={sender.name} 
            className="h-8 w-8 rounded-full object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default MessageItem;