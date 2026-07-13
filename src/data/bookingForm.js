// SCALESY — Booking form → Google Forms backend.
//
// The visible form is fully custom (on-brand). On submit it posts the answers
// to a Google Form's response endpoint. Configure the two things below, then
// enable "email notifications for new responses" inside the Google Form so the
// client is emailed on every booking. See GOOGLE_FORM_SETUP.md for the 4-minute
// walkthrough of where these IDs come from.
//
// Until `formId` is filled in, the form runs in DEMO mode: it validates and
// shows the success state but does not send anything.

export const bookingForm = {
  // From your Google Form's share/prefill URL:
  //   https://docs.google.com/forms/d/e/FORM_ID/viewform
  // Paste just the FORM_ID (the long token after /d/e/ and before /viewform).
  formId: 'PASTE_GOOGLE_FORM_ID_HERE',

  // Each Google Form field has an entry ID like "entry.1234567890".
  // Get them from the form's prefill link (see the setup doc) and paste here.
  entries: {
    name: 'entry.PASTE_NAME_ID',
    email: 'entry.PASTE_EMAIL_ID',
    phone: 'entry.PASTE_PHONE_ID',
    company: 'entry.PASTE_COMPANY_ID',
    service: 'entry.PASTE_SERVICE_ID',
    message: 'entry.PASTE_MESSAGE_ID',
  },

  // Options shown in the "What can we help with?" select.
  // Keep these IDENTICAL to the matching multiple-choice / dropdown options in
  // the Google Form, or Google will reject those answers.
  serviceOptions: [
    'Brand Strategy',
    'Performance Marketing',
    'Social Media',
    'Website Design',
    'Content Creation',
    'SEO',
    'Creative Campaigns',
    'Not sure yet',
  ],
};

export const isConfigured = () =>
  bookingForm.formId && !bookingForm.formId.startsWith('PASTE_');
