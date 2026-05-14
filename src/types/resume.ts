export interface ResumeSection {
  type: string;
  isVisible: boolean;
  items: any[];
}

export interface ResumeData {
  sections: ResumeSection[];
  metadata?: {
    accentColor?: string;
    fontFamily?: string;
    fontSize?: number;
    [key: string]: any;
  };
}

export interface PersonalItem {
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
  linkedin?: string;
  portfolio?: string;
  jobTitle?: string;
  objective?: string;
  [key: string]: any;
}

export interface EducationItem {
  school: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
  [key: string]: any;
}

export interface ExperienceItem {
  company: string;
  position: string;
  location: string;
  date: string;
  description: string[];
  [key: string]: any;
}

export interface SkillItem {
  name: string;
  level?: string;
  [key: string]: any;
}

export interface ProjectItem {
  title: string;
  technologies?: string;
  description: string[];
  startDate?: string;
  endDate?: string;
  [key: string]: any;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  date: string;
  [key: string]: any;
}

export interface AchievementItem {
  title: string;
  description: string;
  date: string;
  [key: string]: any;
}

export interface SummaryItem {
  description: string;
}
