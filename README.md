# REVAT CRYPTO FUND — Premium Website Concept

A responsive, deployment-friendly static website based on the supplied Revat website business draft (October 12, 2026), official logo files, and Revat Fund Brand Guidelines PDF.

## Pages

- `index.html` — Home / primary conversion entry
- `how-it-works.html` — assessment and allocation model
- `investors.html` — investor information, illustrative allocation calculator and draft commercial terms
- `traders.html` — trader verification, eligibility and proposed compensation
- `risk-management.html` — account model, API permissions, RMS limitations and risk factors
- `about.html` — mission, vision and project development status
- `faq.html` — categorized, expandable FAQ
- `apply.html` — investor / trader enquiry interface (form backend not yet connected)

## Deploy or preview

1. Extract the ZIP. All files must remain in the same relative directory structure.
2. Open `index.html` in a browser, or for a local web server run `python -m http.server 8000` inside the extracted folder then visit `http://localhost:8000`.
3. Upload the contents to your chosen HTTPS web host (Netlify, Vercel static, AWS S3/CloudFront, conventional web hosting, etc.).
4. Verify internal page links and test on actual devices after publishing.

## Brand system

- Official horizontal logo: `assets/revat-logo-horizontal.png`; vertical logo also included.
- Brand dark forest green: `#0D3C2D`
- Satin gold: `#DBAD52`
- Deep gold: `#A2751B`
- White: `#FFFFFF`; charcoal `#4A4A4A`
- Typography: Plus Jakarta Sans (headings) + Inter (body), as defined in **page 5** of the supplied brand guide. An earlier logo-description paragraph on page 3 references different fonts; confirm the final choice with the brand owner. Google Fonts is loaded when an internet connection is available; standard sans-serif fallbacks are provided.

## Interactions included

- Mobile navigation and accessible skip link
- CSS hover effects, gentle entry motion and orbital hero artwork
- Reduced-motion preference support
- Sliding educational cards (previous / next)
- Open / close FAQs, plus FAQ category filters
- Investor allocation arithmetic calculator (NOT a return projection)
- Investor / trader enquiry form switches, field validation and optional secure submission integration

## Activate the enquiry form

By default, **no personal information is collected, stored, or sent**. On submission the page explicitly says it is a preview and that nothing was transmitted.

**Before enabling**, complete legal/compliance approval, publish a genuine privacy notice and consent wording, confirm jurisdictional eligibility, and configure server-side validation, HTTPS, CORS, spam controls, logging/security and safe retention practices.

After these are available, edit `config.js` to set:

```js
window.REVAT_CONFIG = {
  leadEndpoint: 'https://your-secure-domain.example/api/enquiries'
};
```

The frontend POSTs JSON via HTTPS, then displays success only when it receives an HTTP 2xx response. The backend must implement an authorized, secured endpoint; no such endpoint is supplied. An email or CRM account is not connected in this deliverable. Do **not** put secrets or API keys in frontend files.

## Before public launch — critical

1. Confirm the correct legal entity, service name, regulatory status, marketing permissions and prohibited jurisdictions. The term “Fund” may have jurisdictional consequences.
2. Confirm operating status, onboarding availability, permitted instruments and whether exchange integrations are live.
3. Verify 10-trader and 1,000/10,000 USDT proposed minimums; establish how more than 10 subaccounts work.
4. Define the RMS precisely: 10% calculation basis, time window, equity definition, unrealized P&L, stop/intervention action, latency, exception handling and investor disclosure.
5. Finalize profit-sharing percentages, high-water marks, costs, timing and any loss-recovery rules; use approved offering documents.
6. Specify accurate live/historical/demo leaderboard data sources and definitions before displaying figures. The present site shows **no invented performance metrics**.
7. Write and publish legally reviewed Terms, Privacy Policy, Cookie Policy, Regulatory/Eligibility Notice and complete Risk Disclosure. The current risk information is educational draft copy, not a legal substitute.
8. Connect the approved lead backend only when consent and privacy notices are finalized.
9. Verify that exchange compatibility is not presented as an exchange partnership or endorsement.
10. Add the real company address, support email, contact channels, domain, canonical tags, XML sitemap, structured data, analytics and consent-based cookie controls once confirmed.

## Spreadsheet / SEO input

The supplied Google Sheets keyword URL could not be accessed by the available tools in this session. The page names, metadata and keyword topics are **provisional** and derived from the product draft. An `.xlsx` or `.csv` export of the keyword sheet is required to finalize keyword targeting, semantic clusters, title lengths, internal linking and content priority. See `SEO-KW-MAP.md`.

## Note on accuracy

This is a polished **functional static front-end** with preliminary product content. It is **not** an active cryptoasset investment platform, brokerage, trader execution engine, custody service, risk management backend, exchange integration or functional funding product. The copy intentionally avoids guaranteeing profitability or a 10% loss cap.
