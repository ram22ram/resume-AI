import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ResumeData } from '@/types/resume';

// Custom section for dynamic user-defined sections
export interface CustomSection {
  id: string;
  title: string;
  items: string[];
}

interface ResumeStore {
  data: ResumeData;
  templateId: string;
  customSections: CustomSection[];
  updatePersonal: (personal: any) => void;
  updateSection: (sectionType: string, items: any[]) => void;
  setTemplate: (id: string) => void;
  setData: (data: ResumeData) => void;
  // Custom sections CRUD
  addCustomSection: (title: string) => void;
  updateCustomSectionTitle: (id: string, title: string) => void;
  addCustomSectionItem: (sectionId: string, item: string) => void;
  updateCustomSectionItem: (sectionId: string, index: number, value: string) => void;
  deleteCustomSectionItem: (sectionId: string, index: number) => void;
  deleteCustomSection: (id: string) => void;
}

export const useStore = create<ResumeStore>()(
  persist(
    (set) => ({
      templateId: 'modern',
      customSections: [],
      data: {
        sections: [
          { type: 'personal', isVisible: true, items: [{}] },
          { type: 'experience', isVisible: true, items: [] },
          { type: 'education', isVisible: true, items: [] },
          { type: 'skills', isVisible: true, items: [] },
        ],
        metadata: { accentColor: '#2563eb' },
      },

      updatePersonal: (personal) =>
        set((state) => ({
          data: {
            ...state.data,
            sections: state.data.sections.map((s) =>
              s.type === 'personal' ? { ...s, items: [personal] } : s
            ),
          },
        })),

      updateSection: (sectionType, items) =>
        set((state) => ({
          data: {
            ...state.data,
            sections: state.data.sections.map((s) =>
              s.type === sectionType ? { ...s, items } : s
            ),
          },
        })),

      setTemplate: (id) => set({ templateId: id }),
      setData: (data) => set({ data }),

      // ── Custom Sections ─────────────────────────────────────────────
      addCustomSection: (title) =>
        set((state) => ({
          customSections: [
            ...state.customSections,
            { id: `custom-${Date.now()}`, title, items: [] },
          ],
        })),

      updateCustomSectionTitle: (id, title) =>
        set((state) => ({
          customSections: state.customSections.map((s) =>
            s.id === id ? { ...s, title } : s
          ),
        })),

      addCustomSectionItem: (sectionId, item) =>
        set((state) => ({
          customSections: state.customSections.map((s) =>
            s.id === sectionId ? { ...s, items: [...s.items, item] } : s
          ),
        })),

      updateCustomSectionItem: (sectionId, index, value) =>
        set((state) => ({
          customSections: state.customSections.map((s) => {
            if (s.id !== sectionId) return s;
            const items = [...s.items];
            items[index] = value;
            return { ...s, items };
          }),
        })),

      deleteCustomSectionItem: (sectionId, index) =>
        set((state) => ({
          customSections: state.customSections.map((s) => {
            if (s.id !== sectionId) return s;
            const items = s.items.filter((_, i) => i !== index);
            return { ...s, items };
          }),
        })),

      deleteCustomSection: (id) =>
        set((state) => ({
          customSections: state.customSections.filter((s) => s.id !== id),
        })),
    }),
    {
      name: 'resume-builder-store',
      partialize: (state) => ({
        data: state.data,
        templateId: state.templateId,
        customSections: state.customSections,
      }),
    }
  )
);
