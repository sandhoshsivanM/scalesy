import { Seo } from '@/components/Seo';
import { Contact } from '@/sections/Contact';

export default function ContactPage() {
  return (
    <>
      <Seo
        title="Contact — Scalesy"
        description="Book a discovery call with Scalesy — a 45-minute conversation about the business, not the brief."
        path="/contact"
      />
      <div className="contact-page">
        <Contact index="—" />
      </div>
    </>
  );
}
