import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, ExperienceItem, SkillItem, ProjectItem, EducationItem, SummaryItem, CertificationItem, AchievementItem } from '@/types/resume';
import { standardStyles } from '../../styles/standardStyles';
import IndianPersonalDetails from '../../components/IndianPersonalDetails';
import IndianEducationTable from '../../components/IndianEducationTable';

const VerticalPulseTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (type: string) =>
    (data?.sections || []).find(
      (s: any) => s.type === type && s.isVisible
    )?.items || [];

  const personal = (get('personal')[0] || {}) as PersonalItem;
  const summary = ((get('summary')[0] || {}) as SummaryItem).description || '';
  const experience = get('experience') as ExperienceItem[];
  const skills = (get('skills') as SkillItem[]).map(s => s.name);
  const projects = get('projects') as ProjectItem[];
  const education = get('education') as EducationItem[];
  const certifications = get('certifications') as CertificationItem[];
  const achievements = get('achievements') as AchievementItem[];

  return (
    <div style={{ ...standardStyles.page, fontFamily: 'Inter, sans-serif', padding: 40 }}>

      <header style={{ marginBottom: 25 }}>
        <h1 style={{ fontSize: 30, margin: 0 }}>{personal.fullName}</h1>
        <div style={{ fontSize: 13, marginBottom: 5 }}>{personal.jobTitle}</div>
        <IndianPersonalDetails data={personal} layout="list" style={{ fontSize: 11, display: 'flex', gap: 10, flexWrap: 'wrap' }} />
      </header>

      {summary && (
        <section style={{ marginBottom: 30 }}>
            <h3 style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>Summary</h3>
            <p style={{ fontSize: 12, lineHeight: 1.6, margin: 0 }}>{summary}</p>
        </section>
      )}

      <section style={{ position: 'relative', paddingLeft: 30 }}>
        
        {/* Timeline Line */}
        <div style={{
          position: 'absolute',
          left: 8,
          top: 0,
          bottom: 0,
          width: 2,
          backgroundColor: '#e5e7eb'
        }} />

        {/* EXPERIENCE */}
        {experience.length > 0 && (
            <div style={{ marginBottom: 30 }}>
                <h3 style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: 1, marginLeft: -30, marginBottom: 15 }}>Experience</h3>
                {experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: 25, position: 'relative' }}>
                    
                    {/* Dot */}
                    <div style={{
                    position: 'absolute',
                    left: -24,
                    top: 5,
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    backgroundColor: '#111827'
                    }} />

                    <div>
                    <strong>{exp.position}</strong>
                    <div style={{ fontSize: 11 }}>
                        {exp.company} • {exp.date}
                    </div>
                    <ul style={{ paddingLeft: 16, margin: '4px 0' }}>
                        {exp.description.map((desc, idx) => (
                            <li key={idx} style={{ fontSize: 12 }}>{desc}</li>
                        ))}
                    </ul>
                    </div>
                </div>
                ))}
            </div>
        )}

        {/* PROJECTS */}
        {projects.length > 0 && (
            <div style={{ marginBottom: 30 }}>
                <h3 style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: 1, marginLeft: -30, marginBottom: 15 }}>Projects</h3>
                {projects.map((p, i) => (
                    <div key={i} style={{ marginBottom: 20, position: 'relative' }}>
                        <div style={{ position: 'absolute', left: -24, top: 6, width: 10, height: 10, border: '2px solid #111827', borderRadius: '50%', background: 'white' }} />
                        <strong>{p.title}</strong>
                        <div style={{ fontSize: 10, color: '#555' }}>{p.startDate} - {p.endDate}</div>
                        <div style={{ fontSize: 11, fontStyle: 'italic' }}>{p.technologies}</div>
                        <ul style={{ paddingLeft: 16, margin: '4px 0' }}>
                            {p.description.map((desc, idx) => (
                                <li key={idx} style={{ fontSize: 12 }}>{desc}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        )}

        {/* EDUCATION */}
        <div style={{ marginBottom: 30 }}>
            <h3 style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: 1, marginLeft: -30, marginBottom: 15 }}>Education</h3>
            <div style={{ marginLeft: -30 }}>
                 <IndianEducationTable data={education} />
            </div>
        </div>

      </section>

      <section style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid #eee' }}>
        <h3 style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Skills</h3>
        <div style={{ fontSize: 12 }}>
          {skills.join(' • ')}
        </div>
      </section>

      {(certifications.length > 0 || achievements.length > 0) && (
          <section style={{ marginTop: 20 }}>
              <h3 style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Additional</h3>
              <ul style={{ paddingLeft: 16, fontSize: 12 }}>
                    {certifications.map((c, i) => (
                        <li key={`c-${i}`}>
                            <strong>{c.title}</strong> - {c.issuer}
                        </li>
                    ))}
                    {achievements.map((a, i) => (
                        <li key={`a-${i}`}>
                            {a.title}: {a.description}
                        </li>
                    ))}
              </ul>
          </section>
      )}

    </div>
  );
};

export default VerticalPulseTemplate;
