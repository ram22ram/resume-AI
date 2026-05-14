import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, SummaryItem, ExperienceItem, ProjectItem, EducationItem, SkillItem } from '@/types/resume';
import { standardStyles } from '../../styles/standardStyles';
import IndianPersonalDetails from '../../components/IndianPersonalDetails';
import IndianEducationTable from '../../components/IndianEducationTable';

const SplitConfidenceTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
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
  const certifications = get('certifications') as any[];
  const achievements = get('achievements') as any[];

  return (
    <div
      style={{
        ...standardStyles.page,
        display: 'grid',
        gridTemplateColumns: '60% 40%',
        gap: 24,
        fontFamily: 'Source Sans Pro, sans-serif'
      }}
    >
      {/* LEFT */}
      <div>
        <h1 style={{ fontSize: 32, marginBottom: 5 }}>{personal.fullName}</h1>
        <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 15 }}>{personal.jobTitle}</div>
        <IndianPersonalDetails 
            data={personal} 
            layout="list" 
            style={{ marginBottom: 20, fontSize: 12, display: 'flex', flexDirection: 'column', gap: 5 }} 
        />

        {summary && <p style={{ marginBottom: 20, lineHeight: 1.5 }}>{summary}</p>}

        <section style={{ marginBottom: 30 }}>
          <h2 style={{ borderBottom: '2px solid #ddd', paddingBottom: 5 }}>Skills</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {skills.map((s, i) => (
                <span key={i} style={{ background: '#eee', padding: '2px 6px', borderRadius: 4, fontSize: 12 }}>{s}</span>
            ))}
          </div>
        </section>

        <section>
          <h2 style={{ borderBottom: '2px solid #ddd', paddingBottom: 5 }}>Education</h2>
          <IndianEducationTable data={education} />
        </section>

        {(certifications.length > 0 || achievements.length > 0) && (
             <section style={{ marginTop: 30 }}>
                 <h2 style={{ borderBottom: '2px solid #ddd', paddingBottom: 5 }}>Additional</h2>
                 <ul style={{ paddingLeft: 16 }}>
                     {certifications.map((c, i) => <li key={`c-${i}`} style={{ fontSize: 12 }}><strong>{c.title}</strong> - {c.issuer}</li>)}
                     {achievements.map((a, i) => <li key={`a-${i}`} style={{ fontSize: 12 }}>{a.title}: {a.description}</li>)}
                 </ul>
             </section>
         )}
      </div>

      {/* RIGHT */}
      <div>
        {experience.length > 0 && (
        <section style={{ marginBottom: 30 }}>
          <h2 style={{ borderBottom: '2px solid #ddd', paddingBottom: 5 }}>Experience</h2>
          {experience.map((e, i) => (
            <div key={i} style={{ borderLeft: '2px solid #ddd', paddingLeft: 10, marginBottom: 15 }}>
              <strong>{e.position}</strong>
              <div>{e.company}</div>
              <div style={{ fontSize: '9pt', color: '#666' }}>{e.date}</div>
              <ul style={{ paddingLeft: 16, margin: '4px 0' }}>
                  {e.description.map((desc, idx) => (
                    <li key={idx} style={{ fontSize: '9pt' }}>{desc}</li>
                  ))}
              </ul>
            </div>
          ))}
        </section>
        )}

        {projects.length > 0 && (
        <section>
          <h2 style={{ borderBottom: '2px solid #ddd', paddingBottom: 5 }}>Projects</h2>
          {projects.map((p, i) => (
            <div key={i} style={{ marginBottom: 10, paddingBottom: 10, borderBottom: '1px solid #eee' }}>
              <strong>{p.title}</strong>
              <div style={{ fontSize: '9pt', color: '#666' }}>{p.startDate} - {p.endDate}</div>
              {p.technologies && <div style={{ fontSize: '9pt', fontStyle: 'italic', marginBottom: 2 }}>{p.technologies}</div>}
              <ul style={{ paddingLeft: 16, margin: '4px 0' }}>
                  {p.description.map((desc, idx) => (
                    <li key={idx} style={{ fontSize: '9pt' }}>{desc}</li>
                  ))}
              </ul>
            </div>
          ))}
        </section>
        )}
      </div>
    </div>
  );
};

export default SplitConfidenceTemplate;
