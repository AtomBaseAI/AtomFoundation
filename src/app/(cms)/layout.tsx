import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/site/theme-provider";

/**
 * Layout for the CMS route group.
 *
 * Deliberately does NOT render the site navbar, footer, or chatbot widget —
 * the CMS is a standalone admin interface. It keeps the ThemeProvider and
 * Sonner toaster so toasts still work.
 */
export default function CmsLayout({
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
      {children}
      <SonnerToaster richColors position="top-center" />
    </ThemeProvider>
  );
}
