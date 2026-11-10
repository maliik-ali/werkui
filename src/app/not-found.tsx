import { Backdrop } from "@/components/Backdrop";
import { ButtonLink } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden">
      <Backdrop />
      <div className="container-x relative grid min-h-[70dvh] place-items-center py-24 text-center">
        <div>
          <p className="eyebrow mb-4">404</p>
          <h1 className="text-5xl font-semibold md:text-7xl">This page isn't here</h1>
          <p className="mx-auto mt-5 max-w-md text-lg text-muted">The link may be old, or the product may have been renamed.</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/templates" size="lg">Browse templates</ButtonLink>
            <ButtonLink href="/" size="lg" variant="ghost">Go home</ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
