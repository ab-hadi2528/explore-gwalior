import { AlertCircle } from 'lucide-react';

export default function Footer() {
  const handleNavClick = (target: string) => {
    const el = document.getElementById(target);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1b2a4a] text-cream/70 px-4 sm:px-6 lg:px-8 pt-14 pb-8">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <h3 className="text-cream font-bold text-xl mb-1">
              <span className="text-gold">Explore</span> Gwalior
            </h3>
            <p className="text-sm text-gold font-medium mb-3">
              Beyond the Fort
            </p>
            <p className="text-sm leading-relaxed">
              A tourism discovery website helping visitors explore Gwalior's
              historical attractions, musical heritage, and cultural experiences.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-cream font-semibold text-sm uppercase tracking-wide mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'Explore', target: 'explore' },
                { label: 'Historical Heritage', target: 'historical-heritage' },
                { label: 'Musical Heritage', target: 'musical-heritage' },
                { label: 'About Us', target: 'about' },
              ].map((link) => (
                <li key={link.target}>
                  <button
                    onClick={() => handleNavClick(link.target)}
                    className="text-sm hover:text-gold transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Team */}
          <div>
            <h4 className="text-cream font-semibold text-sm uppercase tracking-wide mb-4">
              Project Team
            </h4>
            <p className="text-sm mb-1">
              <span className="text-cream/50">Project:</span> Beyond the Fort
            </p>
            <p className="text-sm mb-1">
              <span className="text-cream/50">Team:</span> FRESH STACK
            </p>
            <p className="text-sm">
              <span className="text-cream/50">Event:</span> AI Synergy Hackathon
              2026
            </p>
          </div>
        </div>

        {/* Verification notice */}
        <div className="border-t border-cream/10 pt-6">
          <div className="flex items-start gap-3 mb-4">
            <AlertCircle
              size={18}
              className="flex-shrink-0 text-gold mt-0.5"
            />
            <p className="text-sm text-cream/60 leading-relaxed">
              Please confirm time-sensitive details such as ticket prices,
              opening hours, and event dates with official sources before
              planning your visit.
            </p>
          </div>
          <p className="text-xs text-cream/40 text-center">
            &copy; {new Date().getFullYear()} Explore Gwalior — Beyond the Fort.
            Built by Team FRESH STACK for AI Synergy Hackathon 2026.
          </p>
        </div>
      </div>
    </footer>
  );
}
