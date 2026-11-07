// Maps the icon names used in content.ts to lucide-react components.
// To use a new icon: import it here and add it to the map.
import {
  Brain, Check, Clapperboard, Workflow, Code2, Cpu, Facebook, Gauge, Github, Globe, LayoutTemplate, LifeBuoy,
  Linkedin, Mail, MessageCircle, MonitorSmartphone, PenTool, Phone, Rocket, Search,
  Server, ShoppingCart, Sparkles, Wrench, Zap,
  type LucideIcon,
} from 'lucide-react';

const icons: Record<string, LucideIcon> = {
  Brain, Check, Clapperboard, Workflow, Code2, Cpu, Facebook, Gauge, Github, Globe, LayoutTemplate, LifeBuoy,
  Linkedin, Mail, MessageCircle, MonitorSmartphone, PenTool, Phone, Rocket, Search,
  Server, ShoppingCart, Sparkles, Wrench, Zap,
};

/** Returns the icon component for a name, or Sparkles if the name is unknown. */
export const getIcon = (name: string): LucideIcon => icons[name] || Sparkles;
