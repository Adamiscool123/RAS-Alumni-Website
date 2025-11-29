
import React, { useState } from 'react';
import { User } from '../types';
import { MessageSquare, MapPin, Mail, Briefcase, GraduationCap, Sparkles } from 'lucide-react';
import { generateIcebreakers } from '../services/geminiService';

interface ProfileViewProps {
  user: User;                       // The profile we are looking at
  currentUser: User;                // The person looking at the profile
  onConnect: (userId: string) => void; // Action to start a chat
  onBack: () => void;               // Action to go back to Directory
}

export default function ProfileView({ user, currentUser, onConnect, onBack }: ProfileViewProps) {
  // State for AI Feature
  const [isGeneratingIcebreakers, setIsGeneratingIcebreakers] = useState(false);
  const [icebreakers, setIcebreakers] = useState<string[]>([]);

  // Calls the AI service to get conversation starters
  const handleGenerateIcebreakers = async () => {
    setIsGeneratingIcebreakers(true);
    try {
      const suggestions = await generateIcebreakers(
        currentUser.occupation,
        user.name,
        user.occupation,
        user.school
      );
      setIcebreakers(suggestions);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingIcebreakers(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button onClick={onBack} className="mb-4 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center transition-colors">
        ← Back to Directory
      </button>
      
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-colors">
        {/* Header Image */}
        <div className="h-48 bg-gradient-to-r from-indigo-600 to-blue-500"></div>
        <div className="px-8 pb-8">
          {/* Profile Picture & Action Buttons */}
          <div className="relative flex justify-between items-end -mt-16 mb-6">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-lg object-cover bg-white dark:bg-gray-700"
            />
            <div className="flex gap-3">
              <button 
                onClick={() => onConnect(user.id)}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Connect & Chat
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column: Main Info */}
            <div className="md:col-span-2">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
              <p className="text-xl text-indigo-600 dark:text-indigo-400 font-medium">{user.occupation}</p>
              
              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">About</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">{user.bio}</p>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">Experience & Education</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-lg mr-4">
                       <GraduationCap className="text-indigo-600 dark:text-indigo-400 w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{user.school}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Class of {user.graduationYear}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg mr-4">
                       <Briefcase className="text-blue-600 dark:text-blue-400 w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{user.occupation}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Details & AI Helper */}
            <div className="space-y-6">
              {/* Contact Info Box */}
              <div className="bg-gray-50 dark:bg-gray-900/50 p-5 rounded-xl border border-gray-100 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Contact Info</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center text-gray-600 dark:text-gray-400">
                    <Mail className="w-4 h-4 mr-3 text-gray-400 dark:text-gray-500" />
                    {user.email}
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4 mr-3 text-gray-400 dark:text-gray-500" />
                    {user.location}
                  </li>
                </ul>
              </div>

              {/* Skills Box */}
              <div className="bg-gray-50 dark:bg-gray-900/50 p-5 rounded-xl border border-gray-100 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map(skill => (
                    <span key={skill} className="px-3 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-sm text-gray-600 dark:text-gray-300">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Gemini AI Feature: Icebreaker Generator */}
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-5 rounded-xl border border-indigo-100 dark:border-indigo-800">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-indigo-900 dark:text-indigo-300 flex items-center">
                    <Sparkles className="w-4 h-4 mr-2 text-indigo-500" />
                    AI Helper
                  </h3>
                </div>
                <p className="text-xs text-indigo-700 dark:text-indigo-400 mb-4">
                  Not sure what to say? Generate conversation starters based on {user.name.split(' ')[0]}'s profile.
                </p>
                
                {!icebreakers.length ? (
                  <button 
                    onClick={handleGenerateIcebreakers}
                    disabled={isGeneratingIcebreakers}
                    className="w-full py-2 bg-white dark:bg-gray-800 border border-indigo-200 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400 rounded-lg text-sm font-medium hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                  >
                    {isGeneratingIcebreakers ? 'Generating...' : 'Suggest Icebreakers'}
                  </button>
                ) : (
                  <div className="space-y-2">
                    {icebreakers.map((msg, idx) => (
                      <div key={idx} className="bg-white dark:bg-gray-800 p-3 rounded border border-indigo-100 dark:border-indigo-900 text-xs text-gray-700 dark:text-gray-300 italic">
                        "{msg}"
                      </div>
                    ))}
                    <button 
                      onClick={() => setIcebreakers([])}
                      className="text-xs text-indigo-500 dark:text-indigo-400 underline mt-2 w-full text-center"
                    >
                      Clear
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
