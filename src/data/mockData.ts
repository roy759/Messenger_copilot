import { AppState } from '../types';

export const initialState: AppState = {
  selectedConversationId: 'conv1',
  activeTab: 'open',
  detailsTab: 'ai',
  users: [
    {
      id: 'user1',
      name: 'Luis Easton',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
      company: 'GitHub',
      email: 'luis@github.com',
      source: 'Web',
      lastActive: '2 hours ago'
    },
    {
      id: 'user2',
      name: 'Sarah Miller',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      company: 'Stripe',
      email: 'sarah@stripe.com',
      source: 'iOS App',
      lastActive: '5 minutes ago'
    },
    {
      id: 'user3',
      name: 'James Wilson',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      company: 'Tesla',
      email: 'james@tesla.com',
      source: 'Android App',
      lastActive: '3 days ago'
    },
    {
      id: 'user4',
      name: 'Aisha Patel',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      company: 'Shopify',
      email: 'aisha@shopify.com',
      source: 'Web',
      lastActive: '1 hour ago'
    },
    {
      id: 'user5',
      name: 'Mark Johnson',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      company: 'Airbnb',
      email: 'mark@airbnb.com',
      source: 'Web',
      lastActive: '30 minutes ago'
    },
    {
      id: 'admin1',
      name: 'Support Team',
      avatar: 'https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg?auto=compress&cs=tinysrgb&w=150',
      email: 'support@company.com',
    }
  ],
  conversations: [
    {
      id: 'conv1',
      userId: 'user1',
      lastMessageId: 'msg5',
      status: 'open',
      createdAt: '2023-05-10T10:30:00Z',
      updatedAt: '2023-05-10T11:45:00Z',
      tags: ['GitHub', 'Billing']
    },
    {
      id: 'conv2',
      userId: 'user2',
      lastMessageId: 'msg7',
      status: 'open',
      createdAt: '2023-05-10T09:15:00Z',
      updatedAt: '2023-05-10T10:20:00Z',
      tags: ['Stripe', 'Technical']
    },
    {
      id: 'conv3',
      userId: 'user3',
      lastMessageId: 'msg9',
      status: 'open',
      createdAt: '2023-05-09T14:20:00Z',
      updatedAt: '2023-05-09T16:40:00Z',
      tags: ['Tesla', 'Account']
    },
    {
      id: 'conv4',
      userId: 'user4',
      lastMessageId: 'msg11',
      status: 'open',
      createdAt: '2023-05-08T11:10:00Z',
      updatedAt: '2023-05-08T13:30:00Z',
      tags: ['Shopify', 'Billing']
    },
    {
      id: 'conv5',
      userId: 'user5',
      lastMessageId: 'msg13',
      status: 'open',
      createdAt: '2023-05-07T08:45:00Z',
      updatedAt: '2023-05-07T09:50:00Z',
      tags: ['Airbnb', 'Feature Request']
    }
  ],
  messages: [
    {
      id: 'msg1',
      conversationId: 'conv1',
      senderId: 'user1',
      content: 'Hi there, I\'m having trouble with my subscription billing. Can you help me?',
      timestamp: '2023-05-10T10:30:00Z',
      seen: true
    },
    {
      id: 'msg2',
      conversationId: 'conv1',
      senderId: 'admin1',
      content: 'Hello Luis! I\'d be happy to help with your billing issue. Could you tell me more about what\'s happening?',
      timestamp: '2023-05-10T10:35:00Z',
      seen: true,
      isAdmin: true
    },
    {
      id: 'msg3',
      conversationId: 'conv1',
      senderId: 'user1',
      content: 'I was charged twice for the same month. I have two transactions on my statement from May 3rd.',
      timestamp: '2023-05-10T10:40:00Z',
      seen: true
    },
    {
      id: 'msg4',
      conversationId: 'conv1',
      senderId: 'admin1',
      content: 'I\'m sorry to hear that. Let me look into this for you right away. Can you confirm the last 4 digits of the card that was charged?',
      timestamp: '2023-05-10T10:45:00Z',
      seen: true,
      isAdmin: true
    },
    {
      id: 'msg5',
      conversationId: 'conv1',
      senderId: 'user1',
      content: 'Sure, it\'s 4982. Thanks for looking into this.',
      timestamp: '2023-05-10T11:00:00Z',
      seen: false
    },
    {
      id: 'msg6',
      conversationId: 'conv2',
      senderId: 'user2',
      content: 'Hello, I need help integrating your API with my Stripe account.',
      timestamp: '2023-05-10T09:15:00Z',
      seen: true
    },
    {
      id: 'msg7',
      conversationId: 'conv2',
      senderId: 'admin1',
      content: 'Hi Sarah, I\'d be happy to help with the Stripe API integration. What specific issue are you encountering?',
      timestamp: '2023-05-10T09:25:00Z',
      seen: false,
      isAdmin: true
    },
    {
      id: 'msg8',
      conversationId: 'conv3',
      senderId: 'user3',
      content: 'I\'m trying to reset my password but I\'m not receiving the reset email.',
      timestamp: '2023-05-09T14:20:00Z',
      seen: true
    },
    {
      id: 'msg9',
      conversationId: 'conv3',
      senderId: 'admin1',
      content: 'Hi James, I\'ll help you with the password reset. Let\'s verify your email address first to make sure we\'re sending to the correct one.',
      timestamp: '2023-05-09T14:30:00Z',
      seen: false,
      isAdmin: true
    },
    {
      id: 'msg10',
      conversationId: 'conv4',
      senderId: 'user4',
      content: 'Can I get a refund for my last purchase? The product wasn\'t what I expected.',
      timestamp: '2023-05-08T11:10:00Z',
      seen: true
    },
    {
      id: 'msg11',
      conversationId: 'conv4',
      senderId: 'admin1',
      content: 'Hello Aisha, I understand your concern. I\'d be happy to help with your refund request. Could you please provide your order number?',
      timestamp: '2023-05-08T11:20:00Z',
      seen: false,
      isAdmin: true
    },
    {
      id: 'msg12',
      conversationId: 'conv5',
      senderId: 'user5',
      content: 'I have a suggestion for improving your booking system. Would you be interested in hearing it?',
      timestamp: '2023-05-07T08:45:00Z',
      seen: true
    },
    {
      id: 'msg13',
      conversationId: 'conv5',
      senderId: 'admin1',
      content: 'Hi Mark, we always appreciate feedback from our users! Please share your suggestion, and I\'ll make sure it gets to our product team.',
      timestamp: '2023-05-07T09:00:00Z',
      seen: false,
      isAdmin: true
    }
  ]
};

// Helper function to format relative time (e.g., "45m ago")
export function formatRelativeTime(timestamp: string): string {
  const now = new Date();
  const date = new Date(timestamp);
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 1) return 'just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
}

// Helper function to get user by ID
export function getUserById(state: AppState, userId: string): User | undefined {
  return state.users.find(user => user.id === userId);
}

// Helper function to get conversation by ID
export function getConversationById(state: AppState, conversationId: string): Conversation | undefined {
  return state.conversations.find(conversation => conversation.id === conversationId);
}

// Helper function to get messages for a conversation
export function getMessagesByConversationId(state: AppState, conversationId: string): Message[] {
  return state.messages.filter(message => message.conversationId === conversationId);
}

// Helper function to get last message for a conversation
export function getLastMessageForConversation(state: AppState, conversationId: string): Message | undefined {
  const messages = getMessagesByConversationId(state, conversationId);
  return messages.length > 0 ? messages[messages.length - 1] : undefined;
}