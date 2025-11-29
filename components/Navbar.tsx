
import React from 'react';
import { Home, Users, MessageSquare, User, Megaphone, Moon, Sun } from 'lucide-react';
import { ViewState } from '../types';

// Props passed from App.tsx to control navigation and theme
interface NavbarProps {
  currentView: ViewState;             // Which page is currently active?
  setView: (view: ViewState) => void; // Function to change the page
  theme: 'light' | 'dark';            // Current visual theme
  toggleTheme: () => void;            // Function to switch themes
}

export default function Navbar({ currentView, setView, theme, toggleTheme }: NavbarProps) {
  // Configuration for the main navigation links
  const navItems = [
    { view: ViewState.HOME, icon: Home, label: 'Home' },
    { view: ViewState.ANNOUNCEMENTS, icon: Megaphone, label: 'Announcements' },
    { view: ViewState.DIRECTORY, icon: Users, label: 'Directory' },
    { view: ViewState.MESSAGES, icon: MessageSquare, label: 'Messages' },
  ];

  return (
    // Sticky nav bar that stays at the top when scrolling
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Logo Section - Click to go Home */}
          <div className="flex items-center cursor-pointer" onClick={() => setView(ViewState.HOME)}>
            <div className="flex-shrink-0 flex items-center">
              <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-2">
                 <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="font-bold text-xl text-gray-900 dark:text-white">AlumNet</span>
            </div>
          </div>
          
          {/* Desktop Navigation Links (Hidden on mobile) */}
          <div className="hidden md:flex space-x-4 lg:space-x-8 items-center">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => setView(item.view)}
                // Conditional styling: If this item is active, make it indigo. If not, gray.
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                  currentView === item.view
                    ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/50 dark:text-indigo-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <item.icon className="h-5 w-5 mr-1.5" />
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Side: Theme Toggle and Profile Icon */}
          <div className="flex items-center space-x-4">
             {/* Theme Toggle Button */}
             <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>

            {/* User Profile Button - Goes to Edit Profile */}
            <button 
              onClick={() => setView(ViewState.EDIT_PROFILE)}
              className={`flex items-center p-2 rounded-full transition-colors ${
                currentView === ViewState.EDIT_PROFILE 
                ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400' 
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <User className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Bottom Navigation Bar (Visible only on small screens) */}
      <div className="md:hidden flex justify-around border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 py-2 transition-colors duration-200">
         {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => setView(item.view)}
                className={`flex flex-col items-center px-2 py-1 rounded-md text-xs font-medium ${
                  currentView === item.view
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                <item.icon className="h-6 w-6 mb-0.5" />
                <span className="scale-90">{item.label}</span>
              </button>
            ))}
            <button
                onClick={() => setView(ViewState.EDIT_PROFILE)}
                className={`flex flex-col items-center px-2 py-1 rounded-md text-xs font-medium ${
                  currentView === ViewState.EDIT_PROFILE
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                <User className="h-6 w-6 mb-0.5" />
                <span className="scale-90">Profile</span>
              </button>
      </div>
    </nav>
  );
}
