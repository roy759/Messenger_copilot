import React, { useEffect, useRef } from 'react';
import { Message, User } from '../../types';
import MessageItem from './MessageItem';

interface MessageListProps {
  messages: Message[];
  users: User[];
}

const MessageList: React.FC<MessageListProps> = ({ messages, users }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Group messages by date
  const groupedMessages: { [key: string]: Message[] } = {};
  
  messages.forEach(message => {
    const date = new Date(message.timestamp);
    const dateString = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    
    if (!groupedMessages[dateString]) {
      groupedMessages[dateString] = [];
    }
    
    groupedMessages[dateString].push(message);
  });

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
      {Object.entries(groupedMessages).map(([date, msgs]) => (
        <div key={date} className="mb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="h-px bg-gray-200 flex-grow"></div>
            <span className="px-3 text-xs text-gray-500">{date}</span>
            <div className="h-px bg-gray-200 flex-grow"></div>
          </div>
          
          {msgs.map(message => {
            const sender = users.find(user => user.id === message.senderId);
            if (!sender) return null;
            
            return (
              <MessageItem 
                key={message.id} 
                message={message} 
                sender={sender}
              />
            );
          })}
        </div>
      ))}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;