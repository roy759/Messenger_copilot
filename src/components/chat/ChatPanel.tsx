import React from 'react';
import { AppState } from '../../types';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import { getUserById, getConversationById, getMessagesByConversationId } from '../../data/mockData';

interface ChatPanelProps {
  state: AppState;
  onBackToInbox: () => void;
  onViewDetails: () => void;
  onSendMessage: (content: string) => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ 
  state, 
  onBackToInbox,
  onViewDetails,
  onSendMessage
}) => {
  const selectedConversation = state.selectedConversationId 
    ? getConversationById(state, state.selectedConversationId) 
    : null;
    
  const user = selectedConversation 
    ? getUserById(state, selectedConversation.userId) 
    : null;
    
  const messages = selectedConversation 
    ? getMessagesByConversationId(state, selectedConversation.id) 
    : [];

  if (!selectedConversation || !user) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No conversation selected</h3>
          <p className="text-gray-500">Select a conversation from the inbox to view messages</p>
          <button
            onClick={onBackToInbox}
            className="mt-4 px-4 py-2 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition md:hidden"
          >
            Go to Inbox
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <ChatHeader 
        user={user} 
        conversation={selectedConversation} 
        onBackToInbox={onBackToInbox}
        onViewDetails={onViewDetails}
      />
      
      <MessageList 
        messages={messages}
        users={state.users}
      />
      
      <ChatInput onSendMessage={onSendMessage} />
    </div>
  );
};

export default ChatPanel;