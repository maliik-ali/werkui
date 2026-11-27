import { AnnouncementBanner } from "@/registry/werkui/announcement-banner";
import { GradientText } from "@/registry/werkui/gradient-text";
import { HeroSection } from "@/registry/werkui/hero-section";
import { ShimmerButton } from "@/registry/werkui/shimmer-button";
import { Button } from "@/components/ui/button";

export default function HeroSectionDemo() {
  return (
    <HeroSection
      announcement={<AnnouncementBanner badge="New">Version 1.0 is out</AnnouncementBanner>}
      title={<>Landing pages that <GradientText>convert</GradientText></>}
      description="Copy-paste sections for SaaS and agency sites. Built with React, Tailwind and Motion."
      actions={
        <>
          <ShimmerButton>Get started</ShimmerButton>
          <Button variant="outline" size="lg" className="h-11 rounded-full px-6">Browse components</Button>
        </>
      }
    />
  );
}
