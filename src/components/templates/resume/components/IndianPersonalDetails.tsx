import React from 'react';
import { PersonalItem } from '@/types/resume';

interface Props {
    data: PersonalItem;
    style?: React.CSSProperties;
    layout?: 'grid' | 'list';
}

const IndianPersonalDetails: React.FC<Props> = ({ data, style, layout = 'grid' }) => {
    const fields = [
        { label: "Father's Name", value: data.fatherName },
        { label: "Date of Birth", value: data.dateOfBirth },
        { label: "Gender", value: data.gender },
        { label: "Marital Status", value: data.maritalStatus },
        { label: "Nationality", value: data.nationality },
        { label: "Languages", value: data.languages?.join(', ') },
        { label: "Address", value: data.address ? `${data.address}${data.pincode ? ` - ${data.pincode}` : ''}` : null },
    ].filter(f => f.value);

    if (fields.length === 0) return null;

    const baseStyle = { fontSize: '0.9em', ...style };
    const rowStyle = { display: 'flex', marginBottom: 4 };
    const labelStyle = { fontWeight: 600, minWidth: 120, marginRight: 8 };

    return (
        <div style={baseStyle}>
            <div style={{ fontWeight: 700, borderBottom: '1px solid #ccc', marginBottom: 8, paddingBottom: 4, textTransform: 'uppercase' }}>
                Personal Details
            </div>
            {layout === 'grid' ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                    {fields.map((f, i) => (
                        <div key={i} style={rowStyle}>
                            <span style={labelStyle}>{f.label}:</span>
                            <span>{f.value}</span>
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    {fields.map((f, i) => (
                        <div key={i} style={rowStyle}>
                            <span style={labelStyle}>{f.label}:</span>
                            <span>{f.value}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default IndianPersonalDetails;
