import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, SummaryItem, ExperienceItem, SkillItem, EducationItem, ProjectItem } from '@/types/resume';
import { standardStyles } from '../../styles/standardStyles';
import IndianPersonalDetails from '../../components/IndianPersonalDetails';
import IndianEducationTable from '../../components/IndianEducationTable';

const AxisLedgerTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (type: string) =>
    (data?.sections || []).find(
      (s: any) => s.type === type && s.isVisible
    )?.items || [];

  const personal = (get('personal')[0] || {}) as PersonalItem;
  const summary = ((get('summary')[0] || {}) as SummaryItem).description || '';
  const experience = get('experience') as ExperienceItem[];
  const skills = (get('skills') as SkillItem[]).map(s => s.name);
  const education = get('education') as EducationItem[];
  const projects = get('projects') as ProjectItem[];
  const certifications = get('certifications') as any[];
  const achievements = get('achievements') as any[];

  return (
    <div style={{ ...standardStyles.page, fontFamily: 'Arial, sans-serif' }}>
      {/* TOP BAR */}
      <div style={{ borderBottom: '4px solid #111', paddingBottom: 12, marginBottom: 20 }}>
        <h1 style={{ margin: 0, fontSize: 32 }}>{personal.fullName}</h1>
        <div style={{ fontSize: 14, color: '#444' }}>{personal.jobTitle}</div>
        <IndianPersonalDetails 
            data={personal} 
            layout="list" 
            style={{ marginTop: 10, fontSize: 12, display: 'flex', gap: 15, flexWrap: 'wrap' }} 
        />
      </div>

      {summary && (
        <section style={{ marginBottom: 25 }}>
          <h2 style={{ fontSize: 16, textTransform: 'uppercase', borderBottom: '1px solid #ccc', paddingBottom: 5 }}>Profile</h2>
          <p style={{ lineHeight: 1.5 }}>{summary}</p>
        </section>
      )}

      {experience.length > 0 && (
      <section style={{ marginBottom: 25 }}>
        <h2 style={{ fontSize: 16, textTransform: 'uppercase', borderBottom: '1px solid #ccc', paddingBottom: 5 }}>Experience</h2>
        {experience.map((e, i) => (
          <div key={i} style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>{e.position}</strong>
                <span style={{ fontSize: '10pt', fontWeight: 'bold' }}>{e.date}</span>
            </div>
            <div style={{ fontStyle: 'italic', fontSize: '11pt' }}>{e.company}</div>
            <ul style={{ paddingLeft: 16, margin: '6px 0' }}>
                {e.description.map((desc, idx) => (
                  <li key={idx} style={{ fontSize: '10pt', lineHeight: 1.4 }}>{desc}</li>
                ))}
            </ul>
          </div>
        ))}
      </section>
      )}

      {projects.length > 0 && (
          <section style={{ marginBottom: 25 }}>
            <h2 style={{ fontSize: 16, textTransform: 'uppercase', borderBottom: '1px solid #ccc', paddingBottom: 5 }}>Projects</h2>
            {projects.map((p, i) => (
                <div key={i} style={{ marginBottom: 15 }}>
                     <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <strong>{p.title}</strong>
                        <span style={{ fontSize: '10pt' }}>{p.startDate} - {p.endDate}</span>
                     </div>
                     {p.technologies && <div style={{ fontSize: '11px', fontStyle: 'italic' }}>{p.technologies}</div>}
                     <ul style={{ paddingLeft: 16, margin: '4px 0' }}>
                        {p.description.map((desc, idx) => (
                            <li key={idx} style={{ fontSize: '10pt' }}>{desc}</li>
                        ))}
                     </ul>
                </div>
            ))}
          </section>
      )}

      {skills.length > 0 && (
      <section style={{ marginBottom: 25 }}>
        <h2 style={{ fontSize: 16, textTransform: 'uppercase', borderBottom: '1px solid #ccc', paddingBottom: 5 }}>Core Skills</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {skills.map((s, i) => (
            <span key={i} style={{ background: '#f0f0f0', padding: '2px 8px', borderRadius: 4, fontSize: '10pt' }}>{s}</span>
          ))}
        </div>
      </section>
      )}

      <section style={{ marginBottom: 25 }}>
        <h2 style={{ fontSize: 16, textTransform: 'uppercase', borderBottom: '1px solid #ccc', paddingBottom: 5 }}>Education</h2>
        <IndianEducationTable data={education} />
      </section>

      {(certifications.length > 0 || achievements.length > 0) && (
          <section>
              <h2 style={{ fontSize: 16, textTransform: 'uppercase', borderBottom: '1px solid #ccc', paddingBottom: 5 }}>Additional</h2>
              <ul style={{ paddingLeft: 16 }}>
                  {certifications.map((c, i) => (
                      <li key={`c-${i}`}><strong>{c.title}</strong> - {c.issuer}</li>
                  ))}
                  {achievements.map((a, i) => (
                      <li key={`a-${i}`}>{a.title}: {a.description}</li>
                  ))}
              </ul>
          </section>
      )}
    </div>
  );
};

export default AxisLedgerTemplate;
