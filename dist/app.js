'use strict';
const themeButton = document.getElementById('theme');
function updateThemeLabel() {
  const dark = document.documentElement.dataset.theme === 'dark';
  themeButton.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
  themeButton.setAttribute('aria-pressed', String(dark));
}
themeButton.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#141a16' : '#f8f9f6';
  try { localStorage.setItem('ej-theme', theme); } catch { /* Theme still works without storage. */ }
  updateThemeLabel();
});
updateThemeLabel();
document.getElementById('year').textContent = new Date().getFullYear();
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
  document.documentElement.classList.add('js-motion');
}
const projects = {
  ledger: { title: 'LedgerLens AI', category: 'Finance operations · Portfolio demo', problem: 'Invoice handling involves repeated transcription, checking totals, matching purchase orders, and escalating exceptions.', solution: 'The project extracts structured fields from invoices, validates them against explicit business rules, and routes uncertain or risky documents to human review. Workflow records make the decisions inspectable.', steps: 'Document intake → Extraction → Rule validation → Process or review → Audit record', note: 'Demo mode uses clearly labeled fictional invoices. Live Supabase, OpenAI, and email integration smoke testing remains pending; this is not a claim of production readiness or measured savings.', stack: 'Next.js · TypeScript · Supabase · OpenAI · Zod · n8n example', liveUrl: 'https://ledger-lens-ai.vercel.app/', url: 'https://github.com/ejpiamonte/ledgerlens-ai' },
  northstar: { title: 'Northstar AI Lead Management', category: 'Sales operations · Portfolio demo', problem: 'Inbound enquiries need consistent qualification and an understandable handoff to the right sales specialist.', solution: 'The workflow captures an enquiry, applies deterministic qualification and tiering rules, assigns a specialist, and records the steps. The public admin experience presents read-only fictional leads.', steps: 'Enquiry → Qualification → Tier rules → Assignment → Workflow record', note: 'The public demo uses a deterministic analyzer. Email and appointment actions are mock records; it does not call live AI or messaging providers. Form submissions require Supabase.', stack: 'Next.js · TypeScript · Supabase · n8n example', liveUrl: 'https://northstar-ai-lead-management.vercel.app/', url: 'https://github.com/ejpiamonte/northstar-ai-lead-management' },
  rsvp: { title: 'Niven’s First Birthday · RSVP', category: 'Event automation · Personal project', problem: 'Event invitations, guest responses, calendar details, and messages are easier to manage when they share one experience.', solution: 'A responsive invitation connects Google Forms RSVP submission with Google Sheets response tracking, calendar access, and a Supabase-backed guestbook. Framer Motion adds movement to the event experience.', steps: 'Invitation → RSVP via Google Forms → Google Sheets tracking → Admin overview', note: 'This is an event automation project, with no confirmed AI processing. Connected services are required for submissions, counts, guestbook storage, and administration. Private guest details and event photos are not reproduced here.', stack: 'Next.js · React · TypeScript · Tailwind CSS · Framer Motion · Google Forms & Sheets · Supabase', liveUrl: 'https://niven-first-birthday.vercel.app/', url: null, screenshots: [{src:'images/niven-live.png',alt:'Invitation opening screen',caption:'Live site opening screen'}] },
  dtss: { title: 'Dynatrace Self-Service Maintenance', category: 'Internal AI automation · DTSS', problem: 'An internal project focused on self-service maintenance in Dynatrace.', solution: 'A primarily custom-built internal application. The detailed workflow will be added in a future case study.', contribution: 'As an associate, I inherited this side project, improved the existing application, added features, and recreated its database.', steps: 'Dynatrace · Self-service maintenance · Internal automation', note: 'Technology and contribution details are provided by the project owner. The screenshots are included exactly as supplied. The detailed workflow will be added after it is supplied. No performance claims are made.', screenshots: ['Dashboard','Schedule','Schedule (bulk)','Calendar','Logs','Reports','Settings','Permissions','Audit history','Database explorer'].map((caption,index)=>({src:`images/dtss/image${index ? ` (${index})` : ''}.png`,alt:`DTSS ${caption} screenshot supplied by the project owner`,caption})), stack: 'HTML · CSS · JavaScript · Python (FastAPI) · SQLite · Dynatrace API · LDAP', url: null }
};
const dialog = document.getElementById('project-dialog');
let lastTrigger;
document.querySelectorAll('[data-project]').forEach(trigger => trigger.addEventListener('click', () => {
  const project = projects[trigger.dataset.project];
  lastTrigger = trigger;
  const content = document.getElementById('dialog-content');
  content.replaceChildren();
  const add = (tag, text, className) => { const element = document.createElement(tag); element.textContent = text; if (className) element.className = className; content.append(element); return element; };
  add('p', project.category, 'eyebrow');
  add('h2', project.title).id = 'dialog-title';
  add('h3', 'The problem'); add('p', project.problem);
  add('h3', 'The approach'); add('p', project.solution);
  if (project.contribution) { add('h3', 'My contribution'); add('p', project.contribution); }
  add('p', project.steps, 'steps');
  add('h3', 'Technology'); add('p', project.stack);
  add('h3', 'Project scope'); add('p', project.note);
  if (project.screenshots?.length) {
    add('h3', 'Screenshots');
    const gallery = document.createElement('div'); gallery.className = 'dialog-gallery';
    project.screenshots.forEach(item => { const figure=document.createElement('figure'); const img=document.createElement('img'); img.src=item.src; img.alt=item.alt; const caption=document.createElement('figcaption'); caption.textContent=item.caption; figure.append(img,caption); gallery.append(figure); });
    content.append(gallery);
  }
  if (project.liveUrl) { const link = add('a', 'View live project ↗', 'button primary'); link.href = project.liveUrl; link.target = '_blank'; link.rel = 'noopener noreferrer'; }
  if (project.url) { const link = add('a', 'View source on GitHub ↗', 'button'); link.href = project.url; link.target = '_blank'; link.rel = 'noopener noreferrer'; }
  dialog.showModal();
}));
document.getElementById('close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { const rect = dialog.getBoundingClientRect(); if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close(); });
dialog.addEventListener('close', () => lastTrigger?.focus());
