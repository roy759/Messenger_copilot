import React from 'react';
import { AppState } from '../../types';
import { ChevronLeft } from 'lucide-react';
import AICopilot from './AICopilot';
import CustomerDetails from './CustomerDetails';
import { getUserById, getConversationById } from '../../data/mockData';

interface DetailsPanelProps {
  state: AppState;
  onTabChange: (tab: 'ai' | 'details') => void;
  onBackToChat: () => void;
}

const DetailsPanel: React.FC<DetailsPanelProps> = ({ 
  state, 
  onTabChange,
  onBackToChat
}) => {
  const selectedConversation = state.selectedConversationId 
    ? getConversationById(state, state.selectedConversationId) 
    : null;
    
  const user = selectedConversation 
    ? getUserById(state, selectedConversation.userId) 
    : null;

  if (!selectedConversation || !user) {
    return (
      <div className="h-full flex items-center justify-center p-4 text-center text-gray-500">
        <p>Select a conversation to view details</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 flex items-center">
        <button 
          className="md:hidden mr-2 p-1 rounded-full hover:bg-gray-100"
          onClick={onBackToChat}
        >
          <ChevronLeft className="h-5 w-5 text-gray-500" />
        </button>
        
        <div className="flex space-x-4">
          <button 
            className={`px-3 py-1 text-sm rounded-full transition ${
              state.detailsTab === 'ai' 
                ? 'bg-blue-100 text-blue-800' 
                : 'text-gray-500 hover:bg-gray-100'
            }`}
            onClick={() => onTabChange('ai')}
          >
            AI Copilot
          </button>
          <button 
            className={`px-3 py-1 text-sm rounded-full transition ${
              state.detailsTab === 'details' 
                ? 'bg-blue-100 text-blue-800' 
                : 'text-gray-500 hover:bg-gray-100'
            }`}
            onClick={() => onTabChange('details')}
          >
            Details
          </button>
        </div>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto">
        {state.detailsTab === 'ai' ? (
          <AICopilot user={user} conversation={selectedConversation} />
        ) : (
          <CustomerDetails user={user} conversation={selectedConversation} />
        )}
      </div>
    </div>
  );
};

export default DetailsPanel;