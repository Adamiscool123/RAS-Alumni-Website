
import { GoogleGenAI } from "@google/genai";

// ==========================================
// GEMINI AI SERVICE configuration
// ==========================================
// This file handles all interactions with the Google Gemini API.
// It isolates the AI logic so components don't need to know how to call the API.

// Initialize the AI client with the API key from environment variables
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a professional bio based on rough input.
 * Used in the EditProfile page.
 * 
 * @param currentBio - The user's current (potentially rough) bio draft
 * @param occupation - The user's job title
 * @param school - The school the user attended
 * @returns A polished string version of the bio
 */
export const generateBio = async (
  currentBio: string,
  occupation: string,
  school: string
): Promise<string> => {
  try {
    // Construct a specific prompt telling the AI to act as a career consultant
    const prompt = `
      You are a professional career consultant.
      Rewrite the following rough bio for an alumni profile on a professional networking site.
      The person went to ${school} and works as a ${occupation}.
      Keep it concise, professional, yet approachable (under 100 words).

      Current Draft: "${currentBio}"
    `;

    // Call the Gemini Flash model (fast and efficient for text tasks)
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    // Return the generated text, or the original bio if something returns empty
    return response.text || currentBio;
  } catch (error) {
    console.error("Gemini Bio Gen Error:", error);
    // In case of error (e.g. network issue), just return the original text so data isn't lost
    return currentBio;
  }
};

/**
 * Generates conversation starters (icebreakers) to help users connect.
 * Used in the ProfileView page.
 * 
 * @returns An array of 3 string messages
 */
export const generateIcebreakers = async (
  myOccupation: string,
  theirName: string,
  theirOccupation: string,
  theirSchool: string
): Promise<string[]> => {
  try {
    // We ask for JSON output specifically to get a clean array of strings
    const prompt = `
      I am a ${myOccupation}. I want to send a message to ${theirName}, who is a ${theirOccupation} and went to ${theirSchool}.
      Generate 3 distinct, friendly, and professional icebreaker messages I could send to start a conversation.
      Return ONLY the messages as a JSON array of strings.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json" // Forces the model to return valid JSON
      }
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text); // Convert JSON string to JavaScript Array
  } catch (error) {
    console.error("Gemini Icebreaker Error:", error);
    // Fallback messages if the AI fails
    return ["Hi! I noticed we went to the same school system.", "Hello, I'd love to connect regarding your work.", "Hi there!"];
  }
};

/**
 * Generates a draft for a school announcement.
 * Used in the Announcements page.
 * 
 * @param topic - The user's rough idea (e.g., "Bake sale on Friday")
 * @param audience - Who the announcement is for
 * @returns Object containing a Title and Content body
 */
export const generateAnnouncement = async (
  topic: string,
  audience: string = "Alumni and Students"
): Promise<{ title: string; content: string }> => {
  try {
    const prompt = `
      You are the communications director for an international school alumni network.
      Write a professional yet engaging announcement based on the following topic: "${topic}".
      The audience is: ${audience}.
      
      Return the result as a JSON object with two keys:
      "title": A catchy headline.
      "content": The body of the announcement (approx 3-5 sentences).
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response text");
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Announcement Error:", error);
    // Fallback if AI fails
    return { title: "New Announcement", content: topic };
  }
};
