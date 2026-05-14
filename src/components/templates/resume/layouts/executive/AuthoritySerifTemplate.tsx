import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, SummaryItem, ExperienceItem, EducationItem, ProjectItem, SkillItem } from '@/types/resume';
import { standardStyles } from '../../styles/standardStyles';
import IndianPersonalDetails from '../../components/IndianPersonalDetails';
import IndianEducationTable from '../../components/IndianEducationTable';

const AuthoritySerifTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (type: string) =>
    (data?.sections || []).find(
      (s: any) => s.type === type && s.isVisible
    )?.items || [];

  const p = (get('personal')[0] || {}) as PersonalItem;
  const summary = ((get('summary')[0] || {}) as SummaryItem).description || '';
  const exp = get('experience') as ExperienceItem[];
  const edu = get('education') as EducationItem[];
  const projects = get('projects') as ProjectItem[];
  const skills = (get('skills') as SkillItem[]).map(s => s.name);
  const certifications = get('certifications') as any[];
  const achievements = get('achievements') as any[];

  return (
    <div style={{
      ...standardStyles.page,
      fontFamily: 'Georgia, serif',
      lineHeight: 1.7,
      color: '#111'
    }}>
      <header style={{ textAlign: 'center', marginBottom: 40 }}>
        <h1 style={{ fontSize: '30pt', letterSpacing: 2, marginBottom: 5 }}>{p.fullName}</h1>
        <div style={{ fontSize: '12pt', textTransform: 'uppercase', marginBottom: 10 }}>{p.jobTitle}</div>
        <IndianPersonalDetails 
            data={p} 
            layout="list" 
            style={{ fontSize: '11px', display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }} 
        />
      </header>

      {summary && (
        <section>
          <h2 style={{ textTransform: 'uppercase', fontSize: '14pt', borderBottom: '1px solid #111', paddingBottom: 5 }}>Executive Profile</h2>
          <p>{summary}</p>
        </section>
      )}

      {exp.length > 0 && (
      <section>
        <h2 style={{ textTransform: 'uppercase', fontSize: '14pt', borderBottom: '1px solid #111', paddingBottom: 5 }}>Professional Experience</h2>
        {exp.map((e, i) => (
          <div key={i} style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: '12pt' }}>{e.position}</strong>
                <span style={{ fontSize: '11pt' }}>{e.date}</span>
            </div>
            <div style={{ fontStyle: 'italic' }}>{e.company}</div>
            <ul style={{ paddingLeft: 16, margin: '4px 0' }}>
                {e.description.map((desc, idx) => (
                  <li key={idx}>{desc}</li>
                ))}
            </ul>
          </div>
        ))}
      </section>
      )}

      {projects.length > 0 && (
          <section>
            <h2 style={{ textTransform: 'uppercase', fontSize: '14pt', borderBottom: '1px solid #111', paddingBottom: 5 }}>Key Projects</h2>
            {projects.map((pr, i) => (
                <div key={i} style={{ marginBottom: 15 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <strong>{pr.title}</strong>
                        <span style={{ fontSize: '11pt' }}>{pr.startDate} - {pr.endDate}</span>
                    </div>
                    {pr.technologies && <div style={{ fontSize: '11px', fontStyle: 'italic' }}>{pr.technologies}</div>}
                    <ul style={{ paddingLeft: 16, margin: '4px 0' }}>
                        {pr.description.map((desc, idx) => (
                            <li key={idx} style={{ fontSize: '11pt' }}>{desc}</li>
                        ))}
                    </ul>
                </div>
            ))}
          </section>
      )}

      {skills.length > 0 && (
          <section>
              <h2 style={{ textTransform: 'uppercase', fontSize: '14pt', borderBottom: '1px solid #111', paddingBottom: 5 }}>Skills</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {skills.map((s, i) => (
                      <span key={i} style={{ borderBottom: '1px solid #ccc' }}>{s}</span>
                  ))}
              </div>
          </section>
      )}

      <section style={{ marginTop: 20 }}>
        <h2 style={{ textTransform: 'uppercase', fontSize: '14pt', borderBottom: '1px solid #111', paddingBottom: 5 }}>Education</h2>
        <IndianEducationTable data={edu} />
      </section>

      {(certifications.length > 0 || achievements.length > 0) && (
          <section style={{ marginTop: 20 }}>
              <h2 style={{ textTransform: 'uppercase', fontSize: '14pt', borderBottom: '1px solid #111', paddingBottom: 5 }}>Additional Information</h2>
              <ul style={{ paddingLeft: 16 }}>
                  {certifications.map((c, i) => (
                      <li key={`c-${i}`}><strong>{c.title}</strong>: {c.issuer}</li>
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

export default AuthoritySerifTemplate;
