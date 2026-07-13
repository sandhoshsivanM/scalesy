# Connecting the Booking Form to Google Forms

The booking form on **/contact** is fully custom (it matches the site design), but
it submits answers into a **Google Form** you own. Google then:

1. stores every enquiry in a linked Google Sheet, and
2. **emails you** on each new submission (once you switch notifications on).

Until you complete the steps below, the form runs in **demo mode** — it validates
and shows the success message, but nothing is sent.

Total time: ~5 minutes.

---

## 1. Create the Google Form

1. Go to <https://forms.google.com> → **Blank form**. Name it e.g. "Scalesy — Discovery Call".
2. Add these **questions in this order**, matching the types exactly:

   | # | Question              | Type                     | Required |
   |---|-----------------------|--------------------------|----------|
   | 1 | Your name             | Short answer             | yes      |
   | 2 | Email                 | Short answer             | yes      |
   | 3 | Phone                 | Short answer             | yes      |
   | 4 | Company               | Short answer             | no       |
   | 5 | What can we help with?| Dropdown (or Multiple choice) | no  |
   | 6 | Tell us what you're building | Paragraph          | yes      |

3. For question 5, add these options **exactly** (they must match the site):

   ```
   Brand Strategy
   Performance Marketing
   Social Media
   Website Design
   Content Creation
   SEO
   Creative Campaigns
   Not sure yet
   ```

## 2. Turn on email notifications (this is the "email to client" part)

1. In the form, open the **Responses** tab.
2. Click the **⋮** (three dots) → **Get email notifications for new responses**.
3. (Optional) Click the **Sheets icon** to also collect responses in a spreadsheet.

The Google account that owns the form receives the emails. To send to a different
inbox, create/own the form with that account, or set up a Sheet + notification rule.

## 3. Grab the IDs

1. Click **Send** → the **link (🔗)** tab → copy the URL. It looks like:

   ```
   https://docs.google.com/forms/d/e/1FAIpQLSxxxxxxxxxxxxxxxxxxxx/viewform
   ```

   The long token between `/d/e/` and `/viewform` is your **FORM ID**.

2. Now get each field's **entry ID**:
   - Click the **⋮** (three dots, top-right) → **Get pre-filled link**.
   - Fill each field with a recognisable dummy value (e.g. name = `NAME`,
     email = `EMAIL`, etc.), then click **Get link** → **Copy link**.
   - Paste that link somewhere. It contains chunks like
     `entry.1234567890=NAME&entry.9876543210=EMAIL...`.
   - The number after `entry.` is that field's ID.

## 4. Paste them into the site

Open [`src/data/bookingForm.js`](src/data/bookingForm.js) and fill in:

```js
export const bookingForm = {
  formId: '1FAIpQLSxxxxxxxxxxxxxxxxxxxx',   // from step 3.1
  entries: {
    name:    'entry.1234567890',
    email:   'entry.9876543210',
    phone:   'entry.1112223334',
    company: 'entry.4445556667',
    service: 'entry.7778889990',
    message: 'entry.0001112223',
  },
  // serviceOptions must stay identical to the Google Form's option text
  serviceOptions: [ /* leave as-is unless you change the form */ ],
};
```

Save, then rebuild / restart the dev server. The demo notice disappears and real
submissions start flowing to your inbox and Sheet.

---

### Notes
- The site posts directly to Google from the visitor's browser (no server needed),
  so it works on any static host (Netlify, Vercel, Cloudflare Pages, S3, etc.).
- Because it's a cross-origin `no-cors` post, the browser can't read Google's
  response — that's expected. The success message shows once the request is sent.
- The form also has a native fallback: if a visitor has JavaScript disabled, it
  still posts to Google via a hidden frame.
- To change where emails go later, just update the Google Form's notification
  settings — no code change required.
