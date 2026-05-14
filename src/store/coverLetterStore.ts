import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CoverLetterData } from "@/types/cover-letter";
import { MOCK_COVER_LETTER_DATA } from "@/components/templates/mock-cover-data";

interface CoverLetterState {
  id: string | null;
  title: string;
  templateId: string;
  coverLetterData: CoverLetterData;
  isSaving: boolean;
  
  setId: (id: string | null) => void;
  setTitle: (title: string) => void;
  setTemplateId: (templateId: string) => void;
  setCoverLetterData: (data: CoverLetterData) => void;
  setIsSaving: (isSaving: boolean) => void;
  
  updatePersonalInfo: (info: Partial<CoverLetterData['personalInfo']>) => void;
  updateRecipientInfo: (info: Partial<CoverLetterData['recipientInfo']>) => void;
  updateContent: (content: Partial<CoverLetterData['content']>) => void;
  updateMetadata: (metadata: Partial<CoverLetterData['metadata']>) => void;
  resetStore: () => void;
}

export const useCoverLetterStore = create<CoverLetterState>()(
  persist(
    (set) => ({
      id: null,
      title: "Untitled Cover Letter",
      templateId: "cover-modern",
      coverLetterData: MOCK_COVER_LETTER_DATA,
      isSaving: false,

      setId: (id) => set({ id }),
      setTitle: (title) => set({ title }),
      setTemplateId: (templateId) => set({ templateId }),
      setCoverLetterData: (data) => set({ coverLetterData: data }),
      setIsSaving: (isSaving) => set({ isSaving }),

      updatePersonalInfo: (info) =>
        set((state) => ({
          coverLetterData: {
            ...state.coverLetterData,
            personalInfo: { ...state.coverLetterData.personalInfo, ...info },
          },
        })),
      updateRecipientInfo: (info) =>
        set((state) => ({
          coverLetterData: {
            ...state.coverLetterData,
            recipientInfo: { ...state.coverLetterData.recipientInfo, ...info },
          },
        })),
      updateContent: (content) =>
        set((state) => ({
          coverLetterData: {
            ...state.coverLetterData,
            content: { ...state.coverLetterData.content, ...content },
          },
        })),
      updateMetadata: (metadata) =>
        set((state) => ({
          coverLetterData: {
            ...state.coverLetterData,
            metadata: { ...state.coverLetterData.metadata, ...metadata },
          },
        })),
      resetStore: () => set({ 
        id: null, 
        title: "Untitled Cover Letter", 
        templateId: "cover-modern", 
        coverLetterData: MOCK_COVER_LETTER_DATA 
      }),
    }),
    {
      name: "cover-letter-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
