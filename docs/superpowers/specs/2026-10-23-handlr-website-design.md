# Handlr website updates

The user requested changes to the existing Mavi Finans website and its live deployment. Keep the current typography, dark panels, spacing, and responsive layouts.

- The shared header sends Pay to `https://mavipay.eu` and For Creators to `https://handlr.sh`.
- Pricing shows both products as Live with green top borders. All five cards share equal dimensions and aligned headings, tier slots, descriptions, and actions. Use Mavi Pay’s blue and Handlr’s mint green from its dark palette for their titles and links. Keep Handlr’s fee copy to the user’s concise wording: a fair platform fee from 1% to a maximum of 3%.
- Add a dedicated `/handlr` product page and footer entry. Share the corrected creator content between this page and `/for-creators`, with distinct headings and metadata. Redirect the requested singular `/for-creator` to the existing plural route.
- Replace the old creator coming-soon state and waitlist actions with Live and links to Handlr. Describe current one-off support and account eligibility rather than unavailable subscriptions or unsupported payout promises.
- Use the user’s payment terminology: “Financial partner processing” in feature 05 and “mavi Connect” in feature 06. Update the corresponding homepage marketing wording. This is a website copy change; the separate payment applications remain independent.
- Add restrained Handlr wordplay, including “Your creator payments, handled by Handlr.” Use the original Mavi `favicon.svg` for browser tabs, with explicit SVG metadata, a cache version, and PNG fallbacks derived from the same artwork.

Source: the current live [Handlr homepage](https://handlr.sh/) and [pricing page](https://handlr.sh/pricing), retrieved on 2026-10-23. The current live pages differ from the older search cache.

Verification: production build, running local pages, desktop/mobile layout review, commit and push to main, matching successful Dokploy auto-deployment, and public page checks with certificate validation enabled.
