# Cookies, Storage and Data Handling

## Beyond the Fort – The City of Music Nobody Hears

This document explains how the website handles data: where its content comes from, what is kept in memory, and which browser storage and network mechanisms are used or **not** used. It is based on a review of the repository source code (latest commit `d91deb2`).

**Scope note.** This describes what the application's own code does. It does not cover cookies or headers that the hosting platform or third-party servers may add on their own (see Section 7).

---

## 1. Summary

| Mechanism | Used? | Notes |
|---|---|---|
| Hardcoded JavaScript/TypeScript data | **Yes** | Main data source. 9 attractions in `src/data/attractions.js`, bundled into the app. |
| In-memory React state | **Yes** | Holds filters, form inputs and the current itinerary. Lost on page refresh. |
| Cookies | **No** | The code never reads or writes cookies. |
| `localStorage` | **No** | Not used anywhere. |
| `sessionStorage` | **No** | Not used anywhere. |
| IndexedDB / Web SQL | **No** | Not used. |
| Service Worker / Cache API / PWA manifest | **No** | Not used. |
| URL state (query string, hash, router) | **No** | No router. Navigation is scroll-based and the URL never changes. |
| `fetch`, XHR, WebSocket, other API calls | **No** | No network requests are made by application code. |
| Backend / database | **No** | Front-end only. |
| Supabase | **No** | Listed in `package.json` but never imported or configured. |
| Environment variables / API keys | **No** | None referenced in the code. |
| Analytics, tracking, advertising scripts | **No** | None present. |
| Geolocation / device sensors | **No** | The user's location is never requested. The starting point is picked from three fixed options. |
| Browser HTTP cache | Automatic | Applies to the bundle, images and fonts. Not controlled by app code. |

**In short:** the site keeps no data about its visitors. Content is hardcoded, interaction state lives only in memory, and nothing is written to the browser or sent to a server by the app.

---

## 2. Hardcoded Data

All website content is defined in source files and compiled into the JavaScript bundle at build time. It is imported as static modules, so nothing is fetched while the page runs.

| File | Contents |
|---|---|
| `src/data/attractions.js` | **9 attraction records.** Each has id, name, image URL, category and subcategory, descriptions, address, Google Maps URLs, timings, closed days, ticket info, official website, suggested duration, highlights, visitor interests, nearby facilities, source URLs, `lastVerified`, `verificationStatus`, `verificationNotes` and `warning`. |
| `src/data/categories.ts` | 3 theme categories with titles, descriptions, images and subcategory labels. |
| `src/data/attractionTypes.ts` | TypeScript interfaces for the data model, the starting locations list (`Gwalior Railway Station`, `Gwalior Fort`, `Jai Vilas Palace`), the default origin, and the `buildDirectionsUrl()` helper. |
| `src/data/itineraryPlanner.ts` | Planner logic with hardcoded lookup tables: interest-to-category map and visit-duration table. |
| Component files | Hardcoded UI options such as time choices (4, 6, 8 hours), the 8 interest options, filter dropdown values, and navigation links. |

**Characteristics**
- **Read-only at runtime.** The app never modifies the dataset.
- **Updates need a code change and a redeploy.** There is no admin panel or live data source.
- **Visible to anyone.** All data ships to the browser and is public by design. No secrets or personal data are stored in these files.
- **Source-attributed.** Records include source URLs and a `lastVerified` date (currently `2026-10-13`). Unconfirmed facts use `null` values and "Not verified" wording.

---

## 3. In-Memory State (React)

Interactive state is held with React hooks. It exists only while the page is open. A refresh, tab close or navigation away resets everything to defaults.

| Component | State | Purpose |
|---|---|---|
| `App.tsx` | `selectedAttraction`, `category`, `subcategory`, `suggestionReason`, `itinerary` | Selected attraction for the modal, active filters, the notice text, and the generated itinerary |
| `App.tsx` | `visibleAttractions` (`useMemo`) | Filtered list derived from the dataset and filters |
| `TripDiscovery.tsx` | `location`, `time`, `interests`, `submitted` | Planner form selections |
| `ReportIncorrectInformation.tsx` | `attraction`, `issue`, `contact`, `submitted` | Report form inputs |
| `Navbar.tsx` | `scrolled`, `menuOpen` | Navbar styling and mobile menu |
| `AttractionImage.tsx` | `errored` | Whether an image failed to load |

The footer computes the current year with `new Date().getFullYear()`. Nothing is stored.

---

## 4. Cookies

**Not used by the application.**

- The code contains no `document.cookie` access and no cookie library.
- There is no server-side code of our own that could set a cookie (no login, session or user accounts).
- No analytics, advertising or tracking tools are included.

Because the application sets no cookies of its own, it does not implement a cookie banner or consent manager.

---

## 5. `localStorage` and `sessionStorage`

**Neither is used.**

Filters, planner choices, report-form text and the generated itinerary are **not** remembered between visits. They are not retained across a page reload either. This is intentional for a privacy-first prototype, and the trade-off is that visitors start fresh every time.

---

## 6. Other Technical Mechanisms

| Mechanism | Status | Details |
|---|---|---|
| **IndexedDB / Web SQL** | Not used | No client-side database. |
| **Service Worker, Cache API, PWA manifest** | Not used | The site does not work offline. |
| **URL parameters, hash routing** | Not used | There is no router. Menu and button clicks call `scrollIntoView()` on element IDs, so the address bar does not change and a specific view cannot be shared by link. |
| **`fetch`, XHR, WebSocket** | Not used | The code makes no API requests. |
| **Supabase** | Declared, not used | `@supabase/supabase-js` appears in `package.json`, but no file imports it. There is no client, no URL, no key and no backend connection. |
| **Environment variables (`import.meta.env`)** | Not used | None referenced. `.env` is listed in `.gitignore`, and no `.env` file exists in the repository. |
| **Geolocation, camera, microphone** | Not used | The user's device location is never requested. |
| **Analytics / tracking pixels** | Not used | None in `index.html` or the source. |
| **Browser HTTP cache** | Automatic | Browsers cache the JS bundle, remote images and fonts according to the response headers of the hosts serving them. This is standard browser behaviour and is not configured in the project. |

---

## 7. Data the Visitor Enters

The site has two interactive forms. Neither sends data anywhere.

### 7.1 Trip Discovery form
- **Inputs:** starting location (one of 3 options), time (one of 3), interests (optional, from 8).
- **Processing:** passed to `generateItinerary()` in the browser, which filters the hardcoded dataset.
- **Storage / transmission:** none. The result is kept in React state only.
- **Personal data:** none collected. All choices come from fixed options.

### 7.2 "Report incorrect information" form
- **Inputs:** attraction (dropdown), issue description (free text), and **optional contact details** (free text; users might type an email or phone number).
- **On submit:** the handler only sets `submitted = true`. No network call, storage write or message is made.
- **Data lifetime:** the text remains in component memory until the page is refreshed. The form fields are not cleared when the user chooses "Submit another report".
- **UI wording:** the confirmation reads "Report saved for this demo", with a note that no message was sent because the prototype has no backend. In practice nothing is saved, and the report is discarded when the page closes.

---

## 8. Third-Party Requests and Outbound Links

The app's own code makes no data requests, but the browser contacts other hosts to display the page, and links lead to other sites.

**Loaded automatically when the page opens**

| Host | Purpose |
|---|---|
| `fonts.googleapis.com`, `fonts.gstatic.com` | Poppins font (from `index.html`) |
| `images.pexels.com` | Hero, category and most attraction images |
| `upload.wikimedia.org` | Some attraction images (Jai Vilas Palace, Tansen's Tomb) |

These requests happen in the visitor's browser. As with any web request, the serving host receives the visitor's IP address and standard request headers. The project does not control how those hosts handle that data or whether they set their own cookies. Social-sharing tags in `index.html` also reference the Pexels image and the live site URL, but they are only read by platforms that fetch the page.

**Opened only when the visitor clicks a link** (in a new tab with `rel="noreferrer"`)

- Google Maps (location, directions, restaurants, hotels, parking)
- Official and source websites, such as Incredible India, MP Tourism, `gwalior.nic.in` and `jaivilaspalace.in`

**Hosting.** The live prototype is served from `bolt.host`. Any server-side logging, headers or cookies from the hosting platform are outside the application code and were not assessed here.

---

## 9. Privacy Position

| Question | Answer |
|---|---|
| Does the app store data about visitors? | No. |
| Does the app send visitor data to a server? | No. |
| Does the app use accounts or logins? | No. |
| Does the app use cookies or browser storage? | No. |
| Does the app track or profile visitors? | No analytics or tracking is included. |
| Is any personal data collected? | Only the optional contact field in the demo report form, and that stays in browser memory only. |

---

## 10. How to Verify These Claims

**In the browser (on the live site or a local run)**
1. Open DevTools and go to **Application** (Chrome/Edge) or **Storage** (Firefox).
2. Check **Cookies**, **Local Storage**, **Session Storage** and **IndexedDB** for the site's origin. The app itself should not add entries. Any entry that appears may come from the hosting platform.
3. Open the **Network** tab and reload. You should see the page assets, the Google Fonts files and the images, and no API or XHR/fetch calls from the app.

**In the source code** (run from the repository root)

```bash
grep -rnE "localStorage|sessionStorage|document\.cookie|indexedDB|serviceWorker|fetch\(|XMLHttpRequest|WebSocket|supabase|import\.meta\.env" src index.html
```

This returns no matches in the current code.

---

## 11. If Persistence Is Added Later

If the project later adds saved itineraries, accounts, report submissions or analytics, this document should be updated and the following applied:

- Tell users what is stored and why. Ask for consent before any non-essential cookies, local storage or analytics.
- Prefer `localStorage` only for harmless preferences (never personal data), and `sessionStorage` for single-session state.
- Send reports over HTTPS to a protected backend, collect the minimum personal data needed, and state a retention period.
- Keep secrets (API keys, database credentials) in server-side environment variables, never in the front-end bundle.
- Update the wording of the report form so that it matches what actually happens to submissions.

---

*Prepared by Team FRESH STACK for AI Synergy Hackathon 2026, IIIT Gwalior.*
