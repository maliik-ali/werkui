import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "Privacy", alternates: { canonical: "/privacy" } };

export default function Privacy() {
  return (
    <>
      <h1>Privacy</h1>
      <p>Last updated: 9 November 2026. This page explains what WerkUI collects and why.</p>
      <h2>What we collect</h2>
      <ul>
        <li><strong>Forms.</strong> When you send an enquiry or join the newsletter we store what you typed: name, email, budget range and message.</li>
        <li><strong>Referral tag.</strong> If you arrive from a partner site with a <code>ref</code> tag, a first-party cookie (<code>wk_ref</code>) remembers it for 30 days so we know which site sent you. It holds no personal data.</li>
        <li><strong>Checkout clicks.</strong> We count clicks on buy buttons, with the product and the referral tag. No personal data is attached.</li>
        <li><strong>Payments.</strong> Stripe processes payments and handles your payment details under its own privacy policy.</li>
      </ul>
      <h2>What we don't do</h2>
      <p>No advertising trackers, and we don't sell or share your data.</p>
      <h2>Where it's stored</h2>
      <p>Form data is stored in a database hosted in the European Union. The site is hosted on Vercel.</p>
      <h2>Your rights</h2>
      <p>You can ask for a copy of your data or have it deleted at any time through the <Link href="/support">support page</Link>.</p>
    </>
  );
}
