import React from 'react';
import { CoverLetterData } from '@/types/cover-letter';

const ModernCover: React.FC<{ data: CoverLetterData }> = ({ data }) => {
  const accentColor = data?.metadata?.accentColor || '#2563eb';
  
  return (
    <div className="p-12 font-sans text-slate-800 bg-white min-h-full">
      <header className="flex justify-between items-start mb-12">
        <div>
          <h1 className="text-4xl font-black tracking-tight" style={{ color: accentColor }}>
            {data.personalInfo.fullName}
          </h1>
          <p className="text-lg font-medium text-slate-500 mt-1">{data.recipientInfo.role} Applicant</p>
        </div>
        <div className="text-right text-sm space-y-1 text-slate-500">
          <p>{data.personalInfo.email}</p>
          <p>{data.personalInfo.phone}</p>
          <p>{data.personalInfo.address}</p>
        </div>
      </header>

      <div className="mb-12">
        <p className="font-bold text-slate-400 uppercase tracking-widest text-xs mb-4">{data.content.date}</p>
        <div className="space-y-1">
          <p className="font-bold text-slate-900">{data.recipientInfo.name}</p>
          <p>{data.recipientInfo.role}</p>
          <p className="font-bold" style={{ color: accentColor }}>{data.recipientInfo.company}</p>
          <p className="text-slate-500">{data.recipientInfo.address}</p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-6 pb-2 border-b" style={{ borderColor: `${accentColor}20` }}>
          RE: {data.content.subject}
        </h2>
        <p className="mb-4 font-bold">Dear {data.recipientInfo.name},</p>
        <div className="whitespace-pre-line leading-relaxed text-slate-700 space-y-4">
          {data.content.body}
        </div>
      </div>

      <footer className="mt-12 pt-8 border-t border-slate-100">
        <p className="mb-4">{data.content.closing}</p>
        <p className="text-2xl font-black italic" style={{ color: accentColor }}>
          {data.personalInfo.fullName}
        </p>
      </footer>
    </div>
  );
};

export default ModernCover;
