// SCALESY — Booking form → Google Forms backend.
//
// The visible form is fully custom (on-brand). On submit it posts the answers
// to a Google Form's response endpoint. Configure `formId` + `entries`, then
// enable email notifications inside the Google Form. See GOOGLE_FORM_SETUP.md.
//
// Until `formId` is filled in, the form runs in DEMO mode: it validates and
// shows the success state but does not send anything.
import type { BookingFormConfig } from './types';

export const bookingForm: BookingFormConfig = {
  formId: 'PASTE_GOOGLE_FORM_ID_HERE',
  entries: {
    name: 'entry.PASTE_NAME_ID',
    email: 'entry.PASTE_EMAIL_ID',
    phone: 'entry.PASTE_PHONE_ID',
    company: 'entry.PASTE_COMPANY_ID',
    service: 'entry.PASTE_SERVICE_ID',
    message: 'entry.PASTE_MESSAGE_ID',
  },
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

export const isConfigured = (): boolean =>
  Boolean(bookingForm.formId) && !bookingForm.formId.startsWith('PASTE_');

export const formAction = (): string =>
  isConfigured()
    ? `https://docs.google.com/forms/d/e/${bookingForm.formId}/formResponse`
    : '';
