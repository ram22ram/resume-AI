import React from 'react';
import { CoverLetterData } from '@/types/cover-letter';

const MinimalCover: React.FC<{ data: CoverLetterData }> = ({ data }) => {
  return (
    <div className="p-16 font-sans text-slate-700 bg-white min-h-full">
      <div className="mb-20">
        <h1 className="text-xl font-bold text-slate-900 mb-1">{data.personalInfo.fullName}</h1>
        <p className="text-sm opacity-60">{data.personalInfo.address}</p>
      </div>

      <div className="grid grid-cols-2 gap-20 mb-20">
        <div className="text-sm space-y-1">
          <p className="text-xs uppercase tracking-tighter opacity-40 mb-2">To</p>
          <p className="font-bold text-slate-900">{data.recipientInfo.name}</p>
          <p>{data.recipientInfo.company}</p>
          <p className="opacity-60">{data.recipientInfo.address}</p>
        </div>
        <div className="text-sm text-right space-y-1">
          <p className="text-xs uppercase tracking-tighter opacity-40 mb-2">From</p>
          <p>{data.personalInfo.email}</p>
          <p>{data.personalInfo.phone}</p>
          <p className="font-bold text-slate-400 mt-4">{data.content.date}</p>
        </div>
      </div>

      <div className="mb-12">
        <p className="text-slate-900 font-medium mb-6">Dear {data.recipientInfo.name},</p>
        <div className="whitespace-pre-line leading-relaxed space-y-4">
          {data.content.body}
        </div>
      </div>

      <div className="mt-20">
        <p className="opacity-60 mb-2">{data.content.closing}</p>
        <p className="text-lg font-bold text-slate-900">{data.personalInfo.fullName}</p>
      </div>
    </div>
  );
};

export default MinimalCover;
