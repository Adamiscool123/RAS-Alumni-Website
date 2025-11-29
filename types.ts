
// ==========================================
// DATA MODELS & TYPE DEFINITIONS
// ==========================================
// This file defines the shape of the data used throughout the application.
// Using TypeScript interfaces ensures we know exactly what properties
// objects like Users, Messages, and Announcements have.

export interface User {
  id: string;              // Unique identifier for the user
  name: string;            // Full name
  email: string;           // Email address
  phone?: string;          // Optional phone number
  school: string;          // Name of the school they attended
  graduationYear: number;  // Year they graduated
  occupation: string;      // Current job title or "Student"
  bio: string;             // Short biography or "About Me"
  avatar: string;          // URL to their profile picture
  location: string;        // City, Country
  skills: string[];        // Array of skills (e.g., ["React", "Design"])
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: number;
}

export interface ChatSession {
  participantId: string;
  lastMessage: string;
  lastMessageTime: number;
  unreadCount: number;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;            // ISO date string (YYYY-MM-DD)
  author: string;          // Name of the person who posted it
  category: 'General' | 'Event' | 'News'; // Restricted to these 3 types
}

// Enum for navigation states
// This helps us switch between pages in App.tsx without using a complex router
export enum ViewState {
  HOME = 'HOME',
  DIRECTORY = 'DIRECTORY',
  PROFILE = 'PROFILE',
  MESSAGES = 'MESSAGES',
  EDIT_PROFILE = 'EDIT_PROFILE',
  ANNOUNCEMENTS = 'ANNOUNCEMENTS'
}
