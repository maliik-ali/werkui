import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "Refunds", alternates: { canonical: "/refunds" } };

export default function Refunds() {
  return (
    <>
      <h1>Refund policy</h1>
      <p>Last updated: 9 November 2026.</p>
      <p>WerkUI products are digital files that can't be returned once delivered, so sales are final. Every product has a live preview so you can check it before you buy.</p>
      <h2>When we do refund</h2>
      <ul>
        <li>The file is broken or can't be opened, and we can't fix it.</li>
        <li>The product is materially different from its description.</li>
        <li>You were charged twice for the same product.</li>
      </ul>
      <p>Write to us through the <Link href="/support">support page</Link> within 14 days of purchase with your order email and what went wrong.</p>
    </>
  );
}
