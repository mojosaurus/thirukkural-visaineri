import React, { useState, useEffect } from 'react';
import { Book, Info } from 'lucide-react';

import './App.css';
import { DICTIONARY, fetchKuralData } from './data';
import Sidebar from './components/Sidebar';
import Visualizer from './components/Visualizer';

function App() {
  // Global State
  // Default set to 'ta' (Tamil) as requested
  const [lang, setLang] = useState('ta'); // 'en' | 'ta'
  const [tab, setTab] = useState('library'); // 'library' | 'about'
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Data State
  const [selKuralNumber, setSelKuralNumber] = useState(null);
  const [kuralData, setKuralData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Tree Expansion State
  const [expandedIds, setExpandedIds] = useState([]);

  // Dictionary for current language
  const t = DICTIONARY[lang];

  // --- 1. WINDOW RESIZE LISTENER ---
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- 2. DATA FETCHING ---
  useEffect(() => {
    if (selKuralNumber) {
      setIsLoading(true);
      // Reset tree expansion when switching Kurals
      // We force expand the Root (root) and the Lines (root-0, root-1)
      setExpandedIds(['root', 'root-0', 'root-1']);

      fetchKuralData(selKuralNumber)
        .then(data => {
          setKuralData(data);
          setIsLoading(false);
          // Auto-switch to library tab if on mobile
          if (isMobile) setTab('library');
        });
    }
  }, [selKuralNumber, isMobile]);

  // --- 3. TREE TOGGLE LOGIC (Mobile Accordion vs Desktop) ---
  const toggleNode = (nodeId) => {
    if (expandedIds.includes(nodeId)) {
      // COLLAPSE: Remove this ID and all its children IDs
      setExpandedIds(prev => prev.filter(id => id !== nodeId && !id.startsWith(nodeId + '-')));
    } else {
      // EXPAND
      if (isMobile) {
        // Mobile Logic: Single path expansion. 
        // 1. Find the parent of the node we are opening
        const parentId = nodeId.substring(0, nodeId.lastIndexOf('-'));

        // 2. Keep the parent open, but close all other siblings
        const newExpanded = expandedIds.filter(id => {
          // Keep root
          if (id === 'root') return true;
          // Keep the path leading up to this node
          if (nodeId.startsWith(id)) return true;
          // Keep nodes that are NOT siblings of the current target
          // (Simple check: does it share the same parent prefix?)
          const myParent = id.substring(0, id.lastIndexOf('-'));
          return myParent !== parentId;
        });

        setExpandedIds([...newExpanded, nodeId]);
      } else {
        // Desktop Logic: Just add it to the list
        setExpandedIds(prev => [...prev, nodeId]);
      }
    }
  };

  // --- 4. RENDER HELPERS ---
  const renderContent = () => {
    if (tab === 'about') {
      return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', overflowY: 'auto' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>{t.aboutVisai}</h1>
          <p style={{ lineHeight: 1.6, color: '#334155' }}>
            VisaiNeri is a computational implementation of the Context Free Grammar (CFG) for Tamil poetry constructs, specifically "Venpa".
            This project visualizes the recursive structure of Thirukkural based on the grammar rules defined in the research paper:
          </p>
          <div style={{ background: '#eff6ff', padding: '1rem', borderRadius: '8px', marginTop: '1rem', border: '1px solid #bfdbfe' }}>
            <strong>Reference:</strong><br />
            Bala Sundara Raman L, Ishwar S, Sanjeeth Kumar Ravindranath. <br />
            [cite_start]<em>"Context Free Grammar for Natural Language constructs: An implementation for Venpa class of Tamil Poetry"</em> [cite: 5]
          </div>
        </div>
      );
    }

    return (
      <div className="main-layout">
        <Sidebar
          dictionary={t}
          lang={lang}
          onSelectKural={setSelKuralNumber}
          selectedKuralNumber={selKuralNumber}
          isMobile={isMobile}
        />
        <Visualizer
          data={kuralData}
          isLoading={isLoading}
          expandedIds={expandedIds}
          toggleNode={toggleNode}
          isMobile={isMobile}
          dictionary={t}
        />
      </div>
    );
  };

  return (
    <div className="app-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="brand">
          <div style={{ background: '#2563eb', color: 'white', width: 32, height: 32, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
            வி
          </div>
          <span>{t.title}</span>
        </div>

        <div className="nav-actions">
          <button
            className={`nav-btn ${tab === 'library' ? 'active' : ''}`}
            onClick={() => setTab('library')}
            title={t.library}
          >
            <Book size={20} />
          </button>
          <button
            className={`nav-btn ${tab === 'about' ? 'active' : ''}`}
            onClick={() => setTab('about')}
            title={t.aboutVisai}
          >
            <Info size={20} />
          </button>

          <button
            className="lang-toggle"
            onClick={() => setLang(l => l === 'en' ? 'ta' : 'en')}
            style={{ fontSize: '1.1rem', padding: '4px 10px' }} // Adjusted padding for the characters
            title={lang === 'en' ? "Switch to Tamil" : "Switch to English"}
          >
            {/* If currently English, show Tamil option (அ). If currently Tamil, show English option (a). */}
            {lang === 'en' ? 'அ' : 'a'}
          </button>
        </div>
      </nav>

      {/* Body */}
      {renderContent()}
    </div>
  );
}

export default App;