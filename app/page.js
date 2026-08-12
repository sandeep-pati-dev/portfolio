import HomeClient from './HomeClient';

export const metadata = {
  title: "Sandeep Pati | Software Developer & Java Enthusiast Portfolio",
  description: "Portfolio of Sandeep Pati, a Software Developer specializing in Java, backend engineering, SQL, and the MERN stack. Explore database systems, object-oriented concepts, and software projects.",
  keywords: [
    "Sandeep Pati", "Software Developer", "Java Developer", "MERN Stack Engineer", 
    "React.js Developer", "Node.js Developer", "MongoDB Developer", "SQL Developer",
    "OOP Developer India", "GIET University CS", "Java Enthusiast"
  ],
  authors: [{ name: "Sandeep Pati", url: "https://sandeep-pati.vercel.app" }],
  creator: "Sandeep Pati",
  alternates: {
    canonical: "https://sandeep-pati.vercel.app",
  },
  openGraph: {
    title: "Sandeep Pati | Software Developer Portfolio",
    description: "Explore backend systems, clean OOP/Java architectures, and full-stack web applications built by Sandeep Pati.",
    url: "https://sandeep-pati.vercel.app",
    siteName: "Sandeep Pati Portfolio",
    images: [{ url: "/opengraph-home.png", width: 1200, height: 630, alt: "Sandeep Pati Software Developer Portfolio Home Screen" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sandeep Pati | Software Developer Portfolio",
    description: "Portfolio of Sandeep Pati showcasing software applications built with Java and the MERN stack.",
    images: ["/opengraph-home.png"],
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

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Sandeep Pati",
    "url": "https://sandeep-pati.vercel.app",
    "email": "sandeeppati69@gmail.com",
    "jobTitle": "Software Developer",
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "GIET University (Gunupur)"
    },
    "knowsAbout": ["Software Development", "Java Ecosystem", "MERN Stack", "Database Design", "Object-Oriented Programming (OOP)", "Data Structures & Algorithms", "SQL", "MongoDB", "JavaScript"],
    "sameAs": [
      "https://github.com/sandeep-pati-dev",
      "https://linkedin.com/in/sandeep-pati-537ba030b"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient />
    </>
  );
}
