type PageHeroProps = {
  eyebrow?: string;
  title: string;
  body: string;
  aside?: React.ReactNode;
};

export function PageHero({ eyebrow, title, body, aside }: PageHeroProps) {
  return (
    <section className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
      <div className="max-w-3xl">
        {eyebrow ? (
          <span className="mb-3 inline-flex items-center rounded-full bg-surface-container-high px-3.5 py-1.5 text-[11px] font-semibold tracking-wider text-primary uppercase">
            {eyebrow}
          </span>
        ) : null}
        <h1 className="font-display text-[34px] leading-10 font-semibold tracking-tight text-on-surface lg:text-[44px] lg:leading-[52px]">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-on-surface-variant">{body}</p>
      </div>
      {aside}
    </section>
  );
}
