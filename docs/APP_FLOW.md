# Application Flow

1. Visitor opens the page. Stored theme applies if readable; otherwise light mode appears.
2. Navigation anchors lead to Work, Approach, About, and Contact. Native anchors remain usable without JavaScript.
3. Project cover or Explore button opens the selected project notes. LedgerLens, Northstar, and Niven include owner-supplied screen captures; Niven's gallery includes all eight invitation and RSVP captures, including visible names and event details, at the owner's request. DTSS includes owner-supplied screenshots unchanged. Close button, Escape, or a click outside the dialog closes it; focus returns to the trigger.
4. Confirmed live-project and public repository links open a new tab. The LedgerLens and Northstar case studies link to their public demo URLs; DTSS has no public demo link.
5. Theme button switches light/dark appearance and attempts to save the preference. Storage failure does not block the toggle.
6. Email link opens a configured mail client; professional profile links open external sites. No submission, retries, notification pipeline, or visitor data persistence exists.

Reduced-motion preference disables animation and smooth scrolling. Without JavaScript, project summaries and contact remain available; expanded project notes and theme switching require JavaScript. Preview server returns 404 for unavailable files and 403 for paths outside its static root.
