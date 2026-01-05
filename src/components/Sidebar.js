import React, { useState, useEffect } from 'react';
import { ArrowLeft, ChevronRight, Home } from 'lucide-react';
import { BOOK_STRUCTURE } from '../data';

const Sidebar = ({
    dictionary,
    lang,
    onSelectKural,
    selectedKuralNumber,
    isMobile
}) => {
    const [selPaal, setSelPaal] = useState(null);
    const [selIyal, setSelIyal] = useState(null);
    const [selAdhikaram, setSelAdhikaram] = useState(null);

    // --- NEW: AUTO-NAVIGATE ON DEEP LINK ---
    useEffect(() => {
        if (selectedKuralNumber) {
            // If we are already viewing the correct Adhikaram, don't re-run (prevents jitter)
            if (selAdhikaram && selectedKuralNumber >= selAdhikaram.start && selectedKuralNumber <= selAdhikaram.end) {
                return;
            }

            // Reverse Lookup: Find the hierarchy for this Kural number
            const structure = BOOK_STRUCTURE[0]; // Access the root object

            // Iterate through Paals
            for (const paal of structure.section.detail) {
                // Iterate through Iyals
                for (const iyal of paal.chapterGroup.detail) {
                    // Iterate through Adhikarams
                    for (const adh of iyal.chapters.detail) {
                        // Check if the Kural is in this Adhikaram range
                        if (selectedKuralNumber >= adh.start && selectedKuralNumber <= adh.end) {
                            setSelPaal(paal);
                            setSelIyal(iyal);
                            setSelAdhikaram(adh);
                            return; // Found it, stop searching
                        }
                    }
                }
            }
        }
        // Note: We deliberately exclude 'selAdhikaram' from deps to avoid circular logic
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedKuralNumber]);

    // Helper to get emojis for Paal
    const getPaalIcon = (number) => {
        switch (number) {
            case 1: return "⚖️"; // Virtue
            case 2: return "₹";  // Wealth
            case 3: return "❤️"; // Love
            default: return "📖";
        }
    };

    // Helper to Reset Navigation (Home)
    const goHome = () => {
        setSelPaal(null);
        setSelIyal(null);
        setSelAdhikaram(null);
        // Optional: If you want clicking Home to also clear the selection in the main view:
        // onSelectKural(null); 
    };

    // Reusable Header Component
    const SidebarHeader = ({ onBack, title, icon }) => (
        <div className="sidebar-header">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <button className="back-link" onClick={onBack} title={dictionary.back}>
                    <ArrowLeft size={16} style={{ display: 'inline', marginRight: 4 }} />
                    {dictionary.back}
                </button>

                <button
                    className="back-link"
                    onClick={goHome}
                    title="Home"
                    style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                    <Home size={16} />
                </button>
            </div>

            <div className="section-title">
                {icon && <span style={{ marginRight: '8px' }}>{icon}</span>}
                {title}
            </div>
        </div>
    );

    // --- LEVEL 1: PAAL SELECTION (ROOT) ---
    if (!selPaal) {
        return (
            <div className="sidebar">
                <div className="sidebar-header">
                    <div className="section-title">{dictionary.selectPaal}</div>
                </div>
                {BOOK_STRUCTURE[0].section.detail.map((paal) => (
                    <div
                        key={paal.number}
                        className="list-item"
                        onClick={() => setSelPaal(paal)}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{
                                fontSize: '1.5rem',
                                background: '#f1f5f9',
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '8px',
                                fontWeight: 'bold',
                                color: '#475569'
                            }}>
                                {getPaalIcon(paal.number)}
                            </div>

                            <div>
                                <div className="item-main">{lang === 'ta' ? paal.name : paal.translation}</div>
                                <div className="item-sub">{lang === 'ta' ? paal.translation : paal.name}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    // --- LEVEL 2: IYAL SELECTION ---
    if (!selIyal) {
        return (
            <div className="sidebar">
                <SidebarHeader
                    onBack={() => setSelPaal(null)}
                    title={lang === 'ta' ? selPaal.name : selPaal.translation}
                    icon={getPaalIcon(selPaal.number)}
                />
                {selPaal.chapterGroup.detail.map((iyal) => (
                    <div
                        key={iyal.number}
                        className="list-item"
                        onClick={() => setSelIyal(iyal)}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div className="item-main">{lang === 'ta' ? iyal.name : iyal.translation}</div>
                                <div className="item-sub">{lang === 'ta' ? iyal.translation : iyal.name}</div>
                            </div>
                            <ChevronRight size={16} color="#cbd5e1" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    // --- LEVEL 3: ADHIKARAM SELECTION ---
    if (!selAdhikaram) {
        return (
            <div className="sidebar">
                <SidebarHeader
                    onBack={() => setSelIyal(null)}
                    title={lang === 'ta' ? selIyal.name : selIyal.translation}
                />
                {selIyal.chapters.detail.map((adh) => (
                    <div
                        key={adh.number}
                        className="list-item"
                        onClick={() => setSelAdhikaram(adh)}
                    >
                        <div>
                            <div className="item-main">{adh.number}. {lang === 'ta' ? adh.name : adh.translation}</div>
                            <div className="item-sub">{lang === 'ta' ? adh.translation : adh.name}</div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    // --- LEVEL 4: KURAL LIST ---
    const kuralList = [];
    for (let i = selAdhikaram.start; i <= selAdhikaram.end; i++) {
        kuralList.push(i);
    }

    return (
        <div className="sidebar">
            <SidebarHeader
                onBack={() => setSelAdhikaram(null)}
                title={adhikaramLabel(selAdhikaram, lang)}
            />

            {kuralList.map((num) => (
                <div
                    key={num}
                    className={`list-item ${selectedKuralNumber === num ? 'active' : ''}`}
                    onClick={() => onSelectKural(num)}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span className="item-main">{dictionary.kuralLabel} {num}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

// Helper for Adhikaram Label
const adhikaramLabel = (adh, lang) => {
    if (!adh) return "";
    const name = lang === 'ta' ? adh.name : adh.translation;
    return `${adh.number}. ${name}`;
}

export default Sidebar;