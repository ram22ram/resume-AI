import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, EducationItem, ExperienceItem, SkillItem, ProjectItem, CertificationItem, AchievementItem } from '@/types/resume';
import { standardStyles } from '../../styles/standardStyles';
import IndianPersonalDetails from '../../components/IndianPersonalDetails';
import IndianEducationTable from '../../components/IndianEducationTable';

const SarkariStandardTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (type: string) =>
    (data?.sections || []).find(
      (s: any) => s.type === type && s.isVisible
    )?.items || [];

  const personal = (get('personal')[0] || {}) as PersonalItem;
  const education = get('education') as EducationItem[];
  const experience = get('experience') as ExperienceItem[];
  const skills = (get('skills') as SkillItem[]).map(s => s.name);
  const projects = get('projects') as ProjectItem[];
  const certifications = get('certifications') as CertificationItem[];
  const achievements = get('achievements') as AchievementItem[];

  const styles = {
    page: { ...standardStyles.page, fontFamily: 'Times New Roman, serif', fontSize: 13, lineHeight: 1.5 },
    header: { textAlign: 'center' as const, marginBottom: 20 },
    title: { textDecoration: 'underline', fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
    sectionHeader: { 
        background: '#e0e0e0', 
        padding: '3px 8px', 
        fontWeight: 'bold', 
        border: '1px solid #000', 
        marginTop: 15, 
        marginBottom: 8,
        fontSize: 14
    },
    declaration: { textAlign: 'justify' as const, marginTop: 10, textIndent: 30 }
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.title}>RESUME</div>
      </header>
      
      <div style={{ marginBottom: 15 }}>
          <div style={{ fontSize: 18, fontWeight: 'bold' }}>{personal.fullName}</div>
          <div>Mobile: {personal.phone}</div>
          <div>Email: {personal.email}</div>
          {personal.address && <div>Address: {personal.address}</div>}
      </div>

      <section>
        <div style={styles.sectionHeader}>CAREER OBJECTIVE</div>
        <div style={{ textAlign: 'justify' as const }}>
            {personal.objective || "To secure a challenging position in a reputable organization to expand my learnings, knowledge, and skills."}
        </div>
      </section>

      {experience.length > 0 && (
        <section>
          <div style={styles.sectionHeader}>WORK EXPERIENCE</div>
          {experience.map((e, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ fontWeight: 'bold' }}>{e.position}</div>
              <div>{e.company}</div>
              <div style={{ fontSize: 12, fontStyle: 'italic' }}>{e.date}</div>
              <ul style={{ margin: '3px 0', paddingLeft: 20 }}>
                 {Array.isArray(e.description) 
                    ? e.description.map((d, idx) => <li key={idx}>{d}</li>)
                    : <li>{e.description}</li>
                 }
              </ul>
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section>
          <div style={styles.sectionHeader}>ACADEMIC QUALIFICATIONS</div>
          <IndianEducationTable data={education} />
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
          <section>
              <div style={styles.sectionHeader}>PROJECTS</div>
              {projects.map((p, i) => (
                  <div key={i} style={{ marginBottom: 8 }}>
                      <div style={{ fontWeight: 'bold' }}>{p.title}</div>
                      <div>
                          {Array.isArray(p.description)
                             ? (p.description as string[]).map((d, idx) => <span key={idx}>• {d} </span>)
                             : p.description
                          }
                      </div>
                  </div>
              ))}
          </section>
      )}

      {(achievements.length > 0 || certifications.length > 0) && (
          <section>
              <div style={styles.sectionHeader}>ACHIEVEMENTS & CERTIFICATIONS</div>
              <ul style={{ paddingLeft: 20, margin: '5px 0' }}>
                  {achievements.map((a, i) => (
                      <li key={`a-${i}`}><strong>{a.title}</strong>: {a.description}</li>
                  ))}
                  {certifications.map((c, i) => (
                      <li key={`c-${i}`}>{c.title} - {c.issuer} ({c.date})</li>
                  ))}
              </ul>
          </section>
      )}

      {skills.length > 0 && (
          <section>
               <div style={styles.sectionHeader}>SKILLS</div>
               <div>{skills.join(', ')}</div>
          </section>
      )}

      <section>
        <div style={styles.sectionHeader}>PERSONAL DETAILS</div>
        <IndianPersonalDetails data={personal} layout="grid" style={{ fontSize: 13 }} />
      </section>

      <section>
          <div style={styles.sectionHeader}>DECLARATION</div>
          <p style={styles.declaration}>
              I hereby declare that all the information furnished above is true to the best of my knowledge and belief.
          </p>
          <div style={{ marginTop: 40, display: 'flex', justifyContent: 'space-between' }}>
              <div>
                  <div>Date: _________________</div>
                  <div style={{ marginTop: 5 }}>Place: _________________</div>
              </div>
              <div style={{ marginRight: 20, textAlign: 'center' as const }}>
                  <div>( {personal.fullName} )</div>
              </div>
          </div>
      </section>
    </div>
  );
};

export default SarkariStandardTemplate;
