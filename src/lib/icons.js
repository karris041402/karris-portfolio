// Maps the icon names used in content.js to lucide-react components.
// To use a new icon: import it here and add it to the map.
import {
  Brain, Check, Clapperboard, Workflow, Code2, Cpu, Facebook, Gauge, Github, Globe, LayoutTemplate, LifeBuoy,
  Linkedin, Mail, MessageCircle, MonitorSmartphone, PenTool, Phone, Rocket, Search,
  Server, ShoppingCart, Sparkles, Wrench, Zap,
} from 'lucide-react';

const icons = {
  Brain, Check, Clapperboard, Workflow, Code2, Cpu, Facebook, Gauge, Github, Globe, LayoutTemplate, LifeBuoy,
  Linkedin, Mail, MessageCircle, MonitorSmartphone, PenTool, Phone, Rocket, Search,
  Server, ShoppingCart, Sparkles, Wrench, Zap,
};

/** Returns the icon component for a name, or Sparkles if the name is unknown. */
export const getIcon = (name) => icons[name] || Sparkles;
