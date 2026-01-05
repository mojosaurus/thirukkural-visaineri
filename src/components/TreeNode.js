import React from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

const TreeNode = ({ node, depth, expandedIds, toggleNode, isMobile, pathId }) => {
    // 1. Initial Data Normalization
    let children = node.structure || node.feet || node.children || [];
    let label = node.tamil_type || node.type;
    let value = node.value;

    // --- FLATTENING LOGIC ---
    // If this is a Cheer (Foot) node and it has exactly one child (the Metrical Pattern),
    // we merge them into a single node to simplify the tree.
    const isCheerNode = node.type === 'Cheer' || node.tamil_type === 'சீர்' ||
        node.type === 'EetruCheer' || node.tamil_type === 'ஈற்றுச்சீர்';

    if (isCheerNode && children.length === 1) {
        const patternNode = children[0];
        const patternLabel = patternNode.tamil_type || patternNode.type;

        // Merge the labels (e.g., "புளிமா" + " " + "சீர்")
        label = `${patternLabel} ${label}`;

        // Skip the intermediate level: 
        // The children of this combined node will be the grandchildren (Syllables like Ner/Nirai)
        children = patternNode.children || [];

        // Note: We keep the 'value' from the parent Cheer node, as it's usually identical.
    }
    // -------------------------

    const hasChildren = children.length > 0;

    // 2. Use the pathId passed from parent, or default to 'root'
    const nodeId = pathId || 'root';
    const isExpanded = expandedIds.includes(nodeId);

    const handleClick = (e) => {
        e.stopPropagation();
        if (hasChildren) {
            toggleNode(nodeId);
        }
    };

    return (
        <div className="node-wrapper">
            {/* The Node Box */}
            <div
                className={`node-box ${hasChildren ? 'has-children' : ''} ${isExpanded ? 'expanded' : ''}`}
                onClick={handleClick}
                role="button"
                aria-expanded={isExpanded}
            >
                <div className="node-label">
                    {label}
                    {/* Show chevron on mobile to indicate expandability */}
                    {isMobile && hasChildren && (
                        <span style={{ float: 'right', opacity: 0.5 }}>
                            {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                        </span>
                    )}
                </div>

                {/* Only show value if it's different from the label (avoids redundancy) */}
                {value && value !== label && <div className="node-value">{value}</div>}
            </div>

            {/* The Children (Recursive Render) */}
            {hasChildren && isExpanded && (
                <div className="children-container">
                    {children.map((child, index) => {
                        // Create a unique path ID for the child
                        const childPathId = `${nodeId}-${index}`;

                        return (
                            <div key={childPathId} className="child-branch">
                                <TreeNode
                                    node={child}
                                    depth={depth + 1}
                                    expandedIds={expandedIds}
                                    toggleNode={toggleNode}
                                    isMobile={isMobile}
                                    pathId={childPathId}
                                />
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default TreeNode;