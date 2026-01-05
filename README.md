# Thirukkural VisaiNeri (திருக்குறள் விசைநெறி)

A React-based visualization tool for the metrical grammar (Yappu Ilakkanam) of Thirukkural. This project implements the Context Free Grammar (CFG) rules for Venpa poetry.

## 🌟 Features
- **Bilingual Support:** Full interface support for Tamil and English.
- **Interactive Tree:** Visualizes the recursive structure of Venpa (Adi -> Cheer -> Syllables).
- **Grammar Validation:** Highlights Kurals that conform to or violate strict Venpa rules.
- **Mobile Responsive:** Accordion-style navigation for mobile devices.

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mojosaurus/thirukkural-visaineri.git
    ```

2. Navigate to the project folder:
    ```bash
    cd thirukkural-visaineri
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Start the development server:
    ```bash
    npm start
    ```

The application will open in your browser at http://localhost:3000.

## 📂 Project Structure
- public/kurals/: Contains the 1330 pre-parsed JSON files for the Kurals.
- src/components/: React components (Sidebar, Visualizer, TreeNode).
- src/data.js: Data fetching logic and dictionary for localization.
- src/detail.json: The structural definition of Thirukkural (Paal, Iyal, Adhikaram hierarchy).

## 📚 Reference
This project is a computational implementation based on the research paper:

"Context Free Grammar for Natural Language constructs: An implementation for Venpa class of Tamil Poetry"

Bala Sundara Raman L, Ishwar S, Sanjeeth Kumar Ravindranath

Indian Institute of Information Technology

## 🛠 Tech Stack
- Frontend: React.js
- Styling: CSS3 (Flexbox & Grid)
- Icons: Lucide React
- Deployment: GitHub Pages

## 📄 License
This project is open source and available under the MIT License.   