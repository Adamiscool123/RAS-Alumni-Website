
import React, { useState, useMemo } from 'react';
import { User } from '../types';
import ProfileCard from '../components/ProfileCard';
import { Search, Users } from 'lucide-react';

interface DirectoryProps {
  users: User[];                       // List of all users
  onSelectUser: (user: User) => void;  // Action when clicking a profile
}

export default function Directory({ users, onSelectUser }: DirectoryProps) {
  // State for search inputs and dropdowns
  const [searchTerm, setSearchTerm] = useState('');
  const [schoolFilter, setSchoolFilter] = useState('All');
  const [yearFilter, setYearFilter] = useState('All');

  // Extract unique values for the School filter dynamically from the user list
  // useMemo ensures this calculation only runs when the 'users' list changes
  const schools = useMemo(() => ['All', ...Array.from(new Set(users.map(u => u.school)))], [users]);
  
  // Static list of years for the dropdown
  const years = ['All', '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', 'Older'];

  // Filter Logic: Loops through all users and checks if they match ALL active filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.occupation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSchool = schoolFilter === 'All' || user.school === schoolFilter;
    const matchesYear = yearFilter === 'All' || 
                        (yearFilter === 'Older' ? user.graduationYear < 2018 : user.graduationYear.toString() === yearFilter);

    return matchesSearch && matchesSchool && matchesYear;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header and Filters Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Alumni Directory</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Reconnect with former classmates and expand your professional network.</p>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col md:flex-row gap-4 transition-colors">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
              placeholder="Search alumni by name or job..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Filter Dropdowns */}
          <div className="flex gap-4">
            <div className="relative min-w-[200px]">
              <select
                value={schoolFilter}
                onChange={(e) => setSchoolFilter(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {schools.map(school => (
                  <option key={school} value={school}>{school}</option>
                ))}
              </select>
            </div>
            
            <div className="relative min-w-[120px]">
               <select
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="All">Year</option>
                {years.filter(y => y !== 'All').map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <ProfileCard key={user.id} user={user} onClick={() => onSelectUser(user)} />
          ))
        ) : (
          // Empty State if no results found
          <div className="col-span-full text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No alumni found</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
