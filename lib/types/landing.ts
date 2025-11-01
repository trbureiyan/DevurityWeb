// Definiciones type para landing-page y componentes

export interface NavigationItem {
  label: string;
  href: string;
}

export interface Event {
  title: string;
  date: string;
  category: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface QuickNavItem {
  label: string;
  href: string;
}
