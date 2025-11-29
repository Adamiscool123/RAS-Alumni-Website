
import React, { useState } from 'react';
import { User, Announcement } from '../types';
import { Calendar, User as UserIcon, Tag, Sparkles, Send, Plus } from 'lucide-react';
import { generateAnnouncement } from '../services/geminiService';

interface AnnouncementsProps {
  currentUser: User;
  announcements: Announcement[];
  onAddAnnouncement: (announcement: Announcement) => void; // Function to add new post to list
}

export default function Announcements({ currentUser, announcements, onAddAnnouncement }: AnnouncementsProps) {
  // Mock admin check - we check if ID is 'me'.
  // In a real app, this would check a 'role' property like 'admin' or 'moderator'
  const isAdmin = currentUser.id === 'me'; 
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Form State
  const [newPost, setNewPost] = useState({
    topic: '',
    title: '',
    content: '',
    category: 'General' as Announcement['category']
  });

  // AI Feature: Drafts the announcement based on a simple topic
  const handleAIDraft = async () => {
    if (!newPost.topic) {
        alert("Please enter a topic for the AI to draft about.");
        return;
    }
    setIsGenerating(true);
    try {
        // Call Gemini API to get title and content
        const draft = await generateAnnouncement(newPost.topic);
        setNewPost(prev => ({
            ...prev,
            title: draft.title,
            content: draft.content
        }));
    } catch (error) {
        console.error(error);
    } finally {
        setIsGenerating(false);
    }
  };

  // Submit the new announcement
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title || !newPost.content) return;

    const announcement: Announcement = {
        id: Date.now().toString(),
        title: newPost.title,
        content: newPost.content,
        date: new Date().toISOString().split('T')[0], // Today's date
        author: currentUser.name, // Or 'Admin'
        category: newPost.category
    };

    onAddAnnouncement(announcement);
    setIsFormOpen(false);
    setNewPost({ topic: '', title: '', content: '', category: 'General' }); // Reset form
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Announcements</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Latest news and updates from the school network.</p>
        </div>
        {/* Only Admins see the "Post Update" button */}
        {isAdmin && (
            <button 
                onClick={() => setIsFormOpen(!isFormOpen)}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-sm"
            >
                <Plus className="w-4 h-4 mr-2" />
                Post Update
            </button>
        )}
      </div>

      {/* Creation Form (Visible only when 'Post Update' clicked) */}
      {isAdmin && isFormOpen && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-8 transition-colors">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Create New Announcement</h2>
            
            {/* AI Assistant Section */}
            <div className="mb-4 bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800">
                <label className="block text-sm font-medium text-indigo-900 dark:text-indigo-300 mb-2">
                    <Sparkles className="w-4 h-4 inline mr-1" />
                    AI Assistant
                </label>
                <div className="flex gap-2">
                    <input 
                        type="text"
                        placeholder="e.g., Upcoming charity bake sale next Friday"
                        className="flex-1 px-3 py-2 border border-indigo-200 dark:border-indigo-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                        value={newPost.topic}
                        onChange={e => setNewPost({...newPost, topic: e.target.value})}
                    />
                    <button 
                        onClick={handleAIDraft}
                        disabled={isGenerating}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"
                    >
                        {isGenerating ? 'Drafting...' : 'Draft with AI'}
                    </button>
                </div>
            </div>

            {/* Manual Edit Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                        <input 
                            type="text" 
                            required
                            className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={newPost.title}
                            onChange={e => setNewPost({...newPost, title: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                        <select 
                            className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={newPost.category}
                            onChange={e => setNewPost({...newPost, category: e.target.value as Announcement['category']})}
                        >
                            <option value="General">General</option>
                            <option value="Event">Event</option>
                            <option value="News">News</option>
                        </select>
                    </div>
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Content</label>
                    <textarea 
                        required
                        rows={4}
                        className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={newPost.content}
                        onChange={e => setNewPost({...newPost, content: e.target.value})}
                    />
                </div>

                <div className="flex justify-end space-x-3 pt-2">
                    <button 
                        type="button"
                        onClick={() => setIsFormOpen(false)}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 flex items-center"
                    >
                        <Send className="w-4 h-4 mr-2" />
                        Post Announcement
                    </button>
                </div>
            </form>
        </div>
      )}

      {/* List of Announcements */}
      <div className="space-y-6">
        {announcements.map(item => (
            <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
                {/* Color-coded top bar based on category */}
                <div className={`h-2 w-full ${
                    item.category === 'Event' ? 'bg-pink-500' : 
                    item.category === 'News' ? 'bg-blue-500' : 'bg-indigo-500'
                }`}></div>
                <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                             item.category === 'Event' ? 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300' : 
                             item.category === 'News' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' : 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300'
                        }`}>
                            {item.category}
                        </span>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <Calendar className="w-3 h-3 mr-1" />
                            {item.date}
                        </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                        {item.content}
                    </p>
                    <div className="flex items-center pt-4 border-t border-gray-100 dark:border-gray-700">
                        <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-500 dark:text-gray-300">
                            <UserIcon className="w-4 h-4" />
                        </div>
                        <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">{item.author}</span>
                    </div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
}
