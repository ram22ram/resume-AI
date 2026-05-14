"use client";

import React, { forwardRef } from 'react';
import { useStore } from '@/lib/store';

/**
 * PreviewPanel — renders a clean A4-sized resume preview.
 *
 * The inner `#resume-preview` div is forwarded via ref so that
 * react-to-print (or window.print) prints only this section,
 * not the entire page.
 *
 * No watermark — clean PDF for all users (free & pro).
 */
export const PreviewPanel = forwardRef<HTMLDivElement>(function PreviewPanel(_, ref) {
  const { data, customSections } = useStore();

  const getSection = (type: string) => data.sections.find((s) => s.type === type);
  const personal    = getSection('personal')?.items[0]  || {};
  const experiences = getSection('experience')?.items   || [];
  const education   = getSection('education')?.items    || [];
  const skills      = getSection('skills')?.items       || [];

  const accentColor = data.metadata?.accentColor || '#2563eb';

  return (
    <div className="sticky top-6 w-full flex justify-center pb-12">
      {/* Outer scale wrapper — shrinks to fit viewport */}
      <div className="w-full flex justify-center">
        <div
          ref={ref}
          id="resume-preview"
          className="bg-white shadow-2xl text-slate-800 flex flex-col"
          style={{
            width: '210mm',
            minHeight: '297mm',
            padding: '12mm 14mm',
            // Scale down for viewport display
            transformOrigin: 'top center',
            transform: 'scale(0.58)',
            marginBottom: 'calc((297mm * 0.58 - 297mm))',
          }}
        >
          {/* ── Header ─────────────────────────────────────────────── */}
          <div
            className="pb-5 mb-6"
            style={{ borderBottom: `3px solid ${accentColor}` }}
          >
            <h1
              className="text-[40px] font-black uppercase tracking-tighter mb-1"
              style={{ color: accentColor }}
            >
              {personal.fullName || 'Your Name'}
            </h1>
            <p className="text-[20px] font-bold text-slate-600 mb-3">
              {personal.jobTitle || 'Desired Job Title'}
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-[14px] text-slate-500 font-medium">
              {personal.email    && <span>{personal.email}</span>}
              {personal.phone    && <span>{personal.phone}</span>}
              {personal.address  && <span>{personal.address}</span>}
              {personal.linkedin && <span>{personal.linkedin}</span>}
              {personal.portfolio && <span>{personal.portfolio}</span>}
            </div>
          </div>

          {/* ── Content ────────────────────────────────────────────── */}
          <div className="flex-1 space-y-7">

            {/* Professional Summary */}
            {personal.objective && (
              <Section title="Professional Summary" accentColor={accentColor}>
                <p className="text-[13px] leading-relaxed text-slate-700">
                  {personal.objective}
                </p>
              </Section>
            )}

            {/* Experience */}
            <Section title="Experience" accentColor={accentColor}>
              {experiences.length > 0 ? (
                <div className="space-y-5">
                  {experiences.map((exp: any, i: number) => (
                    <div key={i}>
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-[14px] text-slate-800">
                          {exp.position || 'Position'}
                        </h3>
                        <span className="text-[12px] font-bold text-slate-500 shrink-0 ml-2">
                          {exp.date}
                        </span>
                      </div>
                      <p className="text-[13px] font-semibold text-slate-600">
                        {exp.company || 'Company'}
                        {exp.location && ` · ${exp.location}`}
                      </p>
                      {exp.description && (
                        <p className="text-[12px] text-slate-500 mt-1.5 leading-relaxed">
                          {exp.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <Empty>No experience added yet.</Empty>
              )}
            </Section>

            {/* Education */}
            <Section title="Education" accentColor={accentColor}>
              {education.length > 0 ? (
                <div className="space-y-4">
                  {education.map((edu: any, i: number) => (
                    <div key={i}>
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-[14px] text-slate-800">
                          {edu.school || 'School'}
                        </h3>
                        <span className="text-[12px] font-bold text-slate-500 shrink-0 ml-2">
                          {edu.startDate}{edu.startDate && edu.endDate ? ' – ' : ''}{edu.endDate}
                        </span>
                      </div>
                      <p className="text-[13px] font-medium text-slate-600">
                        {edu.degree || 'Degree'}
                        {edu.location && ` · ${edu.location}`}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <Empty>No education added yet.</Empty>
              )}
            </Section>

            {/* Skills */}
            <Section title="Skills" accentColor={accentColor}>
              {skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill: any, i: number) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-[12px] font-bold rounded-full"
                      style={{
                        backgroundColor: `${accentColor}15`,
                        color: accentColor,
                      }}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              ) : (
                <Empty>No skills added yet.</Empty>
              )}
            </Section>

            {/* ── Custom Sections ──────────────────────────────────── */}
            {customSections.map((section) =>
              section.items.length > 0 ? (
                <Section key={section.id} title={section.title} accentColor={accentColor}>
                  <ul className="space-y-1">
                    {section.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-[13px] text-slate-700">
                        <span
                          className="mt-1.5 size-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: accentColor }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Section>
              ) : null
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

// ── Helper sub-components ───────────────────────────────────────────────────

function Section({
  title,
  accentColor,
  children,
}: {
  title: string;
  accentColor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <h2
        className="text-[11px] font-black uppercase tracking-[0.18em] pb-1"
        style={{
          color: accentColor,
          borderBottom: `1.5px solid ${accentColor}30`,
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[12px] text-slate-400 italic">{children}</p>
  );
}
