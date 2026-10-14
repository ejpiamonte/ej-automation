# Technical Requirements

## Implemented architecture
Static HTML/CSS/JavaScript in `dist/`. Node's built-in HTTP module powers a loopback-only local preview on port 4173. No third-party runtime dependencies, build step, server integrations, AI calls, or database. The static website can be hosted independently of the showcased projects.

## Behavior
Theme preference uses browser localStorage with exception handling. Light mode is the default. IntersectionObserver reveals sections where supported; content remains visible without JavaScript or with reduced motion. Native dialog provides modal project notes and Escape support; closing restores focus to its trigger. External links use `noopener noreferrer`; dynamic text uses textContent.

## Security and privacy
No credentials or sensitive internal assets are present. Only selected public identity/contact information is displayed. No cookies, analytics, forms, or guest records are collected. Email opens the visitor's mail client; it does not send mail automatically. Browser theme preference stays local.

## Limits and deployment
The portfolio does not validate the showcased integrations. GitHub destinations come from verified prior repository publication context; deployed project URLs are not asserted. Static hosting and production deployment require owner approval. No source upload or Sites registration has occurred.

## Verification
Run `npm run check`, verify HTTP responses for all static assets, and inspect desktop/mobile theme and dialog behavior in the browser. Preview server is not a production server.
