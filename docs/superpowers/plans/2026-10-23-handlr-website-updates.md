# Handlr website implementation

1. Update shared header links and equal-sized pricing cards with aligned internal rows and actions; mark Mavi Pay and Handlr Live with green top borders, use original brand colors, and keep Handlr’s fee explanation concise.
2. Correct `app/for-creators` content and metadata, reuse it for `app/handlr`, add the footer and sitemap entry, and redirect the singular creator URL.
3. Align the homepage product description and waitlist product label with Handlr’s current offering and the requested payment terminology. Add Handlr wordplay and configure the Mavi SVG favicon with derived PNG fallbacks.
4. Run `npm run build`, start the standalone app, and inspect the relevant routes, links, status indicators, and responsive layout. Check that the singular route redirects.
5. Commit the intended website files and push main. Observe the matching Dokploy deployment on the existing Mavi Finans production website service, then verify the live routes and HTTPS. Record any remaining access failures accurately.

Review focus: both navigation layouts share the link configuration; new pages must be included in Git and the sitemap; displayed Handlr fees use marginal bands rather than a flat percentage; unavailable recurring support must not be advertised; copy changes do not imply a backend payment integration was implemented.
