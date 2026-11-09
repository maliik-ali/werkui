import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "Terms", alternates: { canonical: "/terms" } };

export default function Terms() {
  return (
    <>
      <h1>Terms of use</h1>
      <p>Last updated: 9 November 2026. WerkUI is a product of Rayvens. By using this site or buying a product you agree to these terms.</p>
      <h2>Products</h2>
      <p>WerkUI sells digital design products: UI kits and templates for Figma, Framer and Webflow. After payment you receive a link to duplicate the file into your own account. Use of each product is governed by the <Link href="/license">license</Link>.</p>
      <h2>Payments</h2>
      <p>Payments are processed by Stripe. WerkUI never sees or stores your card details. Prices are shown in US dollars and may change, but never for an order already paid.</p>
      <h2>Refunds</h2>
      <p>See the <Link href="/refunds">refund policy</Link>.</p>
      <h2>Third-party platforms</h2>
      <p>Products run on Figma, Framer and Webflow. You need your own account on the relevant platform, and its terms and pricing apply to your use of it.</p>
      <h2>Services</h2>
      <p>Customisation and design services are provided by Rayvens or Malik Ali under a separate agreement made with you for each project.</p>
      <h2>Liability</h2>
      <p>Products are provided as they are. To the extent the law allows, WerkUI is not liable for indirect or consequential loss arising from their use.</p>
      <h2>Contact</h2>
      <p>Questions about these terms: use the <Link href="/support">support page</Link>.</p>
    </>
  );
}
