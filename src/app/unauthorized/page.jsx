'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const UnauthorizedPage = () => {
    const router = useRouter();

    // Inline styles for quick integration. 
    // If you use Tailwind CSS, you can easily replace these with utility classes.
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundColor: '#f8fafc',
            color: '#1e293b',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            padding: '20px',
            textAlign: 'center',
        },
        card: {
            backgroundColor: '#ffffff',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
            maxWidth: '480px',
            width: '100%',
        },
        iconContainer: {
            fontSize: '64px',
            color: '#ef4444', 
            marginBottom: '16px',
        },
        heading: {
            fontSize: '28px',
            fontWeight: '700',
            marginBottom: '12px',
            color: '#0f172a',
        },
        text: {
            fontSize: '16px',
            color: '#64748b',
            marginBottom: '24px',
            lineHeight: '1.5',
        },
        buttonContainer: {
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
        },
        primaryButton: {
            backgroundColor: '#2563eb', 
            color: '#ffffff',
            padding: '10px 20px',
            borderRadius: '6px',
            border: 'none',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
        },
        secondaryButton: {
            backgroundColor: '#f1f5f9',
            color: '#475569',
            padding: '10px 20px',
            borderRadius: '6px',
            border: '1px solid #e2e8f0',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.iconContainer} aria-hidden="true">
                    🚫
                </div>
                <h1 style={styles.heading}>403 - Access Denied</h1>
                <p style={styles.text}>
                    Oops! You do not have permission to access this page. It looks like you are trying to view something restricted to a different role.
                </p>
                <div style={styles.buttonContainer}>
                    <button 
                        style={styles.secondaryButton} 
                        onClick={() => router.back()}
                    >
                        Go Back
                    </button>
                    <button 
                        style={styles.primaryButton} 
                        onClick={() => router.push('/')}
                    >
                        Return Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UnauthorizedPage;