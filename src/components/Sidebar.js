import React, { useState } from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
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

    // Helper to get emojis for Paal
    const getPaalIcon = (number) => {
        switch (number) {
            case 1: return "⚖️"; // Virtue
            case 2: return "💰"; // Wealth
            case 3: return "❤️"; // Love
            default: return "📖";
        }
    };

    // --- LEVEL 1: PAAL SELECTION ---
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
                            {/* Emoji Logo */}
                            <div style={{
                                fontSize: '1.5rem',
                                background: '#f1f5f9',
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '8px'
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
                <div className="sidebar-header">
                    <button className="back-link" onClick={() => setSelPaal(null)}>
                        <ArrowLeft size={14} style={{ display: 'inline', marginRight: 4 }} />
                        {dictionary.back}
                    </button>
                    <div className="section-title">
                        {getPaalIcon(selPaal.number)} {lang === 'ta' ? selPaal.name : selPaal.translation}
                    </div>
                </div>
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
                <div className="sidebar-header">
                    <button className="back-link" onClick={() => setSelIyal(null)}>
                        <ArrowLeft size={14} style={{ display: 'inline', marginRight: 4 }} />
                        {dictionary.back}
                    </button>
                    <div className="section-title">{lang === 'ta' ? selIyal.name : selIyal.translation}</div>
                </div>
                {selIyal.chapters.detail.map((adh) => (
                    <div
                        key={adh.number}
                        className="list-item"
                        onClick={() => setSelAdhikaram(adh)}
                    >
                        {/* UPDATED: Now shows both languages */}
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
            <div className="sidebar-header">
                <button className="back-link" onClick={() => setSelAdhikaram(null)}>
                    <ArrowLeft size={14} style={{ display: 'inline', marginRight: 4 }} />
                    {dictionary.back}
                </button>
                <div className="section-title">
                    {adhikaramLabel(selAdhikaram, lang)}
                </div>
            </div>

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