import type { Metadata } from "next";
export const metadata: Metadata = { title: "License", alternates: { canonical: "/license" } };

export default function License() {
  return (
    <>
      <h1>License</h1>
      <p>Last updated: 9 November 2026. This page explains what you may do with a product you buy or download from WerkUI.</p>
      <h2>You can</h2>
      <ul>
        <li>Use the product in unlimited personal and commercial projects, for yourself or for clients.</li>
        <li>Modify it in any way and combine it with your own work.</li>
        <li>Ship websites, apps and other end products built with it.</li>
      </ul>
      <h2>You can't</h2>
      <ul>
        <li>Resell, share or give away the source files, modified or not.</li>
        <li>Include the product in another template, UI kit, theme or design tool that is sold or given away.</li>
        <li>Claim the original product as your own work.</li>
      </ul>
      <h2>Free products</h2>
      <p>Free products follow the same rules. Files hosted on Figma Community are also covered by the licence shown on their Community page.</p>
      <h2>Ownership</h2>
      <p>You get a licence to use the product. The product itself remains the property of its creator.</p>
    </>
  );
}
