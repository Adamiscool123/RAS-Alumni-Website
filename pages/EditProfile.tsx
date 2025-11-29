
import React, { useState } from 'react';
import { User } from '../types';
import { Camera, Save, Sparkles } from 'lucide-react';
import { generateBio } from '../services/geminiService';

interface EditProfileProps {
  user: User;                       // Current user data
  onSave: (updatedUser: User) => void; // Function to save changes back to App.tsx
}

export default function EditProfile({ user, onSave }: EditProfileProps) {
  // Form State: initialized with current user data
  const [formData, setFormData] = useState<User>(user);
  const [isGenerating, setIsGenerating] = useState(false);

  // Standard input handler for text fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handler for uploading a new profile picture
  // Creates a temporary URL for the uploaded file to display immediately
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        const url = URL.createObjectURL(e.target.files[0]);
        setFormData(prev => ({ ...prev, avatar: url }));
    }
  }

  // AI Feature: Calls Gemini to improve the bio
  const handleAIBio = async () => {
    if (!formData.bio || formData.bio.length < 10) {
      alert("Please write a rough draft first so the AI has something to work with!");
      return;
    }
    setIsGenerating(true);
    try {
      // Calls service to rewrite the bio
      const enhancedBio = await generateBio(formData.bio, formData.occupation, formData.school);
      // Updates the form with the new AI-generated text
      setFormData(prev => ({ ...prev, bio: enhancedBio }));
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Edit Your Profile</h1>
      
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6 space-y-6 transition-colors">
        
        {/* Photo Upload Section */}
        <div className="flex items-center space-x-6">
          <div className="shrink-0 relative">
            <img className="h-24 w-24 object-cover rounded-full border-2 border-gray-200 dark:border-gray-600" src={formData.avatar} alt="Profile" />
            <label htmlFor="photo-upload" className="absolute bottom-0 right-0 bg-white dark:bg-gray-700 rounded-full p-1.5 shadow border border-gray-200 dark:border-gray-600 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600">
                <Camera className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                <input id="photo-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            </label>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Profile Photo</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Update your photo so alumni recognize you.</p>
          </div>
        </div>

        {/* Personal Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email (Visible to Alumni)</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">School</label>
             <select
              name="school"
              value={formData.school}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
                <option value="Rabat American School">Rabat American School</option>
                <option value="Casablanca American School">Casablanca American School</option>
                <option value="American School of Tangier">American School of Tangier</option>
                <option value="Marrakech American School">Marrakech American School</option>
                <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Graduation Year</label>
            <input
              type="number"
              name="graduationYear"
              value={formData.graduationYear}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Occupation (Role at Company or "Student")</label>
            <input
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              placeholder="e.g. Software Engineer at Google"
              className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

           <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="City, Country"
              className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Bio Section with AI Button */}
          <div className="md:col-span-2">
            <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Bio</label>
                <button 
                    type="button"
                    onClick={handleAIBio}
                    disabled={isGenerating}
                    className="text-xs flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium disabled:opacity-50"
                >
                    <Sparkles className="w-3 h-3 mr-1" />
                    {isGenerating ? 'Enhancing...' : 'Enhance with AI'}
                </button>
            </div>
            <textarea
              name="bio"
              rows={4}
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us what you are doing now..."
              className="block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Tip: Write a rough draft and click 'Enhance with AI' to polish it.</p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
