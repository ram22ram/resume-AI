import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, SummaryItem, ExperienceItem, SkillItem, EducationItem, ProjectItem } from '@/types/resume';
import { standardStyles } from '../../styles/standardStyles';
import IndianPersonalDetails from '../../components/IndianPersonalDetails';
import IndianEducationTable from '../../components/IndianEducationTable';

const BoardroomGridTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (type: string) =>
    (data?.sections || []).find(
      (s: any) => s.type === type && s.isVisible
    )?.items || [];

  const p = (get('personal')[0] || {}) as PersonalItem;
  const summary = ((get('summary')[0] || {}) as SummaryItem).description || '';
  const exp = get('experience') as ExperienceItem[];
  const skills = (get('skills') as SkillItem[]).map(s => s.name);
  const education = get('education') as EducationItem[];
  const projects = get('projects') as ProjectItem[];
  const certifications = get('certifications') as any[];
  const achievements = get('achievements') as any[];

  return (
    <div style={{ ...standardStyles.page, fontFamily: 'Inter, sans-serif' }}>
      
      <header style={{
        borderBottom: '2px solid #000',
        paddingBottom: 20,
        marginBottom: 30
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
            <h1 style={{ margin: 0 }}>{p.fullName}</h1>
            <strong style={{ fontSize: 18 }}>{p.jobTitle}</strong>
            </div>
            <div style={{ textAlign: 'right' }}>
                <IndianPersonalDetails 
                    data={p} 
                    layout="list" 
                    style={{ fontSize: 12, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }} 
                />
            </div>
        </div>
      </header>

      {summary && (
        <section style={{ marginBottom: 30 }}>
          <h2 style={{ fontSize: 18, borderBottom: '1px solid #ddd', paddingBottom: 5 }}>Leadership Summary</h2>
          <p style={{ lineHeight: 1.6 }}>{summary}</p>
        </section>
      )}

      {exp.length > 0 && (
      <section style={{ marginBottom: 30 }}>
        <h2 style={{ fontSize: 18, borderBottom: '1px solid #ddd', paddingBottom: 5 }}>Experience</h2>
        {exp.map((e, i) => (
          <div key={i} style={{
            display: 'grid',
            gridTemplateColumns: '1fr 3fr',
            marginBottom: 20,
            gap: 20
          }}>
            <div style={{ color: '#555', fontSize: 14 }}>
                <div>{e.date}</div>
                <div style={{ fontWeight: 'bold' }}>{e.company}</div>
            </div>
            <div>
              <strong style={{ fontSize: 16 }}>{e.position}</strong>
              <ul style={{ paddingLeft: 16, margin: '6px 0' }}>
                  {e.description.map((desc, idx) => (
                    <li key={idx} style={{ fontSize: '10pt', lineHeight: 1.5 }}>{desc}</li>
                  ))}
              </ul>
            </div>
          </div>
        ))}
      </section>
      )}

      {projects.length > 0 && (
          <section style={{ marginBottom: 30 }}>
            <h2 style={{ fontSize: 18, borderBottom: '1px solid #ddd', paddingBottom: 5 }}>Key Projects</h2>
            {projects.map((pr, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', marginBottom: 20, gap: 20 }}>
                     <div style={{ color: '#555', fontSize: 14 }}>
                         <div>{pr.startDate} - {pr.endDate}</div>
                         <div style={{ fontStyle: 'italic', fontSize: 12 }}>{pr.technologies}</div>
                     </div>
                     <div>
                         <strong style={{ fontSize: 16 }}>{pr.title}</strong>
                         <ul style={{ paddingLeft: 16, margin: '6px 0' }}>
                            {pr.description.map((desc, idx) => (
                                <li key={idx} style={{ fontSize: '10pt', lineHeight: 1.5 }}>{desc}</li>
                            ))}
                         </ul>
                     </div>
                </div>
            ))}
          </section>
      )}

      {skills.length > 0 && (
      <section style={{ marginBottom: 30 }}>
        <h2 style={{ fontSize: 18, borderBottom: '1px solid #ddd', paddingBottom: 5 }}>Strategic Skills</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {skills.map((s, i) => (
            <span key={i} style={{ background: '#eee', padding: '4px 8px', borderRadius: 4 }}>{s}</span>
          ))}
        </div>
      </section>
      )}

      <section style={{ marginBottom: 30 }}>
        <h2 style={{ fontSize: 18, borderBottom: '1px solid #ddd', paddingBottom: 5 }}>Education</h2>
        <IndianEducationTable data={education} />
      </section>

      {(certifications.length > 0 || achievements.length > 0) && (
          <section>
              <h2 style={{ fontSize: 18, borderBottom: '1px solid #ddd', paddingBottom: 5 }}>Additional</h2>
              <ul style={{ paddingLeft: 16 }}>
                  {certifications.map((c, i) => (
                      <li key={`c-${i}`}><strong>{c.title}</strong> - {c.issuer}</li>
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

export default BoardroomGridTemplate;
