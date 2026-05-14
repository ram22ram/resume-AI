import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, SummaryItem, ExperienceItem, EducationItem, ProjectItem, SkillItem, CertificationItem, AchievementItem } from '@/types/resume';
import { standardStyles } from '../../styles/standardStyles';
import IndianPersonalDetails from '../../components/IndianPersonalDetails';
import IndianEducationTable from '../../components/IndianEducationTable';

const EditorialSerifTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (type: string) =>
    (data?.sections || []).find(
      (s: any) => s.type === type && s.isVisible
    )?.items || [];

  const personal = (get('personal')[0] || {}) as PersonalItem;
  const summary = ((get('summary')[0] || {}) as SummaryItem).description || '';
  const experience = get('experience') as ExperienceItem[];
  const education = get('education') as EducationItem[];
  const projects = get('projects') as ProjectItem[];
  const skills = (get('skills') as SkillItem[]).map(s => s.name);
  const certs = get('certifications') as CertificationItem[];
  const achievements = get('achievements') as AchievementItem[];

  return (
    <div
      style={{
        ...standardStyles.page,
        fontFamily: '"Playfair Display", serif',
        padding: 70,
        color: '#111'
      }}
    >
      {/* Header */}
      <header style={{ textAlign: 'center', marginBottom: 50 }}>
        <h1 style={{ fontSize: 40, fontWeight: 400, margin: 0 }}>
          {personal.fullName}
        </h1>
        <div style={{ fontSize: 16, marginTop: 8, fontStyle: 'italic' }}>
          {personal.jobTitle}
        </div>
        <div style={{ marginTop: 20 }}>
            <IndianPersonalDetails 
                data={personal} 
                layout="list" 
                style={{ fontSize: 13, justifyContent: 'center', display: 'flex', gap: 15, flexWrap: 'wrap' }} 
            />
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section style={{ marginBottom: 40, textAlign: 'center' }}>
          <p style={{ fontSize: 14, maxWidth: 600, margin: '0 auto', lineHeight: 1.8 }}>
            {summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 14, letterSpacing: 2, marginBottom: 20, textAlign: 'center', borderBottom: '1px solid #ddd', paddingBottom: 10 }}>
          EXPERIENCE
        </h2>
        {experience.map((exp, i) => (
          <div key={i} style={{ marginBottom: 30 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{exp.position}</div>
                <div style={{ fontSize: 12 }}>{exp.date}</div>
            </div>
            <div style={{ fontSize: 13, marginBottom: 6, fontStyle: 'italic' }}>
              {exp.company}
            </div>
            <ul style={{ paddingLeft: 16, margin: '6px 0' }}>
                {Array.isArray(exp.description) ? exp.description.map((desc, idx) => (
                  <li key={idx} style={{ fontSize: 13, lineHeight: 1.6 }}>{desc}</li>
                )) : <li style={{ fontSize: 13 }}>{exp.description}</li>}
            </ul>
          </div>
        ))}
      </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 14, letterSpacing: 2, marginBottom: 20, textAlign: 'center', borderBottom: '1px solid #ddd', paddingBottom: 10 }}>
          PROJECTS
        </h2>
         {projects.map((p, i) => (
          <div key={i} style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{p.title}</div>
                <span style={{ fontSize: 12 }}>{p.startDate} - {p.endDate}</span>
            </div>
            {p.technologies && <div style={{ fontSize: 12, fontStyle: 'italic' }}>{p.technologies}</div>}
             <ul style={{ paddingLeft: 16, margin: '6px 0' }}>
                {p.description.map((desc, idx) => (
                  <li key={idx} style={{ fontSize: 13, lineHeight: 1.6 }}>{desc}</li>
                ))}
            </ul>
          </div>
        ))}
      </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section style={{ marginBottom: 40, textAlign: 'center' }}>
            <h2 style={{ fontSize: 14, letterSpacing: 2, marginBottom: 15, borderBottom: '1px solid #ddd', paddingBottom: 10 }}>
                SKILLS
            </h2>
            <div style={{ fontSize: 13, lineHeight: 1.6 }}>{skills.join(' • ')}</div>
        </section>
      )}

      {/* Education */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 14, letterSpacing: 2, marginBottom: 20, textAlign: 'center', borderBottom: '1px solid #ddd', paddingBottom: 10 }}>
          EDUCATION
        </h2>
        <IndianEducationTable data={education} />
      </section>

      {(achievements.length > 0 || certs.length > 0) && (
          <section>
              <h2 style={{ fontSize: 14, letterSpacing: 2, marginBottom: 20, textAlign: 'center', borderBottom: '1px solid #ddd', paddingBottom: 10 }}>
                  ADDITIONAL
              </h2>
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

export default EditorialSerifTemplate;
