// src/data.js
import thirukkuralStructure from './detail.json';
import './App.css';

// Export the imported JSON directly
export const BOOK_STRUCTURE = thirukkuralStructure;

/**
 * FETCH LOGIC
 * Fetches the specific JSON file from the public/kurals folder.
 * (e.g. /kurals/1.json)
 */
export const fetchKuralData = async (number) => {
    try {
        // UPDATED LINE: Use process.env.PUBLIC_URL to handle GitHub Pages sub-directory
        const response = await fetch(`${process.env.PUBLIC_URL}/kurals/${number}.json`);

        if (!response.ok) {
            throw new Error(`Kural ${number} not found (Status: ${response.status})`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to load kural:", error);
        return null;
    }
};

/**
 * UI DICTIONARY
 * Localized strings for the Interface
 */
export const DICTIONARY = {
    en: {
        title: "Thirukkural VisaiNeri",
        library: "Library",
        aboutBook: "About Book",
        aboutVisai: "About VisaiNeri",
        selectPaal: "Select Section",
        selectIyal: "Select Chapter Group",
        selectAdhikaram: "Select Chapter",
        selectKural: "Select Kural", // Keep for headers if needed
        kuralLabel: "Kural",         // <--- NEW: Short label for list
        back: "Back",
        grammarError: "Grammar Violation Detected",
        grammarSuccess: "Grammar Valid",
        expandAll: "Expand All",
        collapseAll: "Collapse All",
        loading: "Loading...",
        selectPrompt: "Select a Kural to view details"
    },
    ta: {
        title: "திருக்குறள் விசைநெறி",
        library: "நூலகம்",
        aboutBook: "நூல் பற்றி",
        aboutVisai: "விசைநெறி பற்றி",
        selectPaal: "பால் தேர்வு செய்க",
        selectIyal: "இயல் தேர்வு செய்க",
        selectAdhikaram: "அதிகாரம் தேர்வு செய்க",
        selectKural: "குறள் தேர்வு செய்க",
        kuralLabel: "குறள்",         // <--- NEW: Short label for list
        back: "பின் செல்லும்",
        grammarError: "இலக்கணப் பிழை",
        grammarSuccess: "இலக்கணம் சரியானது",
        expandAll: "விரிவாக்கு",
        collapseAll: "சுருக்கு",
        loading: "ஏற்றுகிறது...",
        selectPrompt: "விளக்கத்தைக் காண ஒரு குறளைத் தேர்ந்தெடுக்கவும்"
    }
};