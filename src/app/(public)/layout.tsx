import { ThemeProvider } from "@/components/site/theme-provider";
import { SiteNavbar } from "@/components/site/navbar";
import { SiteFooter } from "@/components/site/footer";
import { ChatbotWidget } from "@/components/site/chatbot-widget";
import { PageVisibilityGuard } from "@/components/site/page-visibility-guard";

/**
 * Layout for the public-facing website route group.
 *
 * Renders the site navbar, footer, and chatbot widget around page content.
 * The PageVisibilityGuard redirects users away from pages hidden via the CMS.
 */
export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <div className="relative flex min-h-screen flex-col">
        <SiteNavbar />
        <main className="flex-1">
          <PageVisibilityGuard>{children}</PageVisibilityGuard>
        </main>
        <SiteFooter />
      </div>
      <ChatbotWidget />
    </ThemeProvider>
  );
}

