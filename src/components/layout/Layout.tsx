import React, { useState } from 'react';
import { AppState } from '../../types';
import InboxPanel from '../inbox/InboxPanel';
import ChatPanel from '../chat/ChatPanel';
import DetailsPanel from '../details/DetailsPanel';
import { initialState } from '../../data/mockData';

const Layout: React.FC = () => {
  const [state, setState] = useState<AppState>(initialState);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileView, setMobileView] = useState<'inbox' | 'chat' | 'details'>('inbox');

  const handleSelectConversation = (conversationId: string) => {
    setState(prevState => ({
      ...prevState,
      selectedConversationId: conversationId
    }));
    // On mobile, switch to chat view when selecting a conversation
    if (window.innerWidth < 768) {
      setMobileView('chat');
    }
  };

  const handleTabChange = (tab: 'open' | 'waiting') => {
    setState(prevState => ({
      ...prevState,
      activeTab: tab
    }));
  };

  const handleDetailsTabChange = (tab: 'ai' | 'details') => {
    setState(prevState => ({
      ...prevState,
      detailsTab: tab
    }));
  };

  const handleSendMessage = (content: string) => {
    if (!state.selectedConversationId || !content.trim()) return;
    
    const newMessage: any = {
      id: `msg${state.messages.length + 1}`,
      conversationId: state.selectedConversationId,
      senderId: 'admin1',
      content,
      timestamp: new Date().toISOString(),
      seen: true,
      isAdmin: true
    };

    setState(prevState => ({
      ...prevState,
      messages: [...prevState.messages, newMessage]
    }));
  };

  // Function to handle mobile view navigation
  const navigateTo = (view: 'inbox' | 'chat' | 'details') => {
    setMobileView(view);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Mobile Header with Menu Button */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
        <div className="flex items-center">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none"
          >
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="ml-2 text-lg font-semibold">Customer Support</h1>
        </div>
        
        {/* Mobile navigation pills */}
        <div className="flex space-x-2">
          <button 
            onClick={() => navigateTo('inbox')} 
            className={`px-3 py-1 rounded-full text-sm ${mobileView === 'inbox' ? 'bg-blue-100 text-blue-800' : 'text-gray-500'}`}
          >
            Inbox
          </button>
          <button 
            onClick={() => navigateTo('chat')} 
            className={`px-3 py-1 rounded-full text-sm ${mobileView === 'chat' ? 'bg-blue-100 text-blue-800' : 'text-gray-500'}`}
          >
            Chat
          </button>
          <button 
            onClick={() => navigateTo('details')} 
            className={`px-3 py-1 rounded-full text-sm ${mobileView === 'details' ? 'bg-blue-100 text-blue-800' : 'text-gray-500'}`}
          >
            Details
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel (Inbox) */}
        <div className={`${
          mobileView === 'inbox' ? 'block' : 'hidden'
        } md:block md:w-1/4 lg:w-1/5 border-r border-gray-200 bg-white overflow-y-auto transition-all duration-300 ease-in-out`}>
          <InboxPanel 
            state={state} 
            onSelectConversation={handleSelectConversation} 
            onTabChange={handleTabChange}
          />
        </div>

        {/* Middle Panel (Chat) */}
        <div className={`${
          mobileView === 'chat' ? 'block' : 'hidden'
        } md:block flex-1 md:w-2/4 lg:w-3/5 border-r border-gray-200 bg-white overflow-hidden transition-all duration-300 ease-in-out`}>
          <ChatPanel 
            state={state}
            onBackToInbox={() => navigateTo('inbox')}
            onViewDetails={() => navigateTo('details')}
            onSendMessage={handleSendMessage}
          />
        </div>

        {/* Right Panel (Details) */}
        <div className={`${
          mobileView === 'details' ? 'block' : 'hidden'
        } md:block md:w-1/4 lg:w-1/5 bg-white overflow-y-auto transition-all duration-300 ease-in-out`}>
          <DetailsPanel 
            state={state} 
            onTabChange={handleDetailsTabChange}
            onBackToChat={() => navigateTo('chat')}
          />
        </div>
      </div>
    </div>
  );
};

export default Layout;