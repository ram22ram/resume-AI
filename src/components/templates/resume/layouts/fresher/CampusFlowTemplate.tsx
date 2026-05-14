import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, EducationItem, SkillItem, ProjectItem, ExperienceItem, CertificationItem, AchievementItem } from '@/types/resume';
import { standardStyles } from '../../styles/standardStyles';
import IndianPersonalDetails from '../../components/IndianPersonalDetails';
import IndianEducationTable from '../../components/IndianEducationTable';

const CampusFlowTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (type: string) =>
    (data?.sections || []).find(
      (s: any) => s.type === type && s.isVisible
    )?.items || [];

  const p = (get('personal')[0] || {}) as PersonalItem;
  const edu = get('education') as EducationItem[];
  const skills = (get('skills') as SkillItem[]).map(s => s.name);
  const projects = get('projects') as ProjectItem[];
  const exp = get('experience') as ExperienceItem[];
  const certs = get('certifications') as CertificationItem[];
  const achievements = get('achievements') as AchievementItem[];

  return (
    <div style={{ ...standardStyles.page, fontFamily: 'Inter, sans-serif' }}>
      <header style={{ marginBottom: 20, textAlign: 'center' }}>
        <h1 style={{ marginBottom: 5 }}>{p.fullName}</h1>
        <div style={{ fontWeight: 600, color: '#444', marginBottom: 8 }}>{p.jobTitle || 'Graduate / Student'}</div>
        <div style={{ fontSize: 13, color: '#666' }}>
             {p.email} | {p.phone} {p.linkedin && `| ${p.linkedin}`}
        </div>
        {p.address && <div style={{ fontSize: 13, color: '#666' }}>{p.address} {p.pincode && `- ${p.pincode}`}</div>}
      </header>

      {p.objective && (
        <section style={{ marginBottom: 20, textAlign: 'center', maxWidth: '90%', margin: '0 auto 20px auto' }}>
             <p style={{ fontStyle: 'italic', color: '#555' }}>"{p.objective}"</p>
        </section>
      )}

      <IndianEducationTable data={edu} />

      <section style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 16, borderBottom: '2px solid #eee', paddingBottom: 5, marginBottom: 10, textTransform: 'uppercase' }}>Skills</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {skills.map((s, i) => (
            <span key={i} style={{ 
                fontSize: 12, 
                border: '1px solid #ccc', 
                padding: '4px 10px', 
                borderRadius: 15,
                background: '#f9f9f9'
            }}>{s}</span>
          ))}
        </div>
      </section>

      {exp.length > 0 && (
        <section style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 16, borderBottom: '2px solid #eee', paddingBottom: 5, marginBottom: 10, textTransform: 'uppercase' }}>Experience</h2>
          {exp.map((e, i) => (
            <div key={i} style={{ marginBottom: 15 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <strong>{e.position}</strong>
                  <span style={{ fontSize: 12, color: '#666' }}>{e.date}</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{e.company}</div>
               <ul style={{ paddingLeft: 18, margin: '4px 0', fontSize: 13 }}>
                   {Array.isArray(e.description) ? e.description.map((d, idx) => (
                       <li key={idx}>{d}</li>
                   )) : <li>{e.description}</li>}
               </ul>
            </div>
          ))}
        </section>
      )}

      <section style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 16, borderBottom: '2px solid #eee', paddingBottom: 5, marginBottom: 10, textTransform: 'uppercase' }}>Projects</h2>
        {projects.map((p, i) => (
          <div key={i} style={{ marginBottom: 15 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>{p.title}</strong>
                <span style={{ fontSize: 12 }}>{p.startDate} - {p.endDate}</span>
            </div>
            {p.technologies && <div style={{ fontSize: 12, color: '#007bff', marginBottom: 2 }}>{p.technologies}</div>}
             <ul style={{ paddingLeft: 16, margin: '4px 0', fontSize: 13 }}>
                {p.description.map((desc, idx) => (
                  <li key={idx}>{desc}</li>
                ))}
            </ul>
             <div style={{ fontSize: 12 }}>
                {p.githubLink && <a href={p.githubLink} style={{ marginRight: 15 }}>Code</a>}
                {p.liveLink && <a href={p.liveLink}>Live Demo</a>}
            </div>
          </div>
        ))}
      </section>

      {achievements.length > 0 && (
         <section style={{ marginBottom: 20 }}>
            <h2 style={{ fontSize: 16, borderBottom: '2px solid #eee', paddingBottom: 5, marginBottom: 10, textTransform: 'uppercase' }}>Achievements & Certifications</h2>
            <ul style={{ fontSize: 13, paddingLeft: 18 }}>
                {achievements.map((a, i) => (
                    <li key={`a-${i}`}>
                        <strong>{a.title}</strong>: {a.description}
                    </li>
                ))}
                 {certs.map((c, i) => (
                    <li key={`c-${i}`}>
                        {c.title} by {c.issuer}
                    </li>
                ))}
            </ul>
         </section>
      )}

      <IndianPersonalDetails data={p} style={{ marginTop: 20, paddingTop: 15, borderTop: '2px solid #eee' }} layout="list" />

    </div>
  );
};

export default CampusFlowTemplate;
