import React from 'react';
import { EducationItem } from '@/types/resume';

interface Props {
    data: EducationItem[];
    style?: React.CSSProperties;
}

const IndianEducationTable: React.FC<Props> = ({ data, style }) => {
    if (!data || data.length === 0) return null;

    const tableStyle: React.CSSProperties = {
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: '0.9em',
        ...style
    };

    const thStyle: React.CSSProperties = {
        border: '1px solid #ccc',
        padding: '6px 8px',
        textAlign: 'left',
        backgroundColor: '#f5f5f5',
        fontWeight: 600
    };

    const tdStyle: React.CSSProperties = {
        border: '1px solid #ccc',
        padding: '6px 8px'
    };

    return (
        <div style={{ marginTop: 10, marginBottom: 15 }}>
            <div style={{ fontWeight: 700, borderBottom: '1px solid #ccc', marginBottom: 8, paddingBottom: 4, textTransform: 'uppercase', fontSize: '1em' }}>
                Education
            </div>
            <div style={{ overflowX: 'auto' }}>
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>Qualification</th>
                            <th style={thStyle}>Institution</th>
                            <th style={thStyle}>Board/University</th>
                            <th style={thStyle}>Year</th>
                            <th style={thStyle}>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td style={tdStyle}>{item.standard || item.degree}</td>
                                <td style={tdStyle}>{item.institution}</td>
                                <td style={tdStyle}>{item.board || '-'}</td>
                                <td style={tdStyle}>{item.yearOfPassing || item.date}</td>
                                <td style={tdStyle}>{item.percentage || item.cgpa || '-'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default IndianEducationTable;
