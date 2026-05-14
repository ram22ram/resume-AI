import React from 'react';
import { CoverLetterData } from '@/types/cover-letter';

const ClassicCover: React.FC<{ data: CoverLetterData }> = ({ data }) => {
  return (
    <div className="p-16 font-serif text-slate-900 bg-white min-h-full leading-normal">
      <div className="text-center border-b-2 border-slate-900 pb-8 mb-12">
        <h1 className="text-3xl font-bold uppercase tracking-widest mb-2">{data.personalInfo.fullName}</h1>
        <div className="text-sm space-x-3 text-slate-600">
          <span>{data.personalInfo.email}</span>
          <span>•</span>
          <span>{data.personalInfo.phone}</span>
          <span>•</span>
          <span>{data.personalInfo.address}</span>
        </div>
      </div>

      <div className="flex justify-between mb-12">
        <div className="text-sm">
          <p className="font-bold">{data.recipientInfo.name}</p>
          <p>{data.recipientInfo.role}</p>
          <p>{data.recipientInfo.company}</p>
          <p className="text-slate-600">{data.recipientInfo.address}</p>
        </div>
        <p className="text-sm italic">{data.content.date}</p>
      </div>

      <div className="mb-12">
        <p className="font-bold mb-8">Dear {data.recipientInfo.name},</p>
        <div className="whitespace-pre-line text-justify space-y-6">
          {data.content.body}
        </div>
      </div>

      <div className="mt-16">
        <p className="mb-8">{data.content.closing}</p>
        <p className="font-bold border-t border-slate-900 pt-2 w-48 text-center">{data.personalInfo.fullName}</p>
      </div>
    </div>
  );
};

export default ClassicCover;
