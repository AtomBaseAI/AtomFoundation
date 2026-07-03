import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/site/theme-provider";
import { SiteNavbar } from "@/components/site/navbar";
import { SiteFooter } from "@/components/site/footer";
import { ChatbotWidget } from "@/components/site/chatbot-widget";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Atom Arc Foundation — Building Future-Ready Communities Through Technology & Education",
  description:
    "Atom Arc Foundation (Atom Academic Research & Collaboration Foundation) empowers students and women with future-ready technology skills through AI training, software development, career readiness and women empowerment programs.",
  keywords: [
    "Atom Arc Foundation",
    "Atom Academic Research & Collaboration Foundation",
    "AI training",
    "software development",
    "women empowerment",
    "digital education",
    "skill development",
    "CSR partnership",
    "non-profit India",
    "future-ready skills",
  ],
  authors: [{ name: "Atom Arc Foundation" }],
  openGraph: {
    title: "Atom Arc Foundation",
    description:
      "Empowering every student and woman with future-ready technology skills for sustainable careers and inclusive growth.",
    siteName: "Atom Arc Foundation",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Atom Arc Foundation",
    description:
      "Empowering every student and woman with future-ready technology skills for sustainable careers and inclusive growth.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${poppins.variable} font-inter antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <SiteNavbar />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
          <ChatbotWidget />
          <SonnerToaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
