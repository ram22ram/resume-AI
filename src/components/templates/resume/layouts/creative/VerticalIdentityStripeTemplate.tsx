import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, ExperienceItem, SummaryItem, EducationItem, ProjectItem, SkillItem, CertificationItem, AchievementItem } from '@/types/resume';
import { standardStyles } from '../../styles/standardStyles';
import IndianPersonalDetails from '../../components/IndianPersonalDetails';
import IndianEducationTable from '../../components/IndianEducationTable';

const VerticalIdentityStripeTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (type: string) =>
    (data?.sections || []).find(
      (s: any) => s.type === type && s.isVisible
    )?.items || [];

  const personal = (get('personal')[0] || {}) as PersonalItem;
  const experience = get('experience') as ExperienceItem[];
  const summary = ((get('summary')[0] || {}) as SummaryItem).description || '';
  const education = get('education') as EducationItem[];
  const projects = get('projects') as ProjectItem[];
  const skills = (get('skills') as SkillItem[]).map(s => s.name);
  const certs = get('certifications') as CertificationItem[];
  const achievements = get('achievements') as AchievementItem[];

  const accent = data?.metadata?.accentColor || '#2563eb' || '#1e3a8a';

  return (
    <div
      style={{
        ...standardStyles.page,
        display: 'flex',
        padding: 0,
        fontFamily: 'Inter, sans-serif'
      }}
    >
      {/* Vertical Stripe */}
      <div style={{
        width: 80,
        backgroundColor: accent,
        color: '#fff',
        writingMode: 'vertical-rl',
        transform: 'rotate(180deg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 32,
        fontWeight: 700,
        letterSpacing: 3
      }}>
        {personal.fullName}
      </div>

      {/* Content */}
      <div style={{ padding: 40, flex: 1 }}>
        <h2 style={{ marginTop: 0, fontSize: 24, color: accent }}>{personal.jobTitle}</h2>
         <div style={{ marginBottom: 30 }}>
              <IndianPersonalDetails 
                  data={personal} 
                  layout="list" 
                  style={{ fontSize: 13, display: 'flex', gap: 15, flexWrap: 'wrap' }} 
              />
          </div>

        {summary && (
          <p style={{ fontSize: 13, lineHeight: 1.7, marginBottom: 30 }}>
            {summary}
          </p>
        )}

        {experience.length > 0 && (
        <section style={{ marginBottom: 30 }}>
          <h3 style={{ fontSize: 16, marginBottom: 15, borderBottom: `1px solid ${accent}`, paddingBottom: 5, color: accent }}>EXPERIENCE</h3>
          {experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div style={{ fontWeight: 600 }}>{exp.position}</div>
                  <div style={{ fontSize: 12 }}>{exp.date}</div>
              </div>
              <div style={{ fontSize: 13, fontStyle: 'italic', marginBottom: 5 }}>
                {exp.company} 
              </div>
              <ul style={{ paddingLeft: 16, margin: '6px 0' }}>
                  {Array.isArray(exp.description) ? exp.description.map((desc, idx) => (
                    <li key={idx} style={{ fontSize: 13 }}>{desc}</li>
                  )) : <li style={{ fontSize: 13 }}>{exp.description}</li>}
              </ul>
            </div>
          ))}
        </section>
        )}

        {projects.length > 0 && (
        <section style={{ marginBottom: 30 }}>
          <h3 style={{ fontSize: 16, marginBottom: 15, borderBottom: `1px solid ${accent}`, paddingBottom: 5, color: accent }}>PROJECTS</h3>
          {projects.map((p, i) => (
            <div key={i} style={{ marginBottom: 15 }}>
               <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ fontWeight: 600 }}>{p.title}</div>
                  <div style={{ fontSize: 12 }}>{p.startDate} - {p.endDate}</div>
              </div>
              {p.technologies && <div style={{ fontSize: 13, fontStyle: 'italic', marginBottom: 5 }}>{p.technologies}</div>}
              <ul style={{ paddingLeft: 16, margin: '6px 0' }}>
                  {p.description.map((desc, idx) => (
                    <li key={idx} style={{ fontSize: 13 }}>{desc}</li>
                  ))}
              </ul>
            </div>
          ))}
        </section>
        )}

        <section style={{ marginBottom: 30 }}>
           <h3 style={{ fontSize: 16, marginBottom: 15, borderBottom: `1px solid ${accent}`, paddingBottom: 5, color: accent }}>EDUCATION</h3>
           <IndianEducationTable data={education} />
        </section>

        {skills.length > 0 && (
            <section style={{ marginBottom: 30 }}>
                <h3 style={{ fontSize: 16, marginBottom: 15, borderBottom: `1px solid ${accent}`, paddingBottom: 5, color: accent }}>SKILLS</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                    {skills.map((s, i) => (
                        <span key={i} style={{ background: '#f3f4f6', padding: '5px 10px', borderRadius: 4, fontSize: 13 }}>{s}</span>
                    ))}
                </div>
            </section>
        )}

        {(achievements.length > 0 || certs.length > 0) && (
             <section>
                 <h3 style={{ fontSize: 16, marginBottom: 15, borderBottom: `1px solid ${accent}`, paddingBottom: 5, color: accent }}>ADDITIONAL</h3>
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
    </div>
  );
};

export default VerticalIdentityStripeTemplate;
