import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { PERSONAL_INFO } from "@/lib/data";
import { ThemeProvider } from "@/components/ThemeProvider";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: `${PERSONAL_INFO.name} — Frontend Developer & Track Architect`,
  description: PERSONAL_INFO.bio,
  keywords: ["Frontend Developer", "React", "Next.js", "Full Stack Developer", "Jinesh Dabhi", "Navsari", "WorkoutWala", "Split Second Portfolio"],
  authors: [{ name: PERSONAL_INFO.name, url: PERSONAL_INFO.socials.github }],
  openGraph: {
    title: `${PERSONAL_INFO.name} — Split Second Portfolio`,
    description: PERSONAL_INFO.bio,
    url: "https://jinesh-dabhi.com",
    siteName: "Jinesh Dabhi Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PERSONAL_INFO.name,
    jobTitle: PERSONAL_INFO.title,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Navsari",
      addressRegion: "Gujarat",
      addressCountry: "India"
    },
    email: PERSONAL_INFO.email,
    url: PERSONAL_INFO.socials.github,
    sameAs: [
      PERSONAL_INFO.socials.github,
      PERSONAL_INFO.socials.linkedin,
      PERSONAL_INFO.socials.upwork,
      PERSONAL_INFO.socials.instagram
    ]
  };

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="min-h-full flex flex-col bg-bg text-text-main font-sans selection:bg-electric selection:text-white dark:selection:text-black"
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

