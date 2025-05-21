import React, { useState } from 'react';
import { User, Conversation } from '../../types';
import { Bot, ChevronRight, Zap, FileText, Wand2, MessageSquare, Ticket, Clock, Upload, Image } from 'lucide-react';

interface AICopilotProps {
  user: User;
  conversation: Conversation;
}

const AICopilot: React.FC<AICopilotProps> = ({ user, conversation }) => {
  const [question, setQuestion] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [responses, setResponses] = useState<string[]>([]);
  const [showSmartActions, setShowSmartActions] = useState(false);
  
  const suggestedQuestions = [
    "How do I get a refund?",
    "What's the status of my order?",
    "How can I help this customer?"
  ];
  
  const handleAskQuestion = (q: string) => {
    if (!q.trim()) return;
    
    setIsThinking(true);
    setQuestion('');
    
    setTimeout(() => {
      let response = '';
      
      if (q.toLowerCase().includes('refund')) {
        response = `Based on the conversation, this customer was charged twice for their subscription on May 3rd. According to our refund policy, they are eligible for a refund of the duplicate charge.

You should:
1. Verify the charge on their account
2. Process the refund for the duplicate charge
3. Send them confirmation once completed`;
      } else if (q.toLowerCase().includes('status') || q.toLowerCase().includes('order')) {
        response = `I don't see any specific order mentioned in this conversation. The customer is inquiring about a billing issue, not an order status.

Their main concern is being charged twice for their subscription.`;
      } else if (q.toLowerCase().includes('help')) {
        response = `To best help this customer:
1. Acknowledge their frustration about the double charge
2. Confirm the last 4 digits of the card they mentioned (4982)
3. Look up the transactions from May 3rd
4. Process a refund for the duplicate charge
5. Offer a small credit or discount as a goodwill gesture`;
      } else {
        response = `I've analyzed the conversation and this appears to be a billing issue where the customer was charged twice on May 3rd. 

I recommend verifying their payment history and processing a refund for the duplicate charge. Let the customer know the expected timeframe for the refund to appear on their statement.`;
      }
      
      setResponses([...responses, response]);
      setIsThinking(false);
    }, 1500);
  };

  const smartActions = [
    { icon: FileText, label: 'Write a note' },
    { icon: Wand2, label: 'Use macro' },
    { icon: MessageSquare, label: 'Summarize conversation' },
    { icon: Ticket, label: 'Create back-office ticket' },
    { icon: Clock, label: 'Snooze' },
    { icon: Upload, label: 'Upload attachment' },
    { icon: Image, label: 'Insert GIF' },
  ];

  return (
    <div className="bg-gradient-to-br from-[#d8b4fe] via-[#a5b4fc] to-[#fbcfe8] p-10 rounded-xl shadow-sm space-y-6">
      {/* AI Copilot Header Card */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
        <div className="flex items-center mb-3">
          <div className="p-2 bg-blue-100 rounded-full mr-3">
            <Bot className="h-5 w-5 text-blue-600" />
          </div>
          <h3 className="font-medium text-blue-800">Hi, I'm Fin AI Copilot</h3>
        </div>
        <p className="text-sm text-gray-600 mb-3">
          I can help answer questions about this conversation and suggest actions.
        </p>
        
        {/* AI Smart Actions Button */}
        <button
          onClick={() => setShowSmartActions(!showSmartActions)}
          className="w-full mt-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
        >
          <Zap className="h-4 w-4" />
          <span>AI Smart Actions</span>
        </button>

        {/* Smart Actions Dropdown */}
        {showSmartActions && (
          <div className="absolute mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden backdrop-blur-sm bg-white/90">
            {smartActions.map((action, index) => (
              <button
                key={index}
                className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-gray-50 transition-colors"
              >
                <action.icon className="h-5 w-5 text-purple-600" />
                <span className="text-gray-700">{action.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      
      {/* Suggested Questions */}
      {responses.length === 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Suggested questions
          </h4>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((q, index) => (
              <button
                key={index}
                className="bg-white border border-gray-200 px-3 py-1.5 rounded-full text-sm text-gray-600 hover:bg-gray-50 transition"
                onClick={() => handleAskQuestion(q)}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Responses */}
      {responses.length > 0 && (
        <div className="space-y-4 max-h-[400px] overflow-y-auto bg-gradient-to-br from-[#e5e9f0] via-[#d7dcef] to-[#c3c8e6] p-4 rounded-xl shadow-sm">
          {responses.map((response, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-start">
                <div className="p-1.5 bg-blue-100 rounded-full mr-3 mt-0.5">
                  <Bot className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-800 whitespace-pre-line">
                    {response.split('\n').map((line, i) => (
                      <p key={i} className={i > 0 ? 'mt-2' : ''}>{line}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Input */}
      <div className="mt-auto">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleAskQuestion(question);
          }}
          className="relative z-20"
        >
          <input
            type="text"
            placeholder="Ask a question..."
            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            disabled={isThinking}
          />
          <button
            type="submit"
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full ${
              question && !isThinking 
                ? 'text-blue-500 hover:bg-blue-50' 
                : 'text-gray-400 cursor-not-allowed'
            }`}
            disabled={!question || isThinking}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </form>
        
        {isThinking && (
          <div className="mt-3 text-sm text-gray-500 flex items-center">
            <div className="mr-2 flex space-x-1">
              <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
            </div>
            Thinking...
          </div>
        )}
      </div>
    </div>
  );
};

export default AICopilot;