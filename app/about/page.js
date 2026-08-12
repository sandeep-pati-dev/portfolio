import AboutClient from './AboutClient';

export const metadata = {
  title: "About Sandeep Pati | Software Developer",
  description: "Discover the professional background, core technical skills, and educational qualifications of Sandeep Pati. Specializing in Java, MERN applications, and database architectures.",
  keywords: [
    "About Sandeep Pati", "Sandeep Pati Education", "GIET University cs", "Java developer India",
    "Sandeep Pati Experience", "Web Developer Biography", "Software Engineering Profile"
  ],
  authors: [{ name: "Sandeep Pati", url: "https://sandeep-pati.vercel.app/about" }],
  creator: "Sandeep Pati",
  alternates: {
    canonical: "https://sandeep-pati.vercel.app/about",
  },
  openGraph: {
    title: "About Sandeep Pati | Software Developer Biography",
    description: "Learn about Sandeep Pati's background, technical competencies, and academic timeline at GIET University (Gunupur).",
    url: "https://sandeep-pati.vercel.app/about",
    siteName: "Sandeep Pati Portfolio",
    images: [{ url: "/opengraph-about.png", width: 1200, height: 630, alt: "About Sandeep Pati - Software Developer Technical Profile" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Sandeep Pati | Software Developer",
    description: "Explore the technical expertise and educational background of developer Sandeep Pati.",
    images: ["/opengraph-about.png"],
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

export default function AboutPage() {
  const profileJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": "Sandeep Pati",
      "url": "https://sandeep-pati.vercel.app/about",
      "jobTitle": "Software Developer",
      "nationality": "Indian",
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "GIET University (Gunupur)",
        "location": {
          "@type": "Place",
          "name": "Gunupur, Odisha, India"
        }
      },
      "knowsAbout": [
        "Java", "React.js", "Node.js", "Express.js", "MongoDB", "SQL",
        "REST API Design", "Object-Oriented Programming (OOP)", "Algorithms"
      ],
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }}
      />
      <AboutClient />
    </>
  );
}
