import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, SummaryItem, ExperienceItem, EducationItem, SkillItem, ProjectItem } from '@/types/resume';
import { standardStyles } from '../../styles/standardStyles';
import IndianPersonalDetails from '../../components/IndianPersonalDetails';
import IndianEducationTable from '../../components/IndianEducationTable';

const StrataProTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (type: string) =>
    (data?.sections || []).find(
      (s: any) => s.type === type && s.isVisible
    )?.items || [];

  const personal = (get('personal')[0] || {}) as PersonalItem;
  const summary = ((get('summary')[0] || {}) as SummaryItem).description;
  const experience = get('experience') as ExperienceItem[];
  const education = get('education') as EducationItem[];
  const skills = (get('skills') as SkillItem[]).map(s => s.name);
  const projects = get('projects') as ProjectItem[];
  const certifications = get('certifications') as any[];
  const achievements = get('achievements') as any[];

  return (
    <div style={{ ...standardStyles.page, fontFamily: 'Georgia, serif' }}>
      <header style={{ textAlign: 'center', marginBottom: 24 }}>
        <h1 style={{ letterSpacing: 2 }}>{personal.fullName}</h1>
        <div style={{ marginBottom: 5 }}>{personal.jobTitle}</div>
        <IndianPersonalDetails 
            data={personal} 
            layout="list" 
            style={{ fontSize: '9pt', display: 'flex', justifyContent: 'center', gap: 15, flexWrap: 'wrap' }} 
        />
      </header>

      {summary && (
        <section>
          <h2 style={{ textTransform: 'uppercase', fontSize: 14, borderBottom: '1px solid #000' }}>Executive Summary</h2>
          <p>{summary}</p>
        </section>
      )}

      {experience.length > 0 && (
      <section>
        <h2 style={{ textTransform: 'uppercase', fontSize: 14, borderBottom: '1px solid #000' }}>Professional Experience</h2>
        {experience.map((e, i) => (
          <div key={i} style={{ marginBottom: 15 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>{e.position}</strong>
                <span style={{ fontSize: '9pt' }}>{e.date}</span>
            </div>
            <div style={{ fontStyle: 'italic' }}>{e.company}</div>
            <ul style={{ paddingLeft: 16, margin: '4px 0' }}>
                {e.description.map((desc, idx) => (
                  <li key={idx} style={{ fontSize: '10pt' }}>{desc}</li>
                ))}
            </ul>
          </div>
        ))}
      </section>
      )}

      {projects.length > 0 && (
          <section>
            <h2 style={{ textTransform: 'uppercase', fontSize: 14, borderBottom: '1px solid #000' }}>Projects</h2>
            {projects.map((p, i) => (
                <div key={i} style={{ marginBottom: 15 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <strong>{p.title}</strong>
                        <span style={{ fontSize: '9pt' }}>{p.startDate} - {p.endDate}</span>
                    </div>
                    {p.technologies && <div style={{ fontSize: '10pt', fontStyle: 'italic' }}>{p.technologies}</div>}
                     <ul style={{ paddingLeft: 16, margin: '4px 0' }}>
                        {p.description.map((desc, idx) => (
                            <li key={idx} style={{ fontSize: '10pt' }}>{desc}</li>
                        ))}
                    </ul>
                </div>
            ))}
          </section>
      )}

      <section>
        <h2 style={{ textTransform: 'uppercase', fontSize: 14, borderBottom: '1px solid #000' }}>Education</h2>
        <IndianEducationTable data={education} />
      </section>

      {skills.length > 0 && (
      <section>
        <h2 style={{ textTransform: 'uppercase', fontSize: 14, borderBottom: '1px solid #000' }}>Skills</h2>
        <div>{skills.join(', ')}</div>
      </section>
      )}

      {(certifications.length > 0 || achievements.length > 0) && (
          <section>
              <h2 style={{ textTransform: 'uppercase', fontSize: 14, borderBottom: '1px solid #000' }}>Additional</h2>
              <ul style={{ paddingLeft: 16 }}>
                  {certifications.map((c, i) => <li key={`c-${i}`} style={{ fontSize: '10pt' }}><strong>{c.title}</strong> - {c.issuer}</li>)}
                  {achievements.map((a, i) => <li key={`a-${i}`} style={{ fontSize: '10pt' }}>{a.title}: {a.description}</li>)}
              </ul>
          </section>
      )}
    </div>
  );
};

export default StrataProTemplate;
