---
phase: 01-foundation
plan: 03
subsystem: infra
tags: [vercel, env-vars, cloudflare, ci-cd, gitignore]

# Dependency graph
requires:
  - phase: 01-foundation-01
    provides: Next.js 16 scaffold with git repo initialized
provides:
  - .env.example documenting NEXT_PUBLIC_CLOUDFLARE_URL for Cloudflare CDN
  - .gitignore updated to allow .env.example to be tracked
  - .env.local with placeholder Cloudflare URL for local dev
  - Pending: Vercel project linked with auto-deploy on main (awaiting user auth)
affects: [04-media, all phases using NEXT_PUBLIC_CLOUDFLARE_URL]

# Tech tracking
tech-stack:
  added: [vercel-cli (deployment)]
  patterns: [env-var naming convention NEXT_PUBLIC_CLOUDFLARE_URL, .env.example as committed documentation]

key-files:
  created:
    - .env.example
    - .env.local
  modified:
    - .gitignore

key-decisions:
  - ".gitignore updated with !.env.example negation so the example file can be tracked while all other .env* files remain ignored"
  - "NEXT_PUBLIC_CLOUDFLARE_URL uses placeholder value until Vidit provides real Cloudflare subdomain URL"
  - "Vercel deployment requires user authentication — gh CLI not available on this machine"

patterns-established:
  - "Pattern 1: .env.example committed to git as documentation; .env.local created locally but gitignored"
  - "Pattern 2: NEXT_PUBLIC_* prefix for client-accessible env vars"

requirements-completed: [FOUND-06, FOUND-07]

# Metrics
duration: ~15min
completed: 2026-03-19
---

# Phase 1 Plan 03: Vercel Deployment + Env Vars Summary

**Environment variable infrastructure established with .env.example committed; Vercel deployment awaiting user authentication and GitHub repo creation**

## Performance

- **Duration:** ~15 min
- **Started:** 2026-03-19T00:00:00Z
- **Completed:** 2026-03-19 (paused at checkpoint — Vercel auth required)
- **Tasks:** 1 of 2 (local setup complete; Vercel deploy pending user action)
- **Files modified:** 3

## Accomplishments
- Created `.env.example` documenting `NEXT_PUBLIC_CLOUDFLARE_URL` with placeholder value
- Created `.env.local` with placeholder Cloudflare URL for local development (gitignored)
- Updated `.gitignore` to allow `.env.example` to be tracked while keeping all other `.env*` files ignored
- Verified `.env.local` is not tracked by git (`git ls-files .env.local` returns empty)

## Task Commits

Each task was committed atomically:

1. **Task 1: Configure environment variables (local setup)** - `0101fe5` (feat)

**Plan metadata:** pending final docs commit

## Files Created/Modified
- `.env.example` - Documents NEXT_PUBLIC_CLOUDFLARE_URL with placeholder and usage comment
- `.env.local` - Local dev env with placeholder value (gitignored, not committed)
- `.gitignore` - Added `!.env.example` negation to allow example file to be tracked

## Decisions Made
- The `.gitignore` had `.env*` which would have blocked `.env.example` from being committed. Added `!.env.example` negation rule — this is standard practice for documenting required env vars without exposing secrets.
- Vercel deployment requires authenticated Vercel CLI session and a GitHub remote. The `gh` CLI is not available on this machine, so the user must create the GitHub repo and run the Vercel deploy manually.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed .gitignore blocking .env.example from being tracked**
- **Found during:** Task 1 (Configure environment variables)
- **Issue:** The existing `.gitignore` had `.env*` which matched `.env.example`, preventing it from being committed to document required env vars
- **Fix:** Added `!.env.example` negation rule immediately after the `.env*` line in `.gitignore`
- **Files modified:** `.gitignore`
- **Verification:** `git check-ignore -v .env.example` confirms the negation takes effect; `git status` shows `.env.example` as untracked (ready to add), `.env.local` correctly hidden
- **Committed in:** `0101fe5` (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 bug — gitignore blocking committed documentation file)
**Impact on plan:** Required fix for correctness. Without it, `.env.example` could not be committed.

## Issues Encountered
- Vercel CLI not authenticated: `npx vercel whoami` prompted for login with device auth URL. This is an authentication gate — user must authenticate Vercel CLI and create GitHub remote before deployment can proceed.
- `gh` (GitHub CLI) not available: Cannot auto-create GitHub repository. User must create it manually or via GitHub web UI.

## User Setup Required

The following steps require user action before Vercel deployment can complete:

1. **Create GitHub repository** and push:
   ```
   # On GitHub.com, create a new repo named "vidit-portfolio" (public or private)
   git remote add origin https://github.com/YOUR_USERNAME/vidit-portfolio.git
   git push -u origin master
   ```

2. **Authenticate Vercel CLI:**
   ```
   npx vercel login
   ```

3. **Link and deploy to Vercel:**
   ```
   npx vercel --yes
   npx vercel --prod --yes
   ```

4. **Set Cloudflare env var on Vercel:**
   ```
   npx vercel env add NEXT_PUBLIC_CLOUDFLARE_URL production preview development
   # When prompted, enter: https://placeholder.example.com
   ```

5. **Verify deployment** by visiting the Vercel URL shown in step 3 output.

## Next Phase Readiness
- Local env var infrastructure complete — `.env.example` committed, `.env.local` in place
- Blocking on Vercel authentication + GitHub repo creation before deployment goes live
- Once Vercel deployment confirmed, Phase 2 (Hero section) can proceed — it has no runtime dependency on Vercel being live

---
*Phase: 01-foundation*
*Completed: 2026-03-19 (partial — awaiting Vercel checkpoint)*
