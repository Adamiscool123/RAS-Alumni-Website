
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Directory from './pages/Directory';
import ProfileView from './pages/ProfileView';
import EditProfile from './pages/EditProfile';
import Messages from './pages/Messages';
import Announcements from './pages/Announcements';
import { User, ViewState, Announcement } from './types';
import { MOCK_USERS, MY_PROFILE, MOCK_ANNOUNCEMENTS } from './data/mockData';
import { GraduationCap, Users, Globe, Megaphone } from 'lucide-react';

// ==========================================
// MAIN APPLICATION COMPONENT
// ==========================================
// This is the root component that manages the global state and determines which page to show.

export default function App() {
  // STATE MANAGEMENT
  // 'view' controls which page is currently visible (Home, Directory, etc.)
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  
  // Data states: initialized with mock data
  const [currentUser, setCurrentUser] = useState<User>(MY_PROFILE);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [announcements, setAnnouncements] = useState<Announcement[]>(MOCK_ANNOUNCEMENTS);
  
  // Navigation states
  const [selectedUser, setSelectedUser] = useState<User | null>(null); // Who are we looking at?
  const [activeChatId, setActiveChatId] = useState<string | null>(null); // Who are we chatting with?
  
  // Theme State: 'light' or 'dark'
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // EFFECT: Detect System Dark Mode Preference on Load
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  // EFFECT: Apply Dark Mode Class to HTML Element
  // This triggers Tailwind's 'dark:' classes throughout the app
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Function to toggle theme manually via Navbar
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // HANDLERS (Actions passed down to child components)

  // Clicked on a user card in Directory
  const handleUserSelect = (user: User) => {
    // If selecting self, go to edit profile
    if (user.id === currentUser.id) {
        setView(ViewState.EDIT_PROFILE);
        return;
    }
    setSelectedUser(user);
    setView(ViewState.PROFILE);
  };

  // Clicked "Connect" on a profile
  const handleConnect = (userId: string) => {
    setActiveChatId(userId);
    setView(ViewState.MESSAGES);
  };

  // Saved changes in EditProfile
  const handleProfileUpdate = (updatedUser: User) => {
    setCurrentUser(updatedUser);
    alert("Profile updated successfully!");
    setView(ViewState.HOME); 
  };

  // Posted a new Announcement
  const handleAddAnnouncement = (newAnnouncement: Announcement) => {
      setAnnouncements(prev => [newAnnouncement, ...prev]);
  }

  // ROUTING LOGIC
  // Determines which component to render based on 'view' state
  const renderContent = () => {
    switch (view) {
      case ViewState.HOME:
        return (
          // Landing Page Content
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
                    Connect with your <span className="text-indigo-600 dark:text-indigo-400">School Community</span>
                </h1>
                <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500 dark:text-gray-400">
                    The official alumni network for Rabat American School and international schools worldwide. Stay in touch, find mentorship, and grow your career.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <button onClick={() => setView(ViewState.DIRECTORY)} className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition shadow-md">
                        Find Classmates
                    </button>
                    <button onClick={() => setView(ViewState.EDIT_PROFILE)} className="px-8 py-3 bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 font-bold rounded-lg border border-indigo-200 dark:border-indigo-900 hover:bg-gray-50 dark:hover:bg-gray-700 transition shadow-sm">
                        Update Profile
                    </button>
                </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center transition-colors">
                    <div className="mx-auto h-12 w-12 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center mb-4">
                        <Users className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Directory</h3>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">Search through hundreds of alumni profiles by year, school, or profession.</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center transition-colors">
                    <div className="mx-auto h-12 w-12 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center mb-4">
                        <GraduationCap className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Mentorship</h3>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">Find mentors in your field or offer guidance to recent graduates.</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center transition-colors">
                    <div className="mx-auto h-12 w-12 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center mb-4">
                        <Globe className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Global Network</h3>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">From Rabat to New York, connect with alumni living in cities across the globe.</p>
                </div>
            </div>
            
            {/* Recently Joined Section */}
            <div className="border-t border-gray-200 dark:border-gray-800 pt-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Recently Joined</h2>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {users.slice(0, 4).map(user => (
                        <div key={user.id} onClick={() => handleUserSelect(user)} className="group cursor-pointer">
                            <div className="relative rounded-lg overflow-hidden aspect-w-1 aspect-h-1 mb-3">
                                <img src={user.avatar} alt={user.name} className="w-full h-64 object-cover group-hover:opacity-90 transition" />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                                    <p className="text-white font-bold">{user.name}</p>
                                    <p className="text-gray-200 text-xs">{user.occupation}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Latest Announcement Teaser */}
            {announcements.length > 0 && (
                <div className="mt-16 bg-indigo-900 rounded-2xl p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-indigo-500 rounded-full opacity-20 blur-3xl"></div>
                     <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
                        <div className="mb-6 md:mb-0">
                             <div className="flex items-center text-indigo-200 mb-2">
                                <Megaphone className="w-5 h-5 mr-2" />
                                <span className="text-sm font-bold tracking-wider uppercase">Latest Announcement</span>
                             </div>
                             <h3 className="text-2xl font-bold text-white mb-2">{announcements[0].title}</h3>
                             <p className="text-indigo-100 max-w-xl">{announcements[0].content.substring(0, 100)}...</p>
                        </div>
                        <button 
                            onClick={() => setView(ViewState.ANNOUNCEMENTS)}
                            className="px-6 py-3 bg-white text-indigo-900 font-bold rounded-lg hover:bg-indigo-50 transition shadow-lg whitespace-nowrap"
                        >
                            Read More
                        </button>
                     </div>
                </div>
            )}
          </div>
        );
      case ViewState.DIRECTORY:
        return <Directory users={users} onSelectUser={handleUserSelect} />;
      case ViewState.PROFILE:
        return selectedUser ? (
          <ProfileView 
            user={selectedUser} 
            currentUser={currentUser}
            onConnect={handleConnect}
            onBack={() => setView(ViewState.DIRECTORY)}
          />
        ) : <Directory users={users} onSelectUser={handleUserSelect} />;
      case ViewState.MESSAGES:
        return <Messages currentUser={currentUser} users={users} activeChatId={activeChatId} />;
      case ViewState.EDIT_PROFILE:
        return <EditProfile user={currentUser} onSave={handleProfileUpdate} />;
      case ViewState.ANNOUNCEMENTS:
        return <Announcements currentUser={currentUser} announcements={announcements} onAddAnnouncement={handleAddAnnouncement} />;
      default:
        return <div>Page not found</div>;
    }
  };

  // Render Structure
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <Navbar currentView={view} setView={setView} theme={theme} toggleTheme={toggleTheme} />
      <main>
        {renderContent()}
      </main>
    </div>
  );
}
