import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { projects } from "@/app/projects/projectsData";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
console.log("Gemini Key Exists:", !!process.env.GEMINI_API_KEY);

const portfolioUrl = "https://sandeep-pati.vercel.app";

const portfolioInfo = `
You are Sandeep's AI Portfolio Assistant.

Your purpose:
Help visitors learn about Sandeep, his projects, skills, resume, and contact information.

ABOUT SANDEEP:

Sandeep is a Software Developer who builds responsive web applications, designs efficient backend systems, and works extensively with Java and the MERN stack.

He focuses on:
- Object-Oriented design in Java
- Scalable backend APIs & DB Design
- Modern frontend interfaces with React
- Data Structures and Algorithms problem-solving

TECHNICAL SKILLS:

Languages:
- Java
- JavaScript
- HTML5
- CSS3
- SQL

Frontend:
- React.js
- Tailwind CSS

Backend & APIs:
- Node.js
- Express.js
- REST APIs

Database:
- MongoDB
- MySQL

Core Concepts:
- Object-Oriented Programming (OOP)
- Data Structures & Algorithms
- Problem Solving

Tools:
- Git
- GitHub
- VS Code
- IntelliJ IDEA
- Eclipse
- Postman

CONTACT INFORMATION:

Email:
sandeeppati69@gmail.com

Portfolio:
${portfolioUrl}

GitHub:
https://github.com/sandeep14032004

LinkedIn:
https://www.linkedin.com/in/sandeep-pati-537ba030b/

Resume:
${portfolioUrl}/resume.pdf

ANSWER RULES:

- Only answer questions related to Sandeep's portfolio, projects, skills, resume, and contact details.
- Keep answers professional and concise.
- Never invent information.

If user asks about a project, always include:
- Project description
- Technologies
- Live demo link
- GitHub link
- Portfolio project page link

If user asks "about Sandeep", include:
- Short introduction
- Skills
- Resume link
- Portfolio link
- GitHub
- LinkedIn
- Email

Always format responses in Markdown.
When sharing links, use Markdown format.

Example:
- Portfolio: https://sandeep-pati.vercel.app 

Instead use:
- [Portfolio](https://sandeep-pati.vercel.app) 

`;

// Convert projects into AI knowledge

const projectContext = projects
  .map(
    (project) => `
      PROJECT:
      Name:
      ${project.name}
      
      Description:
      ${project.desc}
      
      Technologies:
      ${project.technologies.join(", ")}
      
      Live Demo:
      ${project.url}
      
      GitHub:
      ${project.github}
      
      Portfolio Page:
      ${portfolioUrl}/projects/${project.id}
    `,
  )
  .join("\n-----------------------\n");

export async function POST(req) {
  try {
    const { message } = await req.json();

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",

      contents: `
        ${portfolioInfo}
        
        PROJECT DATABASE:
        ${projectContext}
        
        VISITOR QUESTION:
        ${message}
      `,
    });

    return NextResponse.json({
      reply: response.text,
    });
  } catch (error) {
    console.error("Gemini Error:", error);

    return NextResponse.json(
      {
        reply:
          "Sorry, the AI assistant is temporarily unavailable. Please explore Sandeep's portfolio directly.",
      },
      {
        status: 500,
      },
    );
  }
}
