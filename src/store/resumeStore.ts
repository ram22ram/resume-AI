import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ResumeData } from "@/types/resume";
import { MOCK_RESUME_DATA } from "@/components/templates/mock-data";

interface ResumeState {
  id: string | null;
  title: string;
  templateId: string;
  resumeData: ResumeData;
  isSaving: boolean;
  
  setId: (id: string | null) => void;
  setTitle: (title: string) => void;
  setTemplateId: (templateId: string) => void;
  setResumeData: (data: ResumeData) => void;
  setIsSaving: (isSaving: boolean) => void;
  
  updateSection: (type: string, items: any[]) => void;
  toggleSectionVisibility: (type: string) => void;
  updateMetadata: (metadata: Partial<ResumeData['metadata']>) => void;
  resetStore: () => void;
}

export const useResumeStore = create<ResumeState>()(
  persist(
    (set) => ({
      id: null,
      title: "Untitled Resume",
      templateId: "BankPOFormatTemplate",
      resumeData: MOCK_RESUME_DATA,
      isSaving: false,

      setId: (id) => set({ id }),
      setTitle: (title) => set({ title }),
      setTemplateId: (templateId) => set({ templateId }),
      setResumeData: (data) => set({ resumeData: data }),
      setIsSaving: (isSaving) => set({ isSaving }),

      updateSection: (type, items) => 
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            sections: (state.resumeData?.sections || []).map((s) => 
              s.type === type ? { ...s, items } : s
            )
          }
        })),
      toggleSectionVisibility: (type) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            sections: (state.resumeData?.sections || []).map((s) => 
              s.type === type ? { ...s, isVisible: !s.isVisible } : s
            )
          }
        })),
      updateMetadata: (metadata) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            metadata: { ...state.resumeData.metadata, ...metadata }
          }
        })),
      resetStore: () => set({ 
        id: null, 
        title: "Untitled Resume", 
        templateId: "BankPOFormatTemplate", 
        resumeData: MOCK_RESUME_DATA 
      }),
    }),
    {
      name: "resume-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
