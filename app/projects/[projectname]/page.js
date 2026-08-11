import { notFound } from "next/navigation";
import ProjectnameClient from "./ProjectnameClient";
import { projects } from "../projectsData";

export async function generateMetadata({ params }) {
  const { projectname } = await params;

  const project = projects.find(
    (item) => item.id === projectname
  );

  if (!project) {
    return {
      title: "Project Not Found (404)",
    };
  }

  const url = `https://sandeep-pati.vercel.app/projects/${project.id}`;

  return {
    title: `${project.name}`,
    description: project.desc,

    keywords: [
      project.name,
      ...project.technologies,
      "Sandeep Pati",
      "MERN Stack",
      "Next.js",
      "Full Stack Developer",
    ],

    alternates: {
      canonical: url,
    },

    openGraph: {
      title: `${project.name} | Sandeep Pati`,
      description: project.desc,
      url,
      siteName: "Sandeep Pati Portfolio",
      images: [
        {
          url: `https://sandeep-pati.vercel.app${project.img}`,
          width: 1200,
          height: 630,
          alt: project.name,
        },
      ],
      type: "article",
    },

    twitter: {
      card: "summary_large_image",
      title: `${project.name} | Sandeep Pati`,
      description: project.desc,
      images: [`https://sandeep-pati.vercel.app${project.img}`],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}


export default async function ProjectPage({ params }) {
  const { projectname } = await params;

  const project = projects.find(
    (item) => item.id === projectname
  );

  if (!project) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.name,
    description: project.desc,
    codeRepository: project.github,
    url: project.url,
    image: `https://sandeep-pati.vercel.app${project.img}`,
    author: {
      "@type": "Person",
      name: "Sandeep Pati",
      url: "https://sandeep-pati.vercel.app",
    },
    programmingLanguage: project.technologies,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <ProjectnameClient project={project} />
    </>
  );
}