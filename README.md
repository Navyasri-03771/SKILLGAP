# SkillGap — Job Skill Gap Analyzer

> **Tagline:** *"Know your gap. Learn what matters. Get job-ready."*  
> **Team:** Team 9 — Final-Year CSE AI Vibe Coding Project

---

## 1. Project Overview

**SkillGap** is a student-focused, educational employability web application designed to help engineering and computer science students understand how their current technical skills match up against real-world industry requirements.

Instead of guessing what technologies to study, students select their desired career role, input the tools and languages they already know, and receive an instant, mathematically accurate **Job Readiness Score**, a side-by-side gap breakdown, and a **prioritized learning roadmap** (High, Medium, and Low priority).

---

## 2. Problem Statement

> *"Students often struggle to identify which skills they are missing for their target job. They need a simple way to compare their current skills with industry-required skills. SkillGap analyzes the gap and recommends what they should learn next, based on priority."*

Many engineering students master core fundamentals like HTML, CSS, JavaScript, or Python, but are unaware of whether these alone suffice for roles such as *Frontend Developer*, *Backend Developer*, *Data Analyst*, or *Java Developer*. SkillGap bridges this information void with clear, transparent, and actionable guidance.

---

## 3. Five Core Features

SkillGap strictly implements **five core user-facing features**:

1. **Target Job Role Selection:**
   - 5 benchmark roles:
     - **Frontend Developer** (HTML, CSS, JavaScript, Git, React, REST API, TypeScript)
     - **Backend Developer** (JavaScript, Node.js, Express.js, MongoDB, REST API, Git, Authentication)
     - **Python Developer** (Python, OOP, SQL, Git, REST API, Flask, Data Structures)
     - **Data Analyst** (Python, SQL, Excel, Statistics, Power BI, Data Visualization, Pandas)
     - **Java Developer** (Java, OOP, SQL, Git, Data Structures, Spring Boot, REST API)
   - Interactive card grid and synchronized dropdown selector with clear active selection states.

2. **Current Skills Selection:**
   - Multi-select interactive chip selector covering 23 core skills.
   - Distinct active selection state (`✓ SkillName`) with quick demo presets (Frontend Core, Python Core, Data Core) and bulk actions (Select All, Clear).
   - Validates that at least one skill is chosen before analysis.

3. **Skill Gap Analysis & Job Readiness:**
   - Calculates the exact readiness percentage:
     $$\text{Readiness Percentage} = \text{round}\left(\frac{\text{Matching Required Skills}}{\text{Total Required Skills}} \times 100\right)$$
   - Circular visual meter, score badge, and contextual interpretation:
     - **0–39%:** *"Start with the core skills for this role."*
     - **40–69%:** *"You're building a good foundation. Focus on the missing priority skills."*
     - **70–89%:** *"You're close to a strong skill match. Strengthen the remaining gaps."*
     - **90–100%:** *"Your selected skills closely match this sample role."*
   - Categorized lists for **Skills You Have** (`✓`) and **Skills You're Missing** (`○`).

4. **Learning Priority & Progress:**
   - Missing skills are sorted and displayed by predefined priority:
     - 🔴 **HIGH PRIORITY**
     - 🟠 **MEDIUM PRIORITY**
     - 🟢 **LOW PRIORITY**
   - Each missing skill card displays an explanation of its role relevance and a progress toggle:
     - `[ Mark as Learned ]` (sets progress to 100%)
     - `[ Mark as Learning ]` (toggles back to 0%)
   - Progress is persisted across browser sessions via `localStorage`.

5. **Save & Reset Analysis:**
   - Automatically serializes analysis and learning progress into `localStorage`.
   - Restores the latest analysis on subsequent visits with a confirmation notification.
   - Includes a safe **Reset Analysis** modal workflow (`[ Cancel ]` vs `[ Reset ]`) that cleans up stored state and resets the workspace cleanly without affecting unrelated browser data.

---

## 4. Technologies Used

- **Framework:** React 19 (TypeScript)
- **Bundler & Dev Server:** Vite
- **Styling:** Tailwind CSS (v4) with responsive utility layout
- **Icons:** Lucide React
- **Storage:** Browser `localStorage` (offline-first, zero cloud dependencies)
- **Deployment Target:** Vercel / Cloud Run / Static SPA

---

## 5. How the SkillGap Algorithm Works

```
1. Retrieve selected job role and its required skills array R.
2. Retrieve student's selected skills array S.
3. Normalize skill strings (case-insensitive trim).
4. Compute Matching Skills M = { skill ∈ R | skill ∈ S }.
5. Compute Missing Skills G = { skill ∈ R | skill ∉ S }.
6. Calculate Readiness % = Math.round((|M| / |R|) * 100).
7. Sort Missing Skills G by Priority: HIGH (1) -> MEDIUM (2) -> LOW (3).
8. Render Readiness Score, Matching Skills, Missing Skills, and Learning Cards.
```

### Verified Test Scenarios

| Test Case | Role | Selected Skills | Expected Matched | Expected % | Missing Skills Sorted |
|:---|:---|:---|:---:|:---:|:---|
| **Test 1** | Frontend Developer | HTML, CSS, JavaScript, Git | 4 / 7 | **57%** | React (HIGH), REST API (MED), TypeScript (LOW) |
| **Test 2** | Python Developer | Python, OOP, SQL, Git | 4 / 7 | **57%** | Data Structures (HIGH), REST API (MED), Flask (LOW) |
| **Test 3** | Data Analyst | Python, SQL, Excel | 3 / 7 | **43%** | Statistics (HIGH), Power BI (MED), Pandas (MED), Data Viz (LOW) |
| **Test 4** | Frontend Developer | All 7 Frontend skills | 7 / 7 | **100%** | *"Great! You matched all sample skills for this role."* |
| **Test 5** | None | HTML, CSS | — | — | *"Please select a target job role first."* |
| **Test 6** | Frontend Developer | None | — | — | *"Please select at least one skill to analyze your skill gap."* |

---

## 6. LocalStorage Usage

SkillGap utilizes two isolated LocalStorage keys:

- `skillGapAnalysis`: Stores the serialized JSON payload containing `selectedJobId`, `selectedSkills`, `matchingSkills`, `missingSkills`, `readinessPercentage`, and `analyzedAt`.
- `skillGapProgress`: Stores a key-value record mapping skill names to completion percentages (e.g. `{ "React": 100 }`).

All reading and writing routines are wrapped in safe `try/catch` blocks to prevent crashes in restricted or private browsing environments.

---

## 7. How to Run Locally

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/team9/skillgap.git
cd skillgap

# Install dependencies
npm install

# Start local development server
npm run dev
```

The application will run locally on `http://localhost:3000`.

### Building for Production
```bash
npm run build
npm run preview
```

---

## 8. Future AI Upgrade (Roadmap)

While this MVP operates 100% locally with zero external API dependencies, the architecture is ready for future AI integration:

- **AI Job Description Parser:** Allow students to paste any raw job posting (from LinkedIn, Indeed, etc.).
- **Automatic Skill Extraction:** Leverage Google Gemini via server-side endpoints to extract technical requirements and map them against student skills.
- **Dynamic Learning Recommendations:** Generate personalized project suggestions to fill identified skill gaps.

---

## 9. Deployment Instructions (Vercel)

1. Push your repository to GitHub.
2. Log in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import the `skillgap` repository.
4. Framework Preset: Select **Vite**.
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Click **Deploy**.

---

## 10. Educational Disclaimer

*SkillGap is an educational employability tool developed by Team 9 for college demonstration and academic evaluation. Skill requirements and readiness percentages represent sample benchmarks for learning guidance and do not guarantee employment or interview offers.*
