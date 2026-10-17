'use strict';
const themeButton = document.getElementById('theme');
function updateThemeLabel() {
  const dark = document.documentElement.dataset.theme === 'dark';
  themeButton.setAttribute('aria-pressed', String(dark));
  themeButton.title = `Switch to ${dark ? 'light' : 'dark'} theme`;
  document.querySelector('meta[name="theme-color"]').content = dark ? '#141a16' : '#f8f9f6';
}
themeButton.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme;
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
  ledger: { title: 'LedgerLens AI', category: 'Finance operations · Portfolio demo', problem: 'Invoice handling involves repeated transcription, checking totals, matching purchase orders, catching duplicates, and escalating exceptions to the right approver.', solution: 'AI reads each invoice into structured fields, deterministic rules check arithmetic, dates, purchase orders, duplicates, and changed bank details, and only the exceptions reach a person. The demo runs the same engine for a two-location restaurant group and a three-entity enterprise with tiered approvals, so you can compare a small-business and an enterprise policy side by side.', steps: 'Document intake → AI extraction → Rule validation → Auto-approve or route to the right approver → Audit trail', note: 'The demo uses generated, clearly labeled fictional invoices evaluated by the real rules engine. Review decisions work in the demo and are stored only in your browser. Impact figures are illustrative estimates from editable assumptions, not measured savings. Live Supabase and OpenAI smoke testing remains pending.', stack: 'Next.js · TypeScript · Supabase · OpenAI · Zod · n8n example', liveUrl: 'https://ledger-lens-ai.vercel.app/', url: 'https://github.com/ejpiamonte/ledgerlens-ai', screenshots: [['overview.png','Operations overview with guided tour','Small-business operations overview with KPIs, daily volume, and exception reasons'],['review-detail.png','Reviewing a flagged duplicate','Review screen for a possible duplicate invoice with highlighted fields and reviewer guidance'],['enterprise-overview.png','Enterprise workspace','Enterprise operations overview across three legal entities'],['review-queue.png','Review queue · approvers and targets','Enterprise review queue with priority, approval level, and review-target status'],['documents.png','Documents · search and filters','Documents list with search, decision and risk filters'],['vendors.png','Vendors · spend and exception rate','Vendor table with spend and exception rates'],['automation-runs.png','Automation runs','Automation run history with step counts and durations'],['how-it-works.png','How it works · small vs enterprise','How it works page comparing small-business and enterprise policies']].map(([file,caption,alt])=>({src:`images/ledgerlens-automation/${file}`,alt:`LedgerLens ${alt}`,caption})) },
  northstar: { title: 'Northstar AI Lead Management', category: 'Sales operations · Portfolio demo', problem: 'Inbound enquiries need a fast reply, consistent qualification, and an understandable handoff to the right sales specialist.', solution: 'Each enquiry is scored, tiered by explicit rules, and routed to the least-loaded specialist for that tier, within the right territory for larger teams. The lead gets an instant reply and high-value leads get a call proposed. The demo shows the same engine running a three-person team and a twelve-rep team across North America, EMEA, and APAC, and the form explains exactly why a lead was routed.', steps: 'Enquiry → Scoring → Tier rules → Territory and workload routing → Reply and follow-up → Workflow record', note: 'The public demo uses a deterministic analyzer and a generated, fictional 30-day pipeline. Emails and meetings are logged, not sent, and the demo runs without a database. Impact figures are illustrative estimates, not measured results.', stack: 'Next.js · TypeScript · Supabase · Zod · n8n example', liveUrl: 'https://northstar-ai-lead-management.vercel.app/', url: 'https://github.com/ejpiamonte/northstar-ai-lead-management', screenshots: [['admin-overview.png','Team dashboard with guided tour','Lead qualification dashboard with KPIs, daily leads by tier, and funnel'],['lead-detail.png','Why a lead was routed','Lead detail explaining the score, tier rule, and routing decision'],['enterprise-overview.png','Enterprise · 12 reps, 3 territories','Enterprise dashboard with territory-based team workload'],['leads-list.png','Leads · filters by tier, owner, territory','Filterable leads list'],['team.png','Sales team · workload and follow-up','Sales team workload against capacity and follow-up times'],['landing-form.png','Enquiry form with sample leads','Public enquiry form with one-click sample enquiries'],['how-it-works.png','How it works · the rules','How it works page with the scoring and routing rules']].map(([file,caption,alt])=>({src:`images/northstar-automation/${file}`,alt:`Northstar ${alt}`,caption})) },
  rsvp: { title: 'Niven’s First Birthday · RSVP', category: 'Event automation · Personal project', problem: 'Event invitations, guest responses, calendar details, and messages are easier to manage when they share one experience.', solution: 'A responsive invitation connects Google Forms RSVP submission with Google Sheets response tracking, calendar access, and a Supabase-backed guestbook. Framer Motion adds movement to the event experience.', steps: 'Invitation → RSVP via Google Forms → Google Sheets tracking → Admin overview', note: 'This is an event automation project, with no confirmed AI processing. Connected services are required for submissions, counts, guestbook storage, and administration. The gallery contains the eight owner-supplied invitation and RSVP captures, including the visible names and event details.', stack: 'Next.js · React · TypeScript · Tailwind CSS · Framer Motion · Google Forms & Sheets · Supabase', liveUrl: 'https://niven-first-birthday.vercel.app/', url: null, screenshots: ['please-join-us.png','save-the-date.png','the-celebration.png','rsvp-form.png','little-moments.png','guestbook.png','message_plus_footer.png','niven-live.png'].map((file,index)=>({src:`images/rsvp-automation/${file}`,alt:`Niven birthday invitation screen: ${['Please Join Us','Save The Date','The Celebration','RSVP form','Little Moments photo placeholders','Guestbook messages','Guestbook form and page footer','Invitation envelope'][index]}`,caption:['Please Join Us','Save The Date','The Celebration','RSVP','Little Moments · Photo placeholders','Guestbook','Message form and footer','Invitation cover'][index]})) },
  dtss: { title: 'Dynatrace Self-Service Maintenance', category: 'Internal AI automation · DTSS', problem: 'An internal project focused on self-service maintenance in Dynatrace.', solution: 'A primarily custom-built internal application. The detailed workflow will be added in a future case study.', contribution: 'As an associate, I inherited this side project, improved the existing application, added features, and recreated its database.', steps: 'Dynatrace · Self-service maintenance · Internal automation', note: 'Technology and contribution details are provided by the project owner. The screenshots are included exactly as supplied. The detailed workflow will be added after it is supplied. No performance claims are made.', screenshots: ['Dashboard','Schedule','Schedule (bulk)','Calendar','Logs','Reports','Settings','Permissions','Audit history','Database explorer'].map((caption,index)=>({src:`images/dtss-automation/image${index ? ` (${index})` : ''}.png`,alt:`DTSS ${caption} screenshot supplied by the project owner`,caption})), stack: 'HTML · CSS · JavaScript · Python (FastAPI) · SQLite · Dynatrace API · LDAP', url: null }
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
    add('h3', 'Project gallery');
    const gallery = document.createElement('div'); gallery.className = 'dialog-gallery';
    project.screenshots.forEach(item => {
      const figure = document.createElement('figure');
      const link = document.createElement('a');
      link.href = item.src; link.target = '_blank'; link.rel = 'noopener'; link.title = 'Open full size';
      const img = document.createElement('img');
      img.src = item.src; img.alt = item.alt; img.loading = 'lazy'; img.decoding = 'async';
      link.append(img);
      const caption = document.createElement('figcaption'); caption.textContent = item.caption;
      figure.append(link, caption); gallery.append(figure);
    });
    content.append(gallery);
  }
  if (project.liveUrl) { const link = add('a', 'View live project ↗', 'button primary'); link.href = project.liveUrl; link.target = '_blank'; link.rel = 'noopener noreferrer'; }
  if (project.url) { const link = add('a', 'View source on GitHub ↗', 'button'); link.href = project.url; link.target = '_blank'; link.rel = 'noopener noreferrer'; }
  dialog.showModal();
  dialog.scrollTop = 0;
}));
document.getElementById('close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { const rect = dialog.getBoundingClientRect(); if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close(); });
dialog.addEventListener('close', () => lastTrigger?.focus());
