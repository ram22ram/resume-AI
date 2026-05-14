export const standardStyles = {
    page: {
        width: '210mm',
        minHeight: '297mm',
        padding: '20mm',
        backgroundColor: 'white',
        color: '#000',
        boxSizing: 'border-box' as const,
        fontSize: '11pt',
        lineHeight: 1.5,
    },
    fonts: {
        serif: '"Times New Roman", Times, serif',
        sans: '"Arial", "Helvetica", sans-serif',
        modern: '"Inter", "Roboto", sans-serif',
        mono: '"Fira Code", "Roboto Mono", monospace',
    },
    margins: {
        standard: '20mm',
        compact: '15mm',
    },
    colors: {
        black: '#000000',
        darkGrey: '#333333',
        lightGrey: '#666666',
        border: '#cccccc',
        accent: {
            blue: '#2563eb',
            navy: '#1e3a8a',
            teal: '#0d9488',
        }
    }
};
