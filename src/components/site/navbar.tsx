"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Atom,
  Menu,
  X,
  Moon,
  Sun,
  ChevronDown,
  Users,
} from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { siteNav, type NavItem } from "@/lib/nav";
import { usePageVisibility } from "@/hooks/use-page-visibility";

export function SiteNavbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { isVisible, filterNav } = usePageVisibility();
  const [mounted, setMounted] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const navItems = filterNav(siteNav);

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "glass border-b border-border/60 shadow-soft"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:h-20">
        <Link href="/" className="group flex items-center gap-2.5" aria-label="Atom Arc Foundation home">
          <motion.span
            initial={{ rotate: -20, scale: 0.8 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="relative grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand text-white shadow-glow-blue"
          >
            <Atom className="h-5 w-5" />
            <motion.span
              className="absolute inset-0 rounded-xl ring-2 ring-white/40"
              animate={{ scale: [1, 1.25], opacity: [0.6, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
            />
          </motion.span>
          <span className="flex flex-col leading-none">
            <span className="font-poppins text-lg font-700 tracking-tight">
              Atom<span className="text-gradient-brand"> Arc Foundation</span>
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Tech · Education · Impact
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {navItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                {item.children ? (
                  <>
                    <NavigationMenuTrigger
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent data-[state=open]:bg-accent",
                        item.children.some((c) => isActive(c.href)) && "text-primary"
                      )}
                    >
                      {item.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[420px] gap-1 p-3 md:w-[520px] md:grid-cols-2">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={child.href}
                                className={cn(
                                  "block rounded-lg p-3 transition-colors hover:bg-accent",
                                  isActive(child.href) && "bg-accent"
                                )}
                              >
                                <div className="flex items-center gap-2 text-sm font-semibold">
                                  {child.icon && <child.icon className="h-4 w-4 text-primary" />}
                                  {child.title}
                                </div>
                                {child.description && (
                                  <p className="mt-0.5 text-xs text-muted-foreground">
                                    {child.description}
                                  </p>
                                )}
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <NavigationMenuLink asChild
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent",
                      isActive(item.href) && "text-primary"
                    )}
                  >
                    <Link href={item.href}>{item.title}</Link>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="hidden sm:inline-flex"
          >
            {mounted && theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          {isVisible("volunteer") && (
            <Button asChild size="sm" className="hidden sm:inline-flex bg-gradient-brand">
              <Link href="/volunteer">
                <Users className="mr-1.5 h-4 w-4" /> Get Involved
              </Link>
            </Button>
          )}

          {/* Mobile */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] overflow-y-auto p-0">
              <SheetHeader className="px-5 pt-5">
                <SheetTitle className="flex items-center gap-2 text-left">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-brand text-white">
                    <Atom className="h-5 w-5" />
                  </span>
                  <span className="font-poppins font-700">Atom Arc Foundation</span>
                </SheetTitle>
              </SheetHeader>
              <div className="px-3 pb-28 pt-2">
                <MobileNavGroup pathname={pathname} navItems={navItems} onNavigate={() => setMobileOpen(false)} />
                {isVisible("volunteer") && (
                  <div className="mt-4 grid gap-2 px-2">
                    <Button asChild className="bg-gradient-brand" onClick={() => setMobileOpen(false)}>
                      <Link href="/volunteer">
                        <Users className="mr-2 h-4 w-4" /> Become a Volunteer
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function MobileNavGroup({
  pathname,
  navItems,
  onNavigate,
}: {
  pathname: string;
  navItems: NavItem[];
  onNavigate: () => void;
}) {
  const [openSections, setOpenSections] = React.useState<Record<string, boolean>>({});
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="flex flex-col">
      {navItems.map((item) => {
        const hasChildren = !!item.children?.length;
        const open = openSections[item.href];
        return (
          <div key={item.href} className="border-b border-border/60">
            {hasChildren ? (
              <button
                className="flex w-full items-center justify-between px-2 py-3 text-left text-sm font-medium"
                onClick={() =>
                  setOpenSections((s) => ({ ...s, [item.href]: !s[item.href] }))
                }
              >
                {item.title}
                <ChevronDown
                  className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
                />
              </button>
            ) : (
              <Link
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  "block px-2 py-3 text-sm font-medium",
                  isActive(item.href) ? "text-primary" : "text-foreground"
                )}
              >
                {item.title}
              </Link>
            )}
            {hasChildren && (
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    {item.children!.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={onNavigate}
                        className={cn(
                          "flex items-center gap-2 px-4 py-2.5 text-sm",
                          isActive(child.href)
                            ? "text-primary"
                            : "text-muted-foreground"
                        )}
                      >
                        {child.icon && <child.icon className="h-4 w-4" />}
                        {child.title}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        );
      })}
    </nav>
  );
}
