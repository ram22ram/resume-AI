import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, ExperienceItem, SkillItem, ProjectItem, EducationItem, CertificationItem, AchievementItem } from '@/types/resume';
import { standardStyles } from '../../styles/standardStyles';
import IndianPersonalDetails from '../../components/IndianPersonalDetails';
import IndianEducationTable from '../../components/IndianEducationTable';

const VerticalTimelineTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (type: string) =>
    (data?.sections || []).find(
      (s: any) => s.type === type && s.isVisible
    )?.items || [];

  const p = (get('personal')[0] || {}) as PersonalItem;
  const exp = get('experience') as ExperienceItem[];
  const skills = (get('skills') as SkillItem[]).map(s => s.name);
  const projects = get('projects') as ProjectItem[];
  const edu = get('education') as EducationItem[];
  const certs = get('certifications') as CertificationItem[];
  const achievements = get('achievements') as AchievementItem[];

  return (
    <div style={{ ...standardStyles.page, fontFamily: 'Inter, sans-serif' }}>
      <header style={{ marginBottom: 30, borderBottom: '2px solid #000', paddingBottom: 20 }}>
        <h1 style={{ margin: 0, fontSize: 32 }}>{p.fullName}</h1>
        <strong style={{ fontSize: 16, display: 'block', marginTop: 5 }}>{p.jobTitle}</strong>
         <div style={{ marginTop: 15 }}>
            <IndianPersonalDetails 
                data={p} 
                layout="list" 
                style={{ fontSize: 12, display: 'flex', gap: 15, flexWrap: 'wrap' }} 
            />
        </div>
      </header>

      {exp.length > 0 && (
      <section>
        <h2 style={{ fontSize: 20, marginBottom: 20 }}>Experience</h2>
        <div style={{ borderLeft: '2px solid #111', paddingLeft: 20, marginLeft: 10 }}>
          {exp.map((e, i) => (
            <div key={i} style={{ marginBottom: 30, position: 'relative' }}>
              <div style={{
                width: 12,
                height: 12,
                background: '#111',
                borderRadius: '50%',
                position: 'absolute',
                left: -27,
                top: 5,
                border: '2px solid #fff'
              }} />
              <div style={{ fontSize: 16, fontWeight: 700 }}>{e.position}</div>
              <div style={{ fontSize: 14, fontStyle: 'italic', marginBottom: 2 }}>{e.company}</div>
              <div style={{ fontSize: 12, color: '#555', marginBottom: 6 }}>{e.date}</div>
              <ul style={{ paddingLeft: 16, margin: '6px 0' }}>
                  {Array.isArray(e.description) ? e.description.map((desc, idx) => (
                    <li key={idx} style={{ fontSize: 13, marginBottom: 3 }}>{desc}</li>
                  )) : <li style={{ fontSize: 13 }}>{e.description}</li>}
              </ul>
            </div>
          ))}
        </div>
      </section>
      )}

      {projects.length > 0 && (
      <section style={{ marginTop: 20 }}>
        <h2 style={{ fontSize: 20, marginBottom: 20 }}>Projects</h2>
         <div style={{ borderLeft: '2px solid #111', paddingLeft: 20, marginLeft: 10 }}>
            {projects.map((proj, i) => (
            <div key={i} style={{ marginBottom: 20, position: 'relative' }}>
                 <div style={{
                    width: 10,
                    height: 10,
                    background: '#555',
                    borderRadius: '50%',
                    position: 'absolute',
                    left: -26,
                    top: 6
                }} />
                <div style={{ fontSize: 15, fontWeight: 700 }}>{proj.title}</div>
                <div style={{ fontSize: 12, color: '#555', marginBottom: 4 }}>{proj.startDate} - {proj.endDate}</div>
                {proj.technologies && <div style={{ fontSize: 12, fontStyle: 'italic' }}>{proj.technologies}</div>}
                <ul style={{ paddingLeft: 16, margin: '4px 0' }}>
                    {proj.description.map((desc, idx) => (
                    <li key={idx} style={{ fontSize: 13 }}>{desc}</li>
                    ))}
                </ul>
            </div>
            ))}
         </div>
      </section>
      )}

      <section style={{ marginTop: 30 }}>
        <h2 style={{ fontSize: 20, marginBottom: 15 }}>Education</h2>
        <IndianEducationTable data={edu} />
      </section>

      {skills.length > 0 && (
      <section style={{ marginTop: 30 }}>
        <h2 style={{ fontSize: 20, marginBottom: 15 }}>Skills</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {skills.map((s, i) => (
            <span key={i} style={{ background: '#eee', padding: '5px 10px', borderRadius: 4, fontSize: 13 }}>{s}</span>
          ))}
        </div>
      </section>
      )}

      {(achievements.length > 0 || certs.length > 0) && (
          <section style={{ marginTop: 30 }}>
              <h2 style={{ fontSize: 20, marginBottom: 15 }}>Additional</h2>
               <ul style={{ paddingLeft: 16, fontSize: 13, lineHeight: 1.6 }}>
                     {certs.map((c, i) => <li key={`c-${i}`}><strong>{c.title}</strong> - {c.issuer}</li>)}
                     {achievements.map((a, i) => <li key={`a-${i}`}><strong>{a.title}</strong>: {a.description}</li>)}
                 </ul>
          </section>
      )}

    </div>
  );
};

export default VerticalTimelineTemplate;
