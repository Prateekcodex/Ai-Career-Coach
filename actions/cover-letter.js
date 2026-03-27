"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function generateCoverLetter(data) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    if (!process.env.GEMINI_API_KEY) {
      throw new Error("AI service not configured");
    }

    // Find the user in the database
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    const prompt = `
      Write a professional cover letter for a ${data.jobTitle} position at ${
      data.companyName
    }.
      
      About the candidate:
      - Industry: ${user.industry || 'Professional'}
      - Years of Experience: ${user.experience || 'N/A'}
      - Skills: ${user.skills?.join(", ") || 'Various professional skills'}
      - Professional Background: ${user.bio || 'Experienced professional'}
      
      Job Description:
      ${data.jobDescription}
      
      Requirements:
      1. Use a professional, enthusiastic tone
      2. Highlight relevant skills and experience
      3. Show understanding of the company's needs
      4. Keep it concise (max 400 words)
      5. Use proper business letter formatting in markdown
      6. Include specific examples of achievements
      7. Relate candidate's background to job requirements
      
      Format the letter in markdown.
    `;

    const result = await model.generateContent(prompt);
    const content = result.response.text().trim();

    const coverLetter = await db.coverLetter.create({
      data: {
        content,
        jobDescription: data.jobDescription,
        companyName: data.companyName,
        jobTitle: data.jobTitle,
        status: "completed",
        userId: user.id,
      },
    });

    return coverLetter;
  } catch (error) {
    console.error("Error generating cover letter:", error.message);
    throw new Error("Failed to generate cover letter");
  }
}

export async function getCoverLetters() {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    return await db.coverLetter.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.error("Error getting cover letters:", error);
    return [];
  }
}

export async function getCoverLetter(id) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    return await db.coverLetter.findUnique({
      where: {
        id,
        userId: user.id,
      },
    });
  } catch (error) {
    console.error("Error getting cover letter:", error);
    return null;
  }
}

export async function deleteCoverLetter(id) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    return await db.coverLetter.delete({
      where: {
        id,
        userId: user.id,
      },
    });
  } catch (error) {
    console.error("Error deleting cover letter:", error);
    throw new Error("Failed to delete cover letter");
  }
}