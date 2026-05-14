import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, SummaryItem, ExperienceItem, SkillItem, ProjectItem, EducationItem, CertificationItem, AchievementItem } from '@/types/resume';
import { standardStyles } from '../../styles/standardStyles';
import IndianPersonalDetails from '../../components/IndianPersonalDetails';
import IndianEducationTable from '../../components/IndianEducationTable';

const AsymmetricFocusTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
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
    <div style={{ ...standardStyles.page, fontFamily: 'Inter, sans-serif' }}>
      <div style={{ marginBottom: 30 }}>
        <h1 style={{ fontSize: 30, margin: 0 }}>{p.fullName}</h1>
        <div style={{ fontWeight: 600, fontSize: 16 }}>{p.jobTitle}</div>
        <IndianPersonalDetails 
            data={p} 
            layout="list" 
            style={{ fontSize: 13, marginTop: 10, display: 'flex', gap: 15, flexWrap: 'wrap' }} 
        />
      </div>

      {summary && <p style={{ maxWidth: '85%', lineHeight: 1.6, marginBottom: 30 }}>{summary}</p>}

      {exp.length > 0 && (
      <section style={{ marginBottom: 30 }}>
        <h2 style={{ fontSize: 18, borderBottom: '2px solid #333', paddingBottom: 5, marginBottom: 15 }}>Experience</h2>
        {exp.map((e, i) => (
          <div key={i} style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong>{e.position}</strong>
                <span style={{ fontSize: 13 }}>{e.date}</span>
            </div>
            <div style={{ fontSize: 14, fontStyle: 'italic', marginBottom: 4 }}>{e.company}</div>
            <ul style={{ paddingLeft: 16, margin: '4px 0' }}>
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
        <h2 style={{ fontSize: 18, borderBottom: '2px solid #333', paddingBottom: 5, marginBottom: 15 }}>Projects</h2>
        {projects.map((p, i) => (
          <div key={i} style={{ marginBottom: 15 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>{p.title}</strong>
                <span style={{ fontSize: 13 }}>{p.startDate} - {p.endDate}</span>
            </div>
            {p.technologies && <div style={{ fontSize: 13, fontStyle: 'italic', color: '#555' }}>{p.technologies}</div>}
            <ul style={{ paddingLeft: 16, margin: '4px 0' }}>
                {p.description.map((desc, idx) => (
                  <li key={idx} style={{ fontSize: 13, marginBottom: 3 }}>{desc}</li>
                ))}
            </ul>
          </div>
        ))}
      </section>
      )}

      <section style={{ marginBottom: 30 }}>
        <h2 style={{ fontSize: 18, borderBottom: '2px solid #333', paddingBottom: 5, marginBottom: 15 }}>Education</h2>
        <IndianEducationTable data={edu} />
      </section>

      {skills.length > 0 && (
          <section style={{ marginBottom: 30 }}>
            <h2 style={{ fontSize: 18, borderBottom: '2px solid #333', paddingBottom: 5, marginBottom: 15 }}>Skills</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {skills.map((s, i) => (
                <span key={i} style={{ border: '1px solid #ddd', padding: '4px 8px', borderRadius: 4, fontSize: 13 }}>{s}</span>
              ))}
            </div>
          </section>
      )}

      {(achievements.length > 0 || certs.length > 0) && (
          <section>
              <h2 style={{ fontSize: 18, borderBottom: '2px solid #333', paddingBottom: 5, marginBottom: 15 }}>Additional</h2>
              <ul style={{ paddingLeft: 16, fontSize: 13 }}>
                  {certs.map((c, i) => (
                      <li key={`c-${i}`}><strong>{c.title}</strong> - {c.issuer}</li>
                  ))}
                  {achievements.map((a, i) => (
                      <li key={`a-${i}`}><strong>{a.title}</strong>: {a.description}</li>
                  ))}
              </ul>
          </section>
      )}
    </div>
  );
};

export default AsymmetricFocusTemplate;
