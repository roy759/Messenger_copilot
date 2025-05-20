import React from 'react';
import { User, Conversation } from '../../types';
import { Mail, Globe, Clock, Tag, ExternalLink } from 'lucide-react';

interface CustomerDetailsProps {
  user: User;
  conversation: Conversation;
}

const CustomerDetails: React.FC<CustomerDetailsProps> = ({ user, conversation }) => {
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Customer Profile */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center mb-4">
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="h-16 w-16 rounded-full object-cover mr-4"
          />
          <div>
            <h3 className="font-medium text-gray-900 text-lg">{user.name}</h3>
            {user.company && (
              <p className="text-gray-500 text-sm">{user.company}</p>
            )}
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center text-sm">
            <Mail className="h-4 w-4 text-gray-400 mr-2" />
            <span className="text-gray-600">{user.email}</span>
          </div>
          
          {user.source && (
            <div className="flex items-center text-sm">
              <Globe className="h-4 w-4 text-gray-400 mr-2" />
              <span className="text-gray-600">Source: {user.source}</span>
            </div>
          )}
          
          {user.lastActive && (
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 text-gray-400 mr-2" />
              <span className="text-gray-600">Last seen: {user.lastActive}</span>
            </div>
          )}
        </div>
        
        <button className="mt-4 w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm transition flex items-center justify-center">
          <ExternalLink className="h-4 w-4 mr-2" />
          View full profile
        </button>
      </div>
      
      {/* Conversation Details */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-3">Conversation Details</h4>
        
        <div className="space-y-3">
          <div className="flex items-start">
            <Clock className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
            <div>
              <p className="text-sm text-gray-500">Created</p>
              <p className="text-sm text-gray-700">{formatDate(conversation.createdAt)}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Clock className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
            <div>
              <p className="text-sm text-gray-500">Last updated</p>
              <p className="text-sm text-gray-700">{formatDate(conversation.updatedAt)}</p>
            </div>
          </div>
          
          {conversation.tags && conversation.tags.length > 0 && (
            <div className="flex items-start">
              <Tag className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Tags</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {conversation.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Previous Conversations */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-3">Recent Activity</h4>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">Last contact</span>
            <span className="text-sm font-medium">{user.lastActive}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">Open conversations</span>
            <span className="text-sm font-medium">1</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-600">Total conversations</span>
            <span className="text-sm font-medium">3</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;