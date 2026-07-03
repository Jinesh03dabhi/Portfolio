# Content Verification & API Audit Log (`CONTENT-TODO.md`)

## Ship-Critical Fields Verification Status
- [x] **Name**: Verified as *Jinesh Dabhi* (Resume)
- [x] **Email**: Verified as *jinesh03dabhi@gmail.com* (Resume)
- [x] **Phone/WhatsApp**: Verified as *+91 94271 42807* / `9427142807` (Resume & Prompt)
- [x] **Featured Projects**:
  - [x] WorkoutWala (`https://workoutwala.com`)
  - [x] Enterprise HRMS (`https://hrms.bigscal.com/dashboard`)
  - [x] JD's IPL Platform (`https://jds-ipl.vercel.app`)

## Optional & Periodic Manual Review Items
- [ ] **Dev.to Article Feed**: Currently wired to fetch latest articles via `/api/devto`. If Jinesh has not published recent Dev.to articles under user handle `jineshdabhi` or similar, fallback gracefully to curated technical writing excerpts without breaking layout.
- [ ] **GitHub API Rate Limits**: The `/api/github-stats` edge handler caches public repos and star counts with Next.js `revalidate: 3600`. Periodic check recommended if GitHub username changes.
