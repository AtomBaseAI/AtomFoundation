import {
  BookOpen,
  Users,
  BarChart3,
  Target,
  CalendarDays,
  Sparkles,
  Code2,
  GraduationCap,
  HeartHandshake,
  Image as ImageIcon,
  Building2,
  Phone,
  type LucideIcon,
} from "lucide-react";

export type NavChild = {
  title: string;
  href: string;
  description?: string;
  icon?: LucideIcon;
  /** Page-registry key used for visibility filtering. Omit = always visible. */
  pageKey?: string;
};

export type NavItem = {
  title: string;
  href: string;
  /** Page-registry key used for visibility filtering. Omit = always visible. */
  pageKey?: string;
  children?: NavChild[];
};

export const siteNav: NavItem[] = [
  { title: "Home", href: "/", pageKey: "home" },
  {
    title: "About",
    href: "/about",
    pageKey: "about",
    children: [
      {
        title: "Our Story",
        href: "/about",
        description: "Mission, vision, values and the team behind Atom Arc Foundation.",
        icon: BookOpen,
        pageKey: "about",
      },
      {
        title: "Annual Reports",
        href: "/about#reports",
        description: "Transparency reports and financial summaries.",
        icon: BarChart3,
        pageKey: "about",
      },
    ],
  },
  {
    title: "Programs",
    href: "/programs",
    pageKey: "programs",
    children: [
      { title: "AI Training", href: "/programs#ai", description: "Prompt engineering, GenAI, ML basics.", icon: Sparkles, pageKey: "programs" },
      { title: "Software Development", href: "/programs#software", description: "Web, Python, Java, mobile apps.", icon: Code2, pageKey: "programs" },
      { title: "Career Readiness", href: "/programs#career", description: "Resumes, aptitude, interviews.", icon: GraduationCap, pageKey: "programs" },
      { title: "Women Empowerment", href: "/programs#women", description: "Digital literacy & entrepreneurship.", icon: HeartHandshake, pageKey: "programs" },
      { title: "School Programs", href: "/programs#school", description: "Coding for kids, STEM, robotics.", icon: Users, pageKey: "programs" },
    ],
  },
  {
    title: "Impact",
    href: "/impact",
    pageKey: "impact",
    children: [
      { title: "Impact Dashboard", href: "/impact", description: "Live statistics and regional reach.", icon: BarChart3, pageKey: "impact" },
      { title: "SDGs We Support", href: "/sdgs", description: "Our commitment to UN Global Goals.", icon: Target, pageKey: "sdgs" },
      { title: "Success Stories", href: "/stories", description: "Real journeys of transformation.", icon: Sparkles, pageKey: "stories" },
      { title: "Gallery", href: "/gallery", description: "Photos from our programs & events.", icon: ImageIcon, pageKey: "gallery" },
    ],
  },
  { title: "Events", href: "/events", pageKey: "events" },
  { title: "Contact", href: "/contact", pageKey: "contact" },
];

export const footerNav: { title: string; links: NavChild[] }[] = [
  {
    title: "Organization",
    links: [
      { title: "About Us", href: "/about", pageKey: "about" },
      { title: "Our Team", href: "/about#team", pageKey: "about" },
      { title: "Annual Reports", href: "/about#reports", pageKey: "about" },
      { title: "Partners", href: "/partners", pageKey: "partners" },
    ],
  },
  {
    title: "Programs",
    links: [
      { title: "AI Training", href: "/programs#ai", pageKey: "programs" },
      { title: "Software Development", href: "/programs#software", pageKey: "programs" },
      { title: "Career Readiness", href: "/programs#career", pageKey: "programs" },
      { title: "Women Empowerment", href: "/programs#women", pageKey: "programs" },
      { title: "School Programs", href: "/programs#school", pageKey: "programs" },
    ],
  },
  {
    title: "Get Involved",
    links: [
      { title: "Volunteer", href: "/volunteer", pageKey: "volunteer" },
      { title: "Partner With Us", href: "/partners", pageKey: "partners" },
      { title: "Events", href: "/events", pageKey: "events" },
      { title: "Contact", href: "/contact", pageKey: "contact" },
    ],
  },
  {
    title: "Impact",
    links: [
      { title: "Impact Dashboard", href: "/impact", pageKey: "impact" },
      { title: "SDGs", href: "/sdgs", pageKey: "sdgs" },
      { title: "Success Stories", href: "/stories", pageKey: "stories" },
      { title: "Gallery", href: "/gallery", pageKey: "gallery" },
    ],
  },
];

export const socialLinks = [
  { name: "Twitter", href: "https://twitter.com", icon: "twitter" },
  { name: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
  { name: "Instagram", href: "https://instagram.com", icon: "instagram" },
  { name: "YouTube", href: "https://youtube.com", icon: "youtube" },
];
