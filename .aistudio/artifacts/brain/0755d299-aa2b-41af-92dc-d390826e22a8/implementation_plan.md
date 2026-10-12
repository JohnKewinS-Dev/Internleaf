# Internleaf — Futuristic Mint-Green Glassmorphism Internship Platform

A comprehensive, production-grade internship platform connecting ambitious students with innovative tech companies, styled with an authentic mint-green glassmorphism aesthetic, interactive 3D visual geometry, and end-to-end recruitment workflows for both student seekers and corporate employers, under the official title and brand **Internleaf**.

***

### User Review & Critical Decisions

> [!IMPORTANT]
> **Confirmed Feedback**: The platform brand and web title is officially set to **Internleaf** (Tagline: *"Your Future Starts With the Right Internship"*).

- **Brand & Web Title**: Confirmed as **Internleaf** across the web document `<title>`, OpenGraph meta tags, top navigation glass bar, and footer.
- **Dual-Mode Demo & Interactive Auth**: Pre-configured demo profiles for both a Student (`Alex Chen - Stanford CS`) and a Company (`QuantumPay Fintech / Acme Robotics`) will be provided alongside fully validated registration and login forms. This allows zero-friction instant evaluation while keeping real validation and session isolation intact.
- **Interactive 3D Glass Hero**: A hardware-accelerated Canvas 3D particle and floating glass polyhedral mesh with cursor-reactive parallax and soft floating cards, avoiding bulky external 3D asset dependencies while delivering fluid 60fps animations.
- **Full End-to-End Recruitment Loop**: State will be reactively shared across a unified persistent client data store (using `localStorage`). When a student applies for an internship, it instantly appears in the company's applicant pipeline; when the company moves their status to "Interview Scheduled", the student's timeline and interview tab reflect it immediately.

***

## 1. Overview & Core Concept

- **What It Does**: **Internleaf** provides a premium marketplace where students can explore verified internships, filter across technical domains and work styles, track application timelines, and manage resumes. Simultaneously, employers can publish multi-section internship listings, review candidate profiles, manage applicant pipelines (Applied $\rightarrow$ Review $\rightarrow$ Shortlist $\rightarrow$ Interview $\rightarrow$ Offer), and schedule interviews.
- **Target Audience / Personas**:
  1. *Internship Seekers*: College students, recent graduates, and career changers looking for high-quality paid and remote software, design, data, AI, and business internships.
  2. *Internship Providers / Recruiters*: Talent acquisition leads and hiring managers seeking student talent with verifiable technical skills, GitHub projects, and structured application pipelines.
- **Key Value**: Replaces chaotic email threads and fragmented job boards with a transparent, unified glassmorphism command center with real-time status visibility.

***

## 2. User Experience & Visual Design

### A. Key User Flows

1. **Discovery & Exploration (Public / Landing)**:
   - Visitors land on a floating translucent glass navigation bar with the **Internleaf** leaf-glyph brand wordmark and clean navigation links.
   - The hero showcases a dynamic 3D floating glass canvas with interactive depth, clear value propositions, and role-based entry paths ("I'm a Student" vs. "I'm a Company").
   - A live 4-column metric strip highlights active internships, verified employers, placed students, and average stipends.
   - Visitors can browse featured internships directly or transition smoothly into the authentication portal.

2. **Student Journey**:
   - Split-screen mint-glass login/registration with degree, graduation year, skills, and resume upload.
   - Personalized student dashboard featuring application metrics, recommended postings, and an advanced search panel.
   - 14+ technical category filters (AI/ML, Web, Cybersecurity, UI/UX, Cloud, Data, etc.) plus stipend range, work type (Remote/Hybrid/On-site), and duration.
   - 1-click application modal with custom cover note, skills matching indicator, and resume submission.
   - Visual application tracker with step-by-step progress bars and interview schedules.
   - Profile editor with completion progress meter, GitHub/LinkedIn links, and resume management.

3. **Employer / Company Journey**:
   - Company verification and login portal with company details, industry, and logo branding.
   - Recruiter command center with active job counters, applicant review queues, and candidate metrics.
   - Multi-step "Post an Internship" wizard covering Role Essentials, Skill Requirements & Experience, Perks & Stipend, and Screening Questions.
   - Candidate management dashboard with status progression buttons (Shortlist, Schedule Interview, Offer, Reject) and direct candidate messaging/notes.
   - Interview scheduler creating calendar invites and video conference links.

### B. Visual Identity & Theme

- **Aesthetic Direction**: Premium Mint Glassmorphism & High-Tech Cleanliness. Soft ambient glows, 20–28px rounded glass cards with frosted backdrop blurs (`backdrop-blur-md`), hairline translucent borders (`rgba(255,255,255,0.45)` and `rgba(49,196,141,0.2)`), subtle specular reflections, and comfortable optical whitespace.
- **Color Palette & Tokens**:
  - *Mint Green (Primary Highlight)*: `#98F6D5` (Bright mint accent)
  - *Soft Mint Surface*: `#DDFBF0` / `#E8FDF5` (Frosted panels and active states)
  - *Canvas Background*: `#F4FFF9` blending into `#F0FDF4` and `#E0F2FE` (Soft mint-to-sky gradient)
  - *Dark Green (Deep Text & Contrast)*: `#123C32` (Headings, primary buttons, structural darks)
  - *Accent Green (Actions)*: `#31C48D` (Interactive focus, tags, buttons)
  - *Text Primary*: `#18332C` (High legibility, WCAG AA compliant against light mint)
  - *Text Muted*: `#4A6B62` (Unboxed metadata, captions, secondary stats)
  - *Pure White Surface*: `#FFFFFF` with varying opacities (`rgba(255,255,255,0.7)` to `rgba(255,255,255,0.92)`)
- **Typography & Hierarchy**:
  - Display Face: `Plus Jakarta Sans` / modern geometric sans for hero headlines (`clamp(2.25rem, 4vw, 3.5rem)`), section titles, and brand wordmark.
  - Body Face: Clean system neo-grotesque (`Plus Jakarta Sans` / `system-ui`) with balanced line heights (1.6) and balanced headline wrapping (`text-wrap: balance`).
  - Numbers & Metrics: Tabular numerals (`tabular-nums font-mono` where appropriate) for application counts, stipends, and timestamps.
- **Anti-Slop Discipline**:
  - No candy pill badge sandwiches or decorative pulsing green dots.
  - Clean unboxed metadata with typographic separators (`·`).
  - Single-elevation glass surfaces; no chaotic card nesting.
  - Zero-latency page transitions with smooth spring animations via `motion`.

***

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Client-Authoritative Reactive State with LocalStorage Persistence**:
  - *Chosen Approach*: Implement a custom reactive store syncing to `localStorage` with initial seed data containing 8+ diverse internships, 4 companies, pre-filled applications, and instant demo account switching.
  - *Why*: Allows instant testing of both student and employer perspectives without database latency or third-party authentication roadblocks, while persisting all user edits, new job postings, and application status transitions across page reloads.
- **Decision 2: Interactive 3D Canvas Visual Engine**:
  - *Chosen Approach*: Use a native HTML5 Canvas 3D rendering loop with floating prism geometries, particle field physics, and cursor parallax coupled with CSS 3D floating glass internship cards.
  - *Why*: Delivers 60fps lightweight performance without heavy multi-megabyte bundle overhead or WebGL context loss errors, achieving high visual fidelity and immediate interactivity.
- **Decision 3: Seamless Role-Switching Navigation**:
  - *Chosen Approach*: Provide a subtle, persistent role switcher in the header and quick-login helpers on auth screens.
  - *Why*: Evaluators can test a student applying for a "Machine Learning Intern" role, switch to the employer view in one click, and immediately see the new applicant in the recruitment queue.

***

## 4. Technical Architecture & Data Strategy

### System Architecture & View Hierarchy

```
┌────────────────────────────────────────────────────────────────────────┐
│                              App.tsx                                   │
│            (Router, Global Toast, Persistent State Provider)           │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
         ┌─────────────────────────┼─────────────────────────┐
         │                         │                         │
         ▼                         ▼                         ▼
┌──────────────────┐     ┌───────────────────┐     ┌───────────────────┐
│   Landing Page   │     │   Auth Screens    │     │    Dashboards     │
│  - Internleaf Nav│     │ - Student Login   │     │ - Student Portal  │
│  - 3D Hero Scene │     │ - Student Reg.    │     │ - Company Portal  │
│  - 4-Stat Strip  │     │ - Company Login   │     │ - Route Guards    │
│  - Job Discovery │     │ - Company Reg.    │     │                   │
│  - Bento Preview │     │ - Demo Logins     │     │                   │
│  - Glass Footer  │     └───────────────────┘     └─────────┬─────────┘
└──────────────────┘                                         │
                                   ┌─────────────────────────┴─────────┐
                                   ▼                                   ▼
                         ┌───────────────────┐               ┌───────────────────┐
                         │ Student Dashboard │               │ Company Dashboard │
                         │ - Overview Stats  │               │ - Pipeline Stats  │
                         │ - Filter & Search │               │ - Post Wizard     │
                         │ - Apply Modal     │               │ - Job Manager     │
                         │ - App Tracker     │               │ - Candidate Queue │
                         │ - Saved Jobs      │               │ - Interview Setup │
                         │ - Profile/Resume  │               │ - Company Profile │
                         └───────────────────┘               └───────────────────┘
```

### Data Entities & Schema

1. **User Profile**:
   - `id`, `role` (`'student' | 'company'`), `name`, `email`, `avatar`
   - *Student fields*: `college`, `degree`, `gradYear`, `skills`, `resumeUrl`, `resumeName`, `github`, `linkedin`, `bio`
   - *Company fields*: `companyName`, `industry`, `website`, `description`, `verified`, `location`

2. **Internship Post**:
   - `id`, `companyId`, `companyName`, `companyLogo`, `title`, `department`, `location`, `workType` (`'Remote' | 'On-site' | 'Hybrid'`), `isPaid` (boolean), `stipend` (string / number), `duration` (e.g. "3 Months"), `skills` (string[]), `description`, `requirements` (string[]), `perks` (string[]), `deadline`, `postedDate`, `applicantsCount`

3. **Application**:
   - `id`, `internshipId`, `internshipTitle`, `companyName`, `studentId`, `studentName`, `studentEmail`, `studentCollege`, `studentDegree`, `studentSkills`, `resumeName`, `appliedDate`, `status` (`'Applied' | 'Under Review' | 'Shortlisted' | 'Interview Scheduled' | 'Selected' | 'Rejected'`), `notes`, `timeline` (`{ status, date, note }[]`), `interviewDetails` (`{ date, time, link, interviewer }`)

### Key Interactive Components

- `GlassNavbar`: Floating header with Internleaf brand wordmark, public links, auth CTA, and active user badge.
- `Hero3DCanvas`: Interactive canvas animation with floating geometric crystal meshes, dynamic depth, and soft particle dust.
- `InternshipCard`: Translucent frosted card with hover 3D tilt, subtle mint border glow, key details, save button, and apply action.
- `FilterPanel`: Multi-category selector, search bar, stipend slider, remote/hybrid pills, and clear controls.
- `ApplyModal`: Multi-field submission dialog with auto-filled student profile data, custom note, and resume attachment.
- `ApplicationTimeline`: Visual horizontal/vertical milestone stepper showing current recruitment stage.
- `PostInternshipWizard`: 4-step employer form with validation, preview mode, and instant publishing.
- `CandidatePipeline`: Recruiter candidate manager with stage transitions, profile preview, and interview scheduling.
