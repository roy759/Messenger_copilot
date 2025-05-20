export interface User {
  id: string;
  name: string;
  avatar: string;
  company?: string;
  email: string;
  source?: string;
  lastActive?: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  timestamp: string;
  seen?: boolean;
  isAdmin?: boolean;
}

export interface Conversation {
  id: string;
  userId: string;
  lastMessageId: string;
  status: 'open' | 'closed' | 'waiting';
  createdAt: string;
  updatedAt: string;
  tags?: string[];
}

export interface AppState {
  users: User[];
  conversations: Conversation[];
  messages: Message[];
  selectedConversationId: string | null;
  activeTab: 'open' | 'waiting';
  detailsTab: 'ai' | 'details';
}