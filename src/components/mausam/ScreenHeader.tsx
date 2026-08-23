export function ScreenHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header className="px-5 pb-2 pt-6">
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">MAUSAM</p>
      <h2 className="mt-1 text-2xl font-bold text-foreground">{title}</h2>
      <p className="text-xs text-muted-foreground">{subtitle}</p>
    </header>
  );
}
