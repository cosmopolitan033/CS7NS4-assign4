const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column' as const,
        height: '100vh',
        width: '100vw',
        backgroundColor: '#f9f9f9',
        boxSizing: 'border-box' as const,
    },
    header: {
        textAlign: 'center' as const,
        marginBottom: '10px',
    },
    title: {
        fontSize: '28px',
        color: '#333',
    },
    inputContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        padding: '10px 0',
    },
    dateContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        padding: '10px 0',
    },
    selectContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px 0',
    },
    label: {
        fontSize: '16px',
    },
    input: {
        padding: '8px',
        fontSize: '14px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        width: '200px',
    },
    select: {
        padding: '8px',
        fontSize: '14px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        width: '250px',
    },
    button: {
        padding: '8px 16px',
        fontSize: '14px',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    chartContainer: {
        flex: 0.8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        maxWidth: '90%',
        maxHeight: '80%',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    chart: {
        width: '100%',
        height: '100%',
    },
    loading: {
        fontSize: '18px',
        color: '#555',
    },
    error: {
        fontSize: '18px',
        color: 'red',
    },
    correlationContainer: {
        padding: '20px',
        backgroundColor: '#f9f9f9',
    } as React.CSSProperties,
    correlationTitle: {
        fontSize: '24px',
        marginBottom: '10px',
    } as React.CSSProperties,
    correlationTable: {
        width: '100%',
        borderCollapse: 'collapse' as 'collapse',
    } as React.CSSProperties,
    tableHeader: {
        border: '1px solid #ddd',
        padding: '8px',
        backgroundColor: '#f2f2f2',
    } as React.CSSProperties,
    tableCell: {
        border: '1px solid #ddd',
        padding: '8px',
    } as React.CSSProperties,
};

export default styles;


