import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, EducationItem, SkillItem, ProjectItem, ExperienceItem, CertificationItem, AchievementItem } from '@/types/resume';
import { standardStyles } from '../../styles/standardStyles';
import IndianPersonalDetails from '../../components/IndianPersonalDetails';
import IndianEducationTable from '../../components/IndianEducationTable';

const ClearStartTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (type: string) =>
    (data?.sections || []).find(
      (s: any) => s.type === type && s.isVisible
    )?.items || [];

  const personal = (get('personal')[0] || {}) as PersonalItem;
  const education = get('education') as EducationItem[];
  const skills = (get('skills') as SkillItem[]).map(s => s.name);
  const projects = get('projects') as ProjectItem[];
  const experience = get('experience') as ExperienceItem[];
  const certs = get('certifications') as CertificationItem[];
  const achievements = get('achievements') as AchievementItem[];

  return (
    <div style={{ ...standardStyles.page, fontFamily: 'Times New Roman, serif' }}>
      <header style={{ textAlign: 'center', marginBottom: 20 }}>
        <h1 style={{ margin: '0 0 5px 0', fontSize: 24, textTransform: 'uppercase' }}>{personal.fullName}</h1>
        <div style={{ fontWeight: 600, fontSize: 14 }}>{personal.jobTitle}</div>
        <div style={{ fontSize: 13, marginTop: 5 }}>
          {[
              personal.email, 
              personal.phone, 
              personal.linkedin, 
              personal.address ? `${personal.address}${personal.pincode ? ` - ${personal.pincode}` : ''}` : null
          ].filter(Boolean).join(' | ')}
        </div>
      </header>

      {personal.objective && (
        <section style={{ marginBottom: 15, textAlign: 'center' }}>
            <p style={{ margin: 0, fontSize: 13, fontStyle: 'italic' }}>{personal.objective}</p>
        </section>
      )}

      <IndianEducationTable data={education} />

      <section style={{ marginBottom: 15 }}>
        <div style={{ borderBottom: '1px solid #000', marginBottom: 8, fontWeight: 700, textTransform: 'uppercase', fontSize: 14 }}>Skills</div>
        <div style={{ fontSize: 13, lineHeight: 1.5 }}>{skills.join(', ')}</div>
      </section>

      {projects.length > 0 && (
          <section style={{ marginBottom: 15 }}>
            <div style={{ borderBottom: '1px solid #000', marginBottom: 8, fontWeight: 700, textTransform: 'uppercase', fontSize: 14 }}>Projects</div>
            {projects.map((p, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong style={{ fontSize: 14 }}>{p.title}</strong>
                    <span style={{ fontSize: 12 }}>{p.startDate} - {p.endDate}</span>
                </div>
                {p.technologies && <div style={{ fontSize: 12, fontStyle: 'italic' }}>Technologies: {p.technologies}</div>}
                <ul style={{ paddingLeft: 16, margin: '4px 0', fontSize: 13 }}>
                    {p.description.map((desc, idx) => (
                      <li key={idx}>{desc}</li>
                    ))}
                </ul>
              </div>
            ))}
          </section>
      )}

      {experience.length > 0 && (
          <section style={{ marginBottom: 15 }}>
            <div style={{ borderBottom: '1px solid #000', marginBottom: 8, fontWeight: 700, textTransform: 'uppercase', fontSize: 14 }}>Experience / Internships</div>
            {experience.map((e, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong style={{ fontSize: 14 }}>{e.position}</strong>
                    <span style={{ fontSize: 12 }}>{e.date}</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{e.company}</div>
                <ul style={{ paddingLeft: 16, margin: '4px 0', fontSize: 13 }}>
                    {Array.isArray(e.description) ? e.description.map((desc, idx) => (
                      <li key={idx}>{desc}</li>
                    )) : <li>{e.description}</li>}
                </ul>
              </div>
            ))}
          </section>
      )}

       {(achievements.length > 0 || certs.length > 0) && (
             <section style={{ marginBottom: 15 }}>
                 <div style={{ borderBottom: '1px solid #000', marginBottom: 8, fontWeight: 700, textTransform: 'uppercase', fontSize: 14 }}>Achievements & Certifications</div>
                 <ul style={{ paddingLeft: 16, fontSize: 13, marginTop: 5 }}>
                     {achievements.map((a, i) => (
                         <li key={`a-${i}`}><strong>{a.title}</strong>: {a.description}</li>
                     ))}
                     {certs.map((c, i) => (
                         <li key={`c-${i}`}>{c.title} - {c.issuer}</li>
                     ))}
                 </ul>
             </section>
       )}

      <IndianPersonalDetails data={personal} layout="grid" style={{ marginTop: 20, paddingTop: 10, borderTop: 'double #000' }} />

    </div>
  );
};

export default ClearStartTemplate;
