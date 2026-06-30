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
  Newspaper,
  Phone,
  type LucideIcon,
} from "lucide-react";

export type NavChild = {
  title: string;
  href: string;
  description?: string;
  icon?: LucideIcon;
};

export type NavItem = {
  title: string;
  href: string;
  children?: NavChild[];
};

export const siteNav: NavItem[] = [
  { title: "Home", href: "/" },
  {
    title: "About",
    href: "/about",
    children: [
      {
        title: "Our Story",
        href: "/about",
        description: "Mission, vision, values and the team behind Atom Foundation.",
        icon: BookOpen,
      },
      {
        title: "Annual Reports",
        href: "/about#reports",
        description: "Transparency reports and financial summaries.",
        icon: BarChart3,
      },
    ],
  },
  {
    title: "Programs",
    href: "/programs",
    children: [
      { title: "AI Training", href: "/programs#ai", description: "Prompt engineering, GenAI, ML basics.", icon: Sparkles },
      { title: "Software Development", href: "/programs#software", description: "Web, Python, Java, mobile apps.", icon: Code2 },
      { title: "Career Readiness", href: "/programs#career", description: "Resumes, aptitude, interviews.", icon: GraduationCap },
      { title: "Women Empowerment", href: "/programs#women", description: "Digital literacy & entrepreneurship.", icon: HeartHandshake },
      { title: "School Programs", href: "/programs#school", description: "Coding for kids, STEM, robotics.", icon: Users },
    ],
  },
  {
    title: "Impact",
    href: "/impact",
    children: [
      { title: "Impact Dashboard", href: "/impact", description: "Live statistics and regional reach.", icon: BarChart3 },
      { title: "SDGs We Support", href: "/sdgs", description: "Our commitment to UN Global Goals.", icon: Target },
      { title: "Success Stories", href: "/stories", description: "Real journeys of transformation.", icon: Sparkles },
      { title: "Gallery", href: "/gallery", description: "Photos from our programs & events.", icon: ImageIcon },
    ],
  },
  { title: "Events", href: "/events" },
  { title: "Blog", href: "/blog" },
  { title: "Contact", href: "/contact" },
];

export const footerNav: { title: string; links: NavChild[] }[] = [
  {
    title: "Organization",
    links: [
      { title: "About Us", href: "/about" },
      { title: "Our Team", href: "/about#team" },
      { title: "Annual Reports", href: "/about#reports" },
      { title: "Partners", href: "/partners" },
      { title: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Programs",
    links: [
      { title: "AI Training", href: "/programs#ai" },
      { title: "Software Development", href: "/programs#software" },
      { title: "Career Readiness", href: "/programs#career" },
      { title: "Women Empowerment", href: "/programs#women" },
      { title: "School Programs", href: "/programs#school" },
    ],
  },
  {
    title: "Get Involved",
    links: [
      { title: "Volunteer", href: "/volunteer" },
      { title: "Partner With Us", href: "/partners" },
      { title: "Events", href: "/events" },
      { title: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Impact",
    links: [
      { title: "Impact Dashboard", href: "/impact" },
      { title: "SDGs", href: "/sdgs" },
      { title: "Success Stories", href: "/stories" },
      { title: "Gallery", href: "/gallery" },
    ],
  },
];

export const socialLinks = [
  { name: "Twitter", href: "https://twitter.com", icon: "twitter" },
  { name: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
  { name: "Instagram", href: "https://instagram.com", icon: "instagram" },
  { name: "YouTube", href: "https://youtube.com", icon: "youtube" },
];
