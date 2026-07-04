"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { usePageVisibility } from "@/hooks/use-page-visibility";
import { getPageKeyByRoute } from "@/lib/page-registry";
import { Loader2 } from "lucide-react";

/**
 * Wraps public page content to redirect users away from hidden pages.
 *
 * If the current route corresponds to a page whose visibility is disabled in
 * the CMS Page Config, the user is redirected to the home page. This ensures
 * hidden pages cannot be accessed directly even if someone knows the URL.
 */
export function PageVisibilityGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isVisible } = usePageVisibility();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const pageKey = getPageKeyByRoute(pathname);
    if (pageKey && !isVisible(pageKey)) {
      router.replace("/");
      return;
    }
    setChecking(false);
  }, [pathname, isVisible, router]);

  // Show a brief loader while the page-config fetch resolves on first load.
  // Once we know the page is visible, render children immediately.
  if (checking) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return <>{children}</>;
}
