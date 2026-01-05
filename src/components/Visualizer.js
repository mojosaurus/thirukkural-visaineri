import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, BookOpen, Share2, Check } from 'lucide-react';
import TreeNode from './TreeNode';

const Visualizer = ({
    data,
    isLoading,
    expandedIds,
    toggleNode,
    isMobile,
    dictionary
}) => {
    // Local state for the "Copied!" feedback
    const [copied, setCopied] = useState(false);

    const handleShare = () => {
        // Copies the current URL (which is kept in sync by App.js)
        navigator.clipboard.writeText(window.location.href).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
        });
    };

    // 1. Loading State
    if (isLoading) {
        return (
            <div className="visualizer" style={{ alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ color: '#94a3b8' }}>{dictionary.loading}</div>
            </div>
        );
    }

    // 2. Empty State (No Kural selected)
    if (!data) {
        return (
            <div className="visualizer" style={{ alignItems: 'center', justifyContent: 'center', padding: 20, background: '#f8fafc' }}>
                <div style={{ textAlign: 'center', color: '#cbd5e1' }}>
                    <BookOpen size={48} style={{ opacity: 0.5, marginBottom: '1rem' }} />
                    <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{dictionary.selectPrompt}</div>
                </div>
            </div>
        );
    }

    const hasError = data.status === 'failed';

    return (
        <div className="visualizer">
            {/* Header Section */}
            <div className="kural-header">

                {/* Top Row: Status Badge and Share Button */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div className="status-badge-container" style={{ marginBottom: 0 }}>
                        <span className={`status-badge ${hasError ? 'error' : 'success'}`}>
                            {hasError ? <AlertTriangle size={14} /> : <CheckCircle size={14} />}
                            {hasError ? dictionary.grammarError : dictionary.grammarSuccess}
                        </span>
                    </div>

                    {/* Share Button */}
                    <button
                        onClick={handleShare}
                        style={{
                            background: copied ? '#dcfce7' : '#f1f5f9',
                            color: copied ? '#166534' : '#475569',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontSize: '0.85rem',
                            fontWeight: 500,
                            transition: 'all 0.2s'
                        }}
                    >
                        {copied ? <Check size={14} /> : <Share2 size={14} />}
                        {copied ? 'Copied!' : 'Share'}
                    </button>
                </div>

                <h2 className="kural-title">{dictionary.kuralLabel} {data.number}</h2>
                <div className="kural-text">{data.value}</div>

                {/* Error Block */}
                {hasError && data.errors && data.errors.length > 0 && (
                    <div className="error-details">
                        <strong>Error Details:</strong>
                        <ul style={{ margin: '5px 0 0 20px', padding: 0 }}>
                            {data.errors.map((err, i) => (
                                <li key={i}>{err}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Tree Section */}
            <div className="tree-container">
                <TreeNode
                    node={data}
                    pathId="root"
                    depth={0}
                    expandedIds={expandedIds}
                    toggleNode={toggleNode}
                    isMobile={isMobile}
                />
            </div>
        </div>
    );
};

export default Visualizer;