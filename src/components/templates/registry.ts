import { TEMPLATES, getTemplateComponent } from "./resume/TemplateRegistry";
import ModernCover from "./cover/ModernCover";
import ClassicCover from "./cover/ClassicCover";
import MinimalCover from "./cover/MinimalCover";

export type TemplateType = "resume" | "cover";

export interface Template {
  id: string;
  name: string;
  type: TemplateType;
  isPremium: boolean;
  component: React.FC<any>;
}

const RESUME_ITEMS: Template[] = TEMPLATES.map((t) => ({
  id: t.id,
  name: t.name,
  type: "resume",
  isPremium: t.isPremium,
  component: getTemplateComponent(t.id),
}));

const COVER_ITEMS: Template[] = [
  {
    id: "cover-modern",
    name: "Modern Professional",
    type: "cover",
    isPremium: false,
    component: ModernCover,
  },
  {
    id: "cover-classic",
    name: "Classic Elegant",
    type: "cover",
    isPremium: false,
    component: ClassicCover,
  },
  {
    id: "cover-minimal",
    name: "Minimalist Chic",
    type: "cover",
    isPremium: true,
    component: MinimalCover,
  },
];

export const ALL_TEMPLATES: Template[] = [...RESUME_ITEMS, ...COVER_ITEMS];

export const RESUME_TEMPLATES = ALL_TEMPLATES.filter((t) => t.type === "resume");
export const COVER_TEMPLATES = ALL_TEMPLATES.filter((t) => t.type === "cover");
