
import React, { useState } from 'react';
import { User } from '../types';
import { Send } from 'lucide-react';

interface MessagesProps {
  currentUser: User;            // The user currently logged in
  users: User[];                // List of all users (to display in sidebar)
  activeChatId: string | null;  // ID of the user we want to chat with (from profile view)
}

interface SimpleMessage {
    id: string;
    text: string;
    isMe: boolean;
    time: string;
}

export default function Messages({ currentUser, users, activeChatId }: MessagesProps) {
  // State for which conversation is open
  const [selectedUserId, setSelectedUserId] = useState<string | null>(activeChatId);
  const [inputText, setInputText] = useState('');
  
  // Mock messages state - simulating a database of chats
  // In a real app, this would be fetched from a backend
  const [chats, setChats] = useState<Record<string, SimpleMessage[]>>({
    '1': [
        { id: 'm1', text: "Hi Sarah! I saw you work at Google now, that's amazing.", isMe: true, time: '10:00 AM' },
        { id: 'm2', text: "Hey Alex! Yes, it's been a wild ride since Rabat. How are you?", isMe: false, time: '10:05 AM' }
    ]
  });

  // Get the user object of the currently selected chat partner
  const activeUser = users.find(u => u.id === selectedUserId);
  
  // Filter out current user from list so you don't chat with yourself
  const chatUsers = users.filter(u => u.id !== currentUser.id);

  // Send Message Handler
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !selectedUserId) return;

    // Create new message object
    const newMessage: SimpleMessage = {
        id: Date.now().toString(),
        text: inputText,
        isMe: true,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Add message to the specific user's chat history
    setChats(prev => ({
        ...prev,
        [selectedUserId]: [...(prev[selectedUserId] || []), newMessage]
    }));
    setInputText('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 h-[calc(100vh-80px)]">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex h-full border border-gray-200 dark:border-gray-700 transition-colors">
        
        {/* Sidebar: List of Users */}
        <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white">Messages</h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            {chatUsers.map(user => (
              <div 
                key={user.id}
                onClick={() => setSelectedUserId(user.id)}
                className={`p-4 flex items-center cursor-pointer hover:bg-white dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-800 ${selectedUserId === user.id ? 'bg-white dark:bg-gray-700 border-l-4 border-l-indigo-600 shadow-sm' : ''}`}
              >
                <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover mr-3" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 dark:text-white truncate">{user.name}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.occupation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white dark:bg-gray-800">
            {activeUser ? (
                <>
                    {/* Chat Header */}
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between shadow-sm z-10 bg-white dark:bg-gray-800">
                        <div className="flex items-center">
                            <img src={activeUser.avatar} alt={activeUser.name} className="w-10 h-10 rounded-full object-cover mr-3" />
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-white">{activeUser.name}</h3>
                                <p className="text-xs text-green-500 flex items-center">● Active now</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Message List */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50 dark:bg-gray-900/50">
                        {(chats[activeUser.id] || []).map(msg => (
                            <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[70%] px-5 py-3 rounded-2xl shadow-sm text-sm ${msg.isMe ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-600 rounded-bl-none'}`}>
                                    <p>{msg.text}</p>
                                    <span className={`text-[10px] mt-1 block ${msg.isMe ? 'text-indigo-200' : 'text-gray-400 dark:text-gray-500'}`}>{msg.time}</span>
                                </div>
                            </div>
                        ))}
                         {(chats[activeUser.id] || []).length === 0 && (
                            <div className="text-center text-gray-400 mt-10">
                                <p>Start a conversation with {activeUser.name.split(' ')[0]}!</p>
                            </div>
                         )}
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSendMessage} className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2">
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                            />
                            <button type="submit" className="ml-2 p-2 bg-indigo-600 rounded-full text-white hover:bg-indigo-700 transition">
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </form>
                </>
            ) : (
                // Empty State (No chat selected)
                <div className="flex-1 flex flex-col items-center justify-center text-gray-400 dark:text-gray-600">
                    <Send className="w-16 h-16 mb-4 text-gray-200 dark:text-gray-700" />
                    <p>Select a chat to start messaging</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
