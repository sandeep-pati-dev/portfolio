import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import ThemeWrapper from "@/components/ThemeWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  // 1. Tells Next.js to auto-resolve relative images/paths across all routes
  metadataBase: new URL("https://sandeep-pati.vercel.app"),

  // 2. Fallback title structure for unexpected new sub-routes
  title: {
    default: "Sandeep Pati | Software Developer & Java Enthusiast",
    template: "%s | Sandeep Pati",
  },

  description:
    "Portfolio of Sandeep Pati, a Software Developer skilled in Java, SQL, React.js, Node.js, and backend engineering. Open to opportunities, collaborations, and software roles.",

  authors: [{ name: "Sandeep Pati", url: "https://sandeep-pati.vercel.app" }],
  creator: "Sandeep Pati",

  // 3. Excellent search crawler instructions for rich visual results
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/mypic.jpeg",
  },

  // 4. Global open-graph structural definitions
  openGraph: {
    siteName: "Sandeep Pati Portfolio",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
  },
};



export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          {/* Move all client logic into ThemeWrapper */}
          <ThemeWrapper>{children}</ThemeWrapper>
        </ThemeProvider>

      </body>
    </html>
  );
}
