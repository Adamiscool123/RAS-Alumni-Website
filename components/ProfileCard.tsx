
import React from 'react';
import { User } from '../types';
import { MapPin, GraduationCap } from 'lucide-react';

interface ProfileCardProps {
  user: User;             // The user data to display
  onClick: () => void;    // Function to call when the card is clicked
}

// This component renders a single user card in the Directory grid
export default function ProfileCard({ user, onClick }: ProfileCardProps) {
  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer"
      onClick={onClick}
    >
      {/* Card Header Gradient */}
      <div className="h-24 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
      
      <div className="px-6 pb-6">
        {/* Profile Picture (Overlapping the gradient) */}
        <div className="relative -top-10 mb-[-30px]">
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="w-20 h-20 rounded-full border-4 border-white dark:border-gray-800 object-cover shadow-md bg-white dark:bg-gray-700"
          />
        </div>
        
        {/* Content Section */}
        <div className="mt-10">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">{user.name}</h3>
          <p className="text-indigo-600 dark:text-indigo-400 text-sm font-medium truncate">{user.occupation}</p>
          
          {/* Metadata: School & Location */}
          <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              <GraduationCap className="h-4 w-4 mr-2 text-gray-400 dark:text-gray-500" />
              {/* Show last 2 digits of year */}
              <span className="truncate">{user.school} '{user.graduationYear.toString().slice(-2)}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-gray-400 dark:text-gray-500" />
              <span className="truncate">{user.location}</span>
            </div>
          </div>
          
          {/* Bio Preview (Limited to 2 lines) */}
          <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm line-clamp-2 h-10">
            {user.bio}
          </p>

          {/* Skills Tags (Shows up to 2, then a counter) */}
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex flex-wrap gap-2">
            {user.skills.slice(0, 2).map((skill) => (
              <span key={skill} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                {skill}
              </span>
            ))}
            {user.skills.length > 2 && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                +{user.skills.length - 2}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
