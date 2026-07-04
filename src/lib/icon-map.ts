import {
  Sparkles,
  Code2,
  GraduationCap,
  HeartHandshake,
  Users,
  Brain,
  Bot,
  Cpu,
  Globe,
  BookOpen,
  Briefcase,
  Award,
  Laptop,
  ShieldCheck,
  Rocket,
  Target,
  Heart,
  Handshake,
  Building2,
  Scale,
  Lightbulb,
  TrendingUp,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";

/**
 * Maps a lucide icon name (stored in the database as a string) to the
 * corresponding React component. Used by client components to render icons
 * that come from dynamic database content.
 */
export const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  Code2,
  GraduationCap,
  HeartHandshake,
  Users,
  Brain,
  Bot,
  Cpu,
  Globe,
  BookOpen,
  Briefcase,
  Award,
  Laptop,
  ShieldCheck,
  Rocket,
  Target,
  Heart,
  Handshake,
  Building2,
  Scale,
  Lightbulb,
  TrendingUp,
};

export function getIcon(name: string | undefined | null): LucideIcon {
  if (!name) return HelpCircle;
  return iconMap[name] ?? HelpCircle;
}
