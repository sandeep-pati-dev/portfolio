import ContactClient from './ContactClient';

export const metadata = {
  title: "Contact Sandeep Pati | Hire Software Developer & Java Enthusiast",
  description: "Get in touch with Sandeep Pati for software engineering roles, Java development, backend API design, or collaboration inquiries. Available for remote work and relocation.",
  keywords: [
    "Contact Sandeep Pati", "Hire Software Developer", "Hire Java Developer India", "Sandeep Pati Email",
    "Remote Java Developer", "Software Engineer Jobs India", "Collaborate with Sandeep Pati"
  ],
  authors: [{ name: "Sandeep Pati", url: "https://sandeep-pati.vercel.app/contact" }],
  creator: "Sandeep Pati",
  alternates: {
    canonical: "https://sandeep-pati.vercel.app/contact",
  },
  openGraph: {
    title: "Contact Sandeep Pati | Collaboration & Job Inquiries",
    description: "Reach out to Sandeep Pati directly for consultations, software development collaborations, or job openings.",
    url: "https://sandeep-pati.vercel.app/contact",
    siteName: "Sandeep Pati Portfolio",
    images: [{ url: "/opengraph-contact.png", width: 1200, height: 630, alt: "Contact Sandeep Pati - Software Developer Channels" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Sandeep Pati | Software Developer",
    description: "Connect with developer Sandeep Pati for technical hiring, Java projects, and open-source contributions.",
    images: ["/opengraph-contact.png"],
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

export default function ContactPage() {
  // Injecting custom ContactPage Schema to structure your direct contact channels
  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "mainEntity": {
      "@type": "Person",
      "name": "Sandeep Pati",
      "url": "https://sandeep-pati.vercel.app",
      "email": "sandeeppati69@gmail.com",
      "jobTitle": "Software Developer",
      "sameAs": [
        "https://github.com/sandeep14032004",
        "https://linkedin.com/in/sandeep-pati-537ba030b"
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <ContactClient />
    </>
  );
}
