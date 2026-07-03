# Differentiation Audit — Jinesh Dabhi Portfolio v2 ("Split Second")

## Purpose
This audit analyzes recurring design patterns across recent Awwwards "Site of the Day" developer portfolios and top Dribbble/Bento.me profiles. Any pattern listed below under **Banned Clichés** is strictly banned from this build by default, unless replaced by the **Split Second Execution** derived from Jinesh Dabhi's actual track-and-field sprint training and software engineering expertise.

---

## Pattern Audit & Domain Replacements

| # | Recurring Cliché Pattern (Banned) | Why It Fails Differentiations | "Split Second" Material Difference (Required Execution) |
|---|---|---|---|
| 1 | **Generic Dark Hero + Glowing Gradient Blob** | Every AI-generated or boilerplate portfolio places a floating purple/cyan blur blob behind headings with arbitrary floating easing. | **Drive Phase Block-Start Acceleration**: No gradient blobs. The hero load sequence mimics a 0–10m track start (~1.6s split). Content accelerates in with steep front-loaded velocity (`[0.65, 0, 0.35, 1]`) and crisp typography against clean dark `#0a0a0a` space. |
| 2 | **Typewriter Rotating Tagline** | The standard character-by-character typewriter loop ("I am a developer \| designer \| creator") is overused and visually repetitive. | **Photo-Finish Timing-Gate Wipe**: Text reveals via a razor-sharp horizontal light-line clip-path transition, emulating a photo-finish camera beam break at the finish line. |
| 3 | **Fake Animated Skill Progress Bars** | Progress bars that animate to arbitrary percentages (e.g., "React 95%", "Node 85%") lack verifiable proof and erode engineering credibility. | **Recency + Shipped Repo Evidence Tags**: Skills are backed by verified project metadata and co-usage data (e.g., *"React — used in 6 shipped projects, most recent: WorkoutWala (2026)"*). |
| 4 | **Floating Particle.js / Matrix Rain Backgrounds** | Random drifting dots or falling code add CPU/GPU drain without semantic connection to the developer's identity. | **Track Lane Distance Markers & Subtle R3F Geometry**: Background structure consists of precise lane-line rules and distance lap markers (`10m`, `50m`, `100m`) and a low-poly stylized starting block structure that respects `prefers-reduced-motion`. |
| 5 | **Ad-Hoc Inline Easing (`easeInOut`)** | Elements transition with mismatched durations and standard browser easing, creating a disjointed visual feel. | **Centralized Race Phase Curves**: All motion strictly imports from `lib/motion.ts` representing the 4 race phases: `drive` (entrances), `acceleration` (scroll reveals), `maxVelocity` (micro-interactions ≤100ms response ceiling), and `deceleration` (exits). |
| 6 | **Generic Bento-Grid Project Cards** | Card layouts with standard fade-in-on-scroll and disconnected decorative borders. | **Timing-Gate Sweep + Pointer-Tracked Clamped 3D Tilt**: Cards trigger a beam-break light line across their top edge when entering the viewport, and feature pointer-tracked 3D tilt clamped strictly to ±6deg to prevent gimmickry. |
| 7 | **Decorative/Isolated Skills List** | Static grid of icons or random word clouds with no functional link to shipped work. | **Interactive Skills Constellation**: Network graph nodes connected by actual project co-usage in `lib/data.ts`. Clicking any skill node immediately filters the Projects section via FLIP transitions. |

---

## Hard Architectural Gates
1. **≤100ms Reaction Ceiling**: Every interactive hover, active, or focus state must give visual feedback within 100ms (the IAAF false-start threshold).
2. **Zero Unverified Claims**: No skill percentages or hypothetical metrics. All project cards link to live URLs or verified repository data.
3. **Reduced Motion Fallback**: When `prefers-reduced-motion: reduce` is detected, 3D R3F scenes swap to clean static SVGs and complex scroll animations convert to immediate opacity reveals.
