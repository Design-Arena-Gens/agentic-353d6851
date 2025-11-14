import { AdGenerator } from '../components/AdGenerator';

export default function Page() {
  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-brand-100 via-white to-white" />
      <div className="absolute -left-16 top-24 -z-10 h-72 w-72 rounded-full bg-brand-100 blur-3xl" />
      <div className="absolute -right-16 bottom-10 -z-10 h-80 w-80 rounded-full bg-emerald-100 blur-3xl" />
      <AdGenerator />
      <footer className="mt-16 px-6 pb-10 text-center text-xs text-slate-500">
        GreenFrame Ads Studio © {new Date().getFullYear()} – inteligentny kreator kampanii dla rzemieślników stolarki ogrodowej.
      </footer>
    </main>
  );
}
