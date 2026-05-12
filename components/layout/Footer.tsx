export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row">
        {/* Brand */}
        <div>
          <h3 className="text-2xl font-black text-white">
            CostPilot
          </h3>

          <p className="mt-2 text-sm text-zinc-500">
            AI Spend Intelligence for modern startups.
          </p>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm text-zinc-400">
          <a
            href="#features"
            className="transition hover:text-white"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="transition hover:text-white"
          >
            How It Works
          </a>

          <a
            href="/audit"
            className="transition hover:text-white"
          >
            Audit
          </a>
        </div>

        {/* Copyright */}
        <div className="text-sm text-zinc-600">
          © 2026 CostPilot. Built for smarter AI spending.
        </div>
      </div>
    </footer>
  );
}