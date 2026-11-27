import { TestimonialsMarquee } from "@/registry/werkui/testimonials-marquee";

const testimonials = [
  { name: "Ava Morgan", handle: "@avamorgan", quote: "We replaced three landing page templates with this in an afternoon." },
  { name: "Leo Park", handle: "Founder, Northwind", quote: "The motion feels premium without any tuning. Our conversion went up." },
  { name: "Sara Idris", handle: "@saraidris", quote: "Copy, paste, change the colours. That really is the whole workflow." },
  { name: "Tom Becker", handle: "Design lead, Fable", quote: "Finally components that respect dark mode and reduced motion." },
  { name: "Nia Okafor", handle: "@niaok", quote: "I shipped a client site in a day and they thought it took a week." },
  { name: "Jun Tanaka", handle: "CTO, Lumen", quote: "Clean code I could read and own. No lock-in, which is why we picked it." },
];

export default function TestimonialsMarqueeDemo() {
  return <TestimonialsMarquee testimonials={testimonials} />;
}
