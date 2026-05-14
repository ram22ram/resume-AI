import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, SummaryItem, ExperienceItem, SkillItem, ProjectItem, EducationItem, CertificationItem, AchievementItem } from '@/types/resume';
import { standardStyles } from '../../styles/standardStyles';
import IndianPersonalDetails from '../../components/IndianPersonalDetails';
import IndianEducationTable from '../../components/IndianEducationTable';

const SplitHighlightTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (type: string) =>
    (data?.sections || []).find(
      (s: any) => s.type === type && s.isVisible
    )?.items || [];

  const p = (get('personal')[0] || {}) as PersonalItem;
  const summary = ((get('summary')[0] || {}) as SummaryItem).description || '';
  const exp = get('experience') as ExperienceItem[];
  const skills = (get('skills') as SkillItem[]).map(s => s.name);
  const projects = get('projects') as ProjectItem[];
  const edu = get('education') as EducationItem[];
  const certs = get('certifications') as CertificationItem[];
  const achievements = get('achievements') as AchievementItem[];

  return (
    <div style={{ ...standardStyles.page, display: 'flex', fontFamily: 'Inter, sans-serif' }}>
      
      {/* LEFT RAIL */}
      <aside style={{ width: '30%', paddingRight: 20, borderRight: '3px solid #000' }}>
        <h1 style={{ fontSize: 28, lineHeight: 1.2 }}>{p.fullName}</h1>
        <div style={{ fontWeight: 600, marginTop: 5 }}>{p.jobTitle}</div>
        
         <div style={{ marginTop: 20, marginBottom: 30 }}>
              <IndianPersonalDetails 
                  data={p} 
                  layout="list" 
                  style={{ fontSize: 12, display: 'flex', flexDirection: 'column', gap: 5 }} 
              />
          </div>

        {skills.length > 0 && (
            <>
                <h3 style={{ marginTop: 20, borderTop: '2px solid #000', paddingTop: 10 }}>Skills</h3>
                {skills.map((s, i) => (
                <div key={i} style={{ marginBottom: 4, fontSize: 13 }}>{s}</div>
                ))}
            </>
        )}

        {(achievements.length > 0 || certs.length > 0) && (
             <>
                 <h3 style={{ marginTop: 20, borderTop: '2px solid #000', paddingTop: 10 }}>Additional</h3>
                 <ul style={{ paddingLeft: 16, fontSize: 12 }}>
                      {certs.map((c, i) => (
                          <li key={`c-${i}`}>{c.title}</li>
                      ))}
                      {achievements.map((a, i) => (
                          <li key={`a-${i}`}>{a.title}</li>
                      ))}
                  </ul>
             </>
        )}
      </aside>

      {/* MAIN */}
      <main style={{ paddingLeft: 24, width: '70%' }}>
        {summary && (
          <section style={{ marginBottom: 30 }}>
            <h2 style={{ fontSize: 20, borderBottom: '2px solid #000', paddingBottom: 5 }}>Profile</h2>
            <p style={{ fontSize: 13, lineHeight: 1.6 }}>{summary}</p>
          </section>
        )}

        {exp.length > 0 && (
        <section style={{ marginBottom: 30 }}>
          <h2 style={{ fontSize: 20, borderBottom: '2px solid #000', paddingBottom: 5 }}>Experience</h2>
          {exp.map((e, i) => (
            <div key={i} style={{ marginBottom: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                   <strong>{e.position}</strong>
                   <span style={{ fontSize: 13 }}>{e.date}</span>
              </div>
              <div style={{ fontStyle: 'italic', fontSize: 13, marginBottom: 5 }}>{e.company}</div>
              <ul style={{ paddingLeft: 16, margin: '4px 0' }}>
                  {Array.isArray(e.description) ? e.description.map((desc, idx) => (
                    <li key={idx} style={{ fontSize: 13 }}>{desc}</li>
                  )) : <li style={{ fontSize: 13 }}>{e.description}</li>}
              </ul>
            </div>
          ))}
        </section>
        )}

        {projects.length > 0 && (
        <section style={{ marginBottom: 30 }}>
          <h2 style={{ fontSize: 20, borderBottom: '2px solid #000', paddingBottom: 5 }}>Projects</h2>
          {projects.map((p, i) => (
            <div key={i} style={{ marginBottom: 15 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong>{p.title}</strong>
                  <span style={{ fontSize: 13 }}>{p.startDate} - {p.endDate}</span>
              </div>
              {p.technologies && <div style={{ fontSize: 13, fontStyle: 'italic', marginBottom: 5 }}>{p.technologies}</div>}
              <ul style={{ paddingLeft: 16, margin: '4px 0' }}>
                  {p.description.map((desc, idx) => (
                    <li key={idx} style={{ fontSize: 13 }}>{desc}</li>
                  ))}
              </ul>
            </div>
          ))}
        </section>
        )}

        <section style={{ marginBottom: 30 }}>
          <h2 style={{ fontSize: 20, borderBottom: '2px solid #000', paddingBottom: 5 }}>Education</h2>
          <IndianEducationTable data={edu} />
        </section>
      </main>
    </div>
  );
};

export default SplitHighlightTemplate;
