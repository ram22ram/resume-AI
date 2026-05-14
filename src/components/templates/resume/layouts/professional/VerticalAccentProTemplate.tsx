import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, SummaryItem, ExperienceItem, ProjectItem, EducationItem, SkillItem, CertificationItem, AchievementItem } from '@/types/resume';
import { standardStyles } from '../../styles/standardStyles';
import IndianPersonalDetails from '../../components/IndianPersonalDetails';
import IndianEducationTable from '../../components/IndianEducationTable';

const VerticalAccentProTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (type: string) =>
    (data?.sections || []).find(
      (s: any) => s.type === type && s.isVisible
    )?.items || [];

  const personal = (get('personal')[0] || {}) as PersonalItem;
  const summary = ((get('summary')[0] || {}) as SummaryItem).description || '';
  const experience = get('experience') as ExperienceItem[];
  const projects = get('projects') as ProjectItem[];
  const education = get('education') as EducationItem[];
  const skills = (get('skills') as SkillItem[]).map(s => s.name);
  const certs = get('certifications') as CertificationItem[];
  const achievements = get('achievements') as AchievementItem[];

  const accent = data?.metadata?.accentColor || '#2563eb' || '#2563eb';

  return (
    <div style={{ ...standardStyles.page, display: 'flex', fontFamily: 'Inter, sans-serif', padding: 0 }}>
      {/* Accent Bar */}
      <div style={{ width: 14, backgroundColor: accent }} />

      {/* Content */}
      <div style={{ padding: '30px 40px', flex: 1 }}>
        <h1 style={{ marginBottom: 4, fontWeight: 800, fontSize: 28, textTransform: 'uppercase' }}>{personal.fullName}</h1>
        <div style={{ color: accent, fontWeight: 700, fontSize: 14, textTransform: 'uppercase' }}>{personal.jobTitle}</div>
        
        <div style={{ marginTop: 10 }}>
            <IndianPersonalDetails 
                data={personal} 
                layout="list" 
                style={{ fontSize: 12, display: 'flex', flexWrap: 'wrap', gap: '8px 16px', color: '#555' }} 
            />
        </div>

        {summary && (
            <div style={{ marginTop: 20, fontSize: 13, lineHeight: 1.6, color: '#333' }}>
                {summary}
            </div>
        )}

        <div style={{ marginTop: 30 }}>
            {experience.length > 0 && (
                <section style={{ marginBottom: 30 }}>
                <h2 style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: 1, color: accent, borderBottom: `2px solid ${accent}`, paddingBottom: 6, marginBottom: 15 }}>Experience</h2>
                {experience.map((e, i) => (
                    <div key={i} style={{ marginBottom: 20 }}>
                     <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <strong style={{ fontSize: 14 }}>{e.position}</strong>
                        <span style={{ fontSize: 12, fontWeight: 600 }}>{e.date}</span>
                    </div>
                    <div style={{ fontSize: 12, fontStyle: 'italic', marginBottom: 4 }}>{e.company}</div>
                    <ul style={{ paddingLeft: 16, margin: '6px 0' }}>
                        {Array.isArray(e.description) ? e.description.map((desc, idx) => (
                            <li key={idx} style={{ fontSize: 13, marginBottom: 3 }}>{desc}</li>
                        )) : <li style={{ fontSize: 13 }}>{e.description}</li>}
                    </ul>
                    </div>
                ))}
                </section>
            )}

            {projects.length > 0 && (
                <section style={{ marginBottom: 30 }}>
                <h2 style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: 1, color: accent, borderBottom: `2px solid ${accent}`, paddingBottom: 6, marginBottom: 15 }}>Projects</h2>
                {projects.map((p, i) => (
                    <div key={i} style={{ marginBottom: 15 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <strong style={{ fontSize: 14 }}>{p.title}</strong>
                        <span style={{ fontSize: 12 }}>{p.startDate} - {p.endDate}</span>
                     </div>
                     {p.technologies && <div style={{ fontSize: 12, color: '#666', marginBottom: 2 }}>{p.technologies}</div>}
                    <ul style={{ paddingLeft: 16, margin: '6px 0' }}>
                        {p.description.map((desc, idx) => (
                            <li key={idx} style={{ fontSize: 13, marginBottom: 3 }}>{desc}</li>
                        ))}
                    </ul>
                    </div>
                ))}
                </section>
            )}

            <h2 style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: 1, color: accent, borderBottom: `2px solid ${accent}`, paddingBottom: 6, marginBottom: 15 }}>Education</h2>
            <IndianEducationTable data={education} style={{ marginBottom: 30 }} />

            {skills.length > 0 && (
                <section style={{ marginBottom: 30 }}>
                <h2 style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: 1, color: accent, borderBottom: `2px solid ${accent}`, paddingBottom: 6, marginBottom: 15 }}>Skills</h2>
                <div style={{ fontSize: 13, lineHeight: 1.6 }}>{skills.join(' • ')}</div>
                </section>
            )}

             {(achievements.length > 0 || certs.length > 0) && (
                 <section style={{ marginBottom: 30 }}>
                     <h2 style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: 1, color: accent, borderBottom: `2px solid ${accent}`, paddingBottom: 6, marginBottom: 15 }}>Achievements</h2>
                     <ul style={{ paddingLeft: 18, fontSize: 13, lineHeight: 1.6 }}>
                         {achievements.map((a, i) => (
                             <li key={`a-${i}`}><strong>{a.title}</strong>: {a.description}</li>
                         ))}
                         {certs.map((c, i) => (
                             <li key={`c-${i}`}><strong>{c.title}</strong> - {c.issuer}</li>
                         ))}
                     </ul>
                 </section>
             )}
        </div>
      </div>
    </div>
  );
};

export default VerticalAccentProTemplate;
