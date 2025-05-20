import React, { useState } from 'react';
import { AppState, Conversation } from '../../types';
import ConversationItem from './ConversationItem';
import { Search } from 'lucide-react';

interface InboxPanelProps {
  state: AppState;
  onSelectConversation: (id: string) => void;
  onTabChange: (tab: 'open' | 'waiting') => void;
}

const InboxPanel: React.FC<InboxPanelProps> = ({ 
  state, 
  onSelectConversation,
  onTabChange
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredConversations = state.conversations.filter(conversation => {
    if (state.activeTab === 'open' && conversation.status !== 'open') return false;
    if (state.activeTab === 'waiting' && conversation.status !== 'waiting') return false;
    
    if (!searchQuery) return true;
    
    const user = state.users.find(user => user.id === conversation.userId);
    if (!user) return false;
    
    return user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           (user.company && user.company.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Your Inbox</h2>
        
        {/* Tabs */}
        <div className="flex space-x-3 mb-4">
          <button 
            className={`px-3 py-1 text-sm rounded-full transition-all ${
              state.activeTab === 'open' 
                ? 'bg-blue-100 text-blue-800' 
                : 'text-gray-500 hover:bg-gray-100'
            }`}
            onClick={() => onTabChange('open')}
          >
            5 Open
          </button>
          <button 
            className={`px-3 py-1 text-sm rounded-full transition-all ${
              state.activeTab === 'waiting' 
                ? 'bg-blue-100 text-blue-800' 
                : 'text-gray-500 hover:bg-gray-100'
            }`}
            onClick={() => onTabChange('waiting')}
          >
            Waiting longest
          </button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search conversations..."
            className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      
      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No conversations found
          </div>
        ) : (
          filteredConversations.map(conversation => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              isSelected={conversation.id === state.selectedConversationId}
              state={state}
              onClick={() => onSelectConversation(conversation.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default InboxPanel;