import { PricingCards } from "@/registry/werkui/pricing-cards";

export default function PricingCardsDemo() {
  return (
    <PricingCards
      yearlyLabel="Save 20%"
      plans={[
        {
          name: "Starter",
          description: "For side projects and early ideas.",
          price: { monthly: 0, yearly: 0 },
          features: ["1 project", "Community support", "Basic analytics"],
          cta: { label: "Start for free", href: "#" },
        },
        {
          name: "Pro",
          description: "For growing teams that ship often.",
          price: { monthly: 29, yearly: 23 },
          features: ["Unlimited projects", "Priority support", "Advanced analytics", "Custom domains"],
          cta: { label: "Get Pro", href: "#" },
          featured: true,
          badge: "Most popular",
        },
        {
          name: "Agency",
          description: "For studios managing client work.",
          price: { monthly: 99, yearly: 79 },
          features: ["Everything in Pro", "Client workspaces", "White-label reports", "SSO"],
          cta: { label: "Contact sales", href: "#" },
        },
      ]}
    />
  );
}
