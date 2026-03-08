# Agent Rules — Cape Date Project

## Communication Style
- Always respond with: **Plan**, **What I Need**, **Next Actions**
- Break large tasks into numbered subtasks before executing
- After each subtask, summarise what was done and what comes next
- Ask for clarification before building if a requirement is ambiguous

## Code Quality
- TypeScript strict mode: always define types, no `any`
- All components must be functional with hooks — no class components
- Use Zustand for all client-side state (no prop drilling)
- Keep components under 150 lines; split into sub-components if larger
- Use Tailwind utility classes only — no inline styles, no custom CSS files
- All API calls must have loading states and error handling
- Add `console.error` logs for all caught errors

## File Structure
```
src/
  components/       # Reusable UI components
  pages/            # Route-level page components
  store/            # Zustand stores
  lib/              # Supabase client, helpers, utils
  data/             # Static activity data and coordinates
  types/            # TypeScript interfaces
  hooks/            # Custom React hooks
```

## Git Discipline
- Commit after each completed feature, not mid-build
- Commit messages: `feat: add quiz screen`, `fix: drag-and-drop reorder`, etc.
- Never commit `.env` or secrets

## Security Rules
- Never expose Supabase service key on frontend — use anon key only
- Share tokens must be validated server-side before returning plan data
- Tokens expire after 7 days — enforce in database query
- Enable Supabase Row Level Security (RLS) on all tables:
  - `profiles`: users can only read/write their own row
  - `date_plans`: users can only read/write their own plans; public can read by share_token if not expired

## Performance
- Lazy load page components with `React.lazy` and `Suspense`
- Activity images (if added): use `loading="lazy"` and WebP format
- Debounce the search input by 300ms
- Memoize scored/filtered activity list with `useMemo`

## Accessibility
- All interactive elements must have accessible labels
- Colour contrast must meet WCAG AA minimum
- Drag-and-drop must have keyboard fallback (arrow keys to reorder)
- Form inputs must have visible labels (not just placeholders)

## Do Not
- Do not use `localStorage` or `sessionStorage` — use Supabase for persistence
- Do not hardcode API keys anywhere in source code
- Do not use CSS-in-JS libraries (styled-components, emotion)
- Do not use class-based components
- Do not skip error boundaries on route-level pages
- Do not use `dangerouslySetInnerHTML`
