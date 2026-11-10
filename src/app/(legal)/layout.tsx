export default function LegalLayout({ children }: LayoutProps<"/">) {
  return (
    <article className="container-x max-w-3xl py-16 md:py-24 [&_h1]:text-4xl [&_h1]:font-semibold md:[&_h1]:text-5xl [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_li]:mt-2 [&_p]:mt-4 [&_p]:leading-relaxed [&_p]:text-muted [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:text-muted [&_a]:text-link [&_a]:underline [&_a]:underline-offset-4">
      {children}
    </article>
  );
}
