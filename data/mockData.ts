import { User, Announcement } from '../types';

export const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    email: 'sarah.j@example.com',
    school: 'Rabat American School',
    graduationYear: 2018,
    occupation: 'UX Designer at Google',
    bio: 'Passionate about user-centric design. graduated from RAS in 2018 and went on to study HCI. Happy to mentor students interested in tech.',
    avatar: 'https://picsum.photos/id/64/200/200',
    location: 'London, UK',
    skills: ['Design', 'Figma', 'React'],
  },
  {
    id: '2',
    name: 'Ahmed Bennani',
    email: 'ahmed.b@example.com',
    school: 'Rabat American School',
    graduationYear: 2020,
    occupation: 'Student at Stanford',
    bio: 'Currently pursuing a BS in Computer Science. Interested in AI and Robotics. Go Lions!',
    avatar: 'https://picsum.photos/id/91/200/200',
    location: 'Palo Alto, CA',
    skills: ['Python', 'Machine Learning', 'Robotics'],
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    email: 'elena.r@example.com',
    school: 'American School of Madrid',
    graduationYear: 2015,
    occupation: 'Architect',
    bio: 'Designing sustainable urban spaces. Love connecting with other international school alumni.',
    avatar: 'https://picsum.photos/id/129/200/200',
    location: 'Madrid, Spain',
    skills: ['Architecture', 'Sustainability', 'Urban Planning'],
  },
  {
    id: '4',
    name: 'Michael Chen',
    email: 'm.chen@example.com',
    school: 'Rabat American School',
    graduationYear: 2012,
    occupation: 'Entrepreneur',
    bio: 'Founded two startups in the fintech space. Looking for co-founders and chatty alumni.',
    avatar: 'https://picsum.photos/id/177/200/200',
    location: 'Dubai, UAE',
    skills: ['Business Strategy', 'Finance', 'Startups'],
  },
    {
    id: '5',
    name: 'Yasmine Alami',
    email: 'yasmine.a@example.com',
    school: 'Casablanca American School',
    graduationYear: 2019,
    occupation: 'Medical Student',
    bio: 'Future surgeon. Love traveling and meeting new people from the alumni network.',
    avatar: 'https://picsum.photos/id/342/200/200',
    location: 'Paris, France',
    skills: ['Medicine', 'Biology', 'Public Health'],
  }
];

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: '1',
    title: 'Annual Alumni Gala Dinner 2024',
    content: 'Join us for an evening of networking, nostalgia, and celebration at the Sofitel Jardin des Roses. Tickets are available now! All proceeds go towards the scholarship fund.',
    date: '2024-05-15',
    author: 'Alumni Association',
    category: 'Event'
  },
  {
    id: '2',
    title: 'New Mentorship Program Launch',
    content: 'We are excited to announce our new global mentorship program connecting recent graduates with established professionals. Sign up in the directory tab.',
    date: '2024-04-02',
    author: 'Career Center',
    category: 'News'
  },
  {
    id: '3',
    title: 'Campus Expansion Updates',
    content: 'The new Arts & Technology wing is finally open! Virtual tours will be available starting next week for all alumni.',
    date: '2024-03-20',
    author: 'School Administration',
    category: 'General'
  }
];

export const CURRENT_USER_ID = 'me';

export const MY_PROFILE: User = {
  id: 'me',
  name: 'Alex Smith',
  email: 'alex.smith@example.com',
  school: 'Rabat American School',
  graduationYear: 2021,
  occupation: 'Student',
  bio: 'Hey everyone! I just graduated and I am looking to connect with people in the film industry.',
  avatar: 'https://picsum.photos/id/433/200/200',
  location: 'New York, USA',
  skills: ['Video Editing', 'Photography'],
};