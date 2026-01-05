import React from 'react';
import { AlertTriangle, CheckCircle, BookOpen } from 'lucide-react'; // Added BookOpen icon
import TreeNode from './TreeNode';

const Visualizer = ({
    data,
    isLoading,
    expandedIds,
    toggleNode,
    isMobile,
    dictionary
}) => {

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
                {/* Minimal Empty State */}
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
                <div className="status-badge-container">
                    <span className={`status-badge ${hasError ? 'error' : 'success'}`}>
                        {hasError ? <AlertTriangle size={14} /> : <CheckCircle size={14} />}
                        {hasError ? dictionary.grammarError : dictionary.grammarSuccess}
                    </span>
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