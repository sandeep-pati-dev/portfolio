import ProjectsClient from './ProjectsClient';

export const metadata = {
  title: "Projects Gallery | Software Applications by Sandeep Pati",
  description: "Explore a showcase of software applications, Java applications, and web architectures engineered by Sandeep Pati using Java and the MERN stack.",
  keywords: [
    "Sandeep Pati Projects", "Software Project Showcase", "Java Applications", "MERN Stack Applications",
    "Web Development Portfolio Gallery", "React.js Open Source Code", "Node.js REST API Examples"
  ],
  authors: [{ name: "Sandeep Pati", url: "https://sandeep-pati.vercel.app/projects" }],
  creator: "Sandeep Pati",
  alternates: {
    canonical: "https://sandeep-pati.vercel.app/projects",
  },
  openGraph: {
    title: "Sandeep Pati Project Gallery | Software & Web Apps",
    description: "Review a diverse collection of software applications, backend services, and clean Java engines built by Sandeep Pati.",
    url: "https://sandeep-pati.vercel.app/projects",
    siteName: "Sandeep Pati Portfolio",
    images: [{ url: "/opengraph-projects.png", width: 1200, height: 630, alt: "Sandeep Pati Software Projects Showcase" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sandeep Pati | Projects Gallery",
    description: "Inspect code architectures, database designs, and developer workflows built using Java and MERN stack frameworks.",
    images: ["/opengraph-projects.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function ProjectsPage() {
  // Injecting custom CollectionPage Schema optimized for portfolio galleries
  const projectsJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Sandeep Pati Software Development Projects Portfolio",
    "description": "A curated collection of software engineering work and technical applications built by Sandeep Pati.",
    "url": "https://sandeep-pati.vercel.app/projects",
    "about": {
      "@type": "Person",
      "name": "Sandeep Pati",
      "sameAs": [
        "https://github.com/sandeep-pati-dev",
        "https://linkedin.com/in/sandeep-pati-537ba030b"
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsJsonLd) }}
      />
      <ProjectsClient />
    </>
  );
}
