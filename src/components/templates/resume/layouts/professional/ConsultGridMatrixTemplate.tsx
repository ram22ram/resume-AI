import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, ExperienceItem, SkillItem, EducationItem, ProjectItem } from '@/types/resume';
import { standardStyles } from '../../styles/standardStyles';
import IndianPersonalDetails from '../../components/IndianPersonalDetails';
import IndianEducationTable from '../../components/IndianEducationTable';

const ConsultGridMatrixTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (type: string) =>
    (data?.sections || []).find(
      (s: any) => s.type === type && s.isVisible
    )?.items || [];

  const personal = (get('personal')[0] || {}) as PersonalItem;
  const experience = get('experience') as ExperienceItem[];
  const skills = (get('skills') as SkillItem[]).map(s => s.name);
  const education = get('education') as EducationItem[];
  const projects = get('projects') as ProjectItem[];
  const certifications = get('certifications') as any[];
  const achievements = get('achievements') as any[];

  return (
    <div style={{ ...standardStyles.page, fontFamily: 'Inter, sans-serif', color: '#1a1a1a' }}>
      
      <header style={{ marginBottom: 25 }}>
        <h1 style={{ margin: 0 }}>{personal.fullName}</h1>
        <div style={{ fontSize: 13 }}>{personal.jobTitle}</div>
        <IndianPersonalDetails 
            data={personal} 
            layout="list" 
            style={{ fontSize: 12, marginTop: 5, display: 'flex', gap: 15, flexWrap: 'wrap' }} 
        />
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 30 }}>
        
        {/* Left Column */}
        <div>
          {experience.length > 0 && (
          <section style={{ marginBottom: 30 }}>
            <h3 style={{ borderBottom: '2px solid #000', paddingBottom: 4 }}>Experience</h3>
            {experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: 15 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong>{exp.position}</strong>
                    <span style={{ fontSize: 11, whiteSpace: 'nowrap' }}>{exp.date}</span>
                </div>
                <div style={{ fontSize: 13, fontStyle: 'italic', marginBottom: 2 }}>{exp.company}</div>
                <ul style={{ paddingLeft: 16, margin: '4px 0' }}>
                    {exp.description.map((desc, idx) => (
                        <li key={idx} style={{ fontSize: 12 }}>{desc}</li>
                    ))}
                </ul>
                </div>
            ))}
          </section>
          )}

          {projects.length > 0 && (
          <section style={{ marginBottom: 30 }}>
            <h3 style={{ borderBottom: '2px solid #000', paddingBottom: 4 }}>Projects</h3>
            {projects.map((p, i) => (
                <div key={i} style={{ marginBottom: 15 }}>
                     <strong>{p.title}</strong>
                     <div style={{ fontSize: 11, color: '#666' }}>{p.startDate} - {p.endDate}</div>
                     {p.technologies && <div style={{ fontSize: 11, fontStyle: 'italic' }}>{p.technologies}</div>}
                     <ul style={{ paddingLeft: 16, margin: '4px 0' }}>
                        {p.description.map((d, idx) => <li key={idx} style={{ fontSize: 12 }}>{d}</li>)}
                     </ul>
                </div>
            ))}
          </section>
          )}

           <section>
              <h3 style={{ borderBottom: '2px solid #000', paddingBottom: 4 }}>Education</h3>
              <IndianEducationTable data={education} />
           </section>
        </div>

        {/* Right Column */}
        <div>
          {skills.length > 0 && (
          <section style={{ marginBottom: 30 }}>
            <h3 style={{ borderBottom: '2px solid #000', paddingBottom: 4 }}>Skills</h3>
            <ul style={{ paddingLeft: 16 }}>
                {skills.map((s, i) => (
                <li key={i} style={{ fontSize: 12, marginBottom: 4 }}>{s}</li>
                ))}
            </ul>
          </section>
          )}

          {(certifications.length > 0 || achievements.length > 0) && (
              <section>
                  <h3 style={{ borderBottom: '2px solid #000', paddingBottom: 4 }}>Aditional</h3>
                   {certifications.length > 0 && (
                       <div style={{ marginBottom: 15 }}>
                           <h4 style={{ fontSize: 14, marginBottom: 5 }}>Certifications</h4>
                           <ul style={{ paddingLeft: 16 }}>
                               {certifications.map((c, i) => <li key={i} style={{ fontSize: 12 }}>{c.title}</li>)}
                           </ul>
                       </div>
                   )}
                   {achievements.length > 0 && (
                       <div>
                           <h4 style={{ fontSize: 14, marginBottom: 5 }}>Achievements</h4>
                           <ul style={{ paddingLeft: 16 }}>
                               {achievements.map((a, i) => <li key={i} style={{ fontSize: 12 }}>{a.title}</li>)}
                           </ul>
                       </div>
                   )}
              </section>
          )}
        </div>

      </div>
    </div>
  );
};

export default ConsultGridMatrixTemplate;
