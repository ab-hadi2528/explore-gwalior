import { Users, Target, Heart } from 'lucide-react';

export default function AboutUs() {
  return (
    <section id="about" className="py-16 md:py-24 bg-cream px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-2">
            About Us
          </p>
          <h2 className="text-[#1b2a4a] text-3xl md:text-4xl font-bold mb-4">
            Beyond the Fort
          </h2>
          <p className="text-[#1b2a4a]/60 text-base md:text-lg max-w-2xl mx-auto">
            A tourism discovery project built by Team FRESH STACK for the AI
            Synergy Hackathon 2026.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 text-center shadow-md border border-sandstone/20">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#1b2a4a]/10 mb-5">
              <Users size={26} className="text-[#1b2a4a]" />
            </div>
            <h3 className="text-[#1b2a4a] font-bold text-lg mb-2">Our Team</h3>
            <p className="text-[#1b2a4a]/60 text-sm leading-relaxed">
              We are FRESH STACK — first-year college students learning web
              development and passionate about showcasing Gwalior's
              heritage.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 text-center shadow-md border border-sandstone/20">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#1b2a4a]/10 mb-5">
              <Target size={26} className="text-[#1b2a4a]" />
            </div>
            <h3 className="text-[#1b2a4a] font-bold text-lg mb-2">Our Mission</h3>
            <p className="text-[#1b2a4a]/60 text-sm leading-relaxed">
              To make Gwalior's historical, musical, and cultural
              attractions easier to discover and plan around a visitor's
              interests, time, and location.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 text-center shadow-md border border-sandstone/20">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#1b2a4a]/10 mb-5">
              <Heart size={26} className="text-[#1b2a4a]" />
            </div>
            <h3 className="text-[#1b2a4a] font-bold text-lg mb-2">Our Values</h3>
            <p className="text-[#1b2a4a]/60 text-sm leading-relaxed">
              We believe in verified, reliable information. Every attraction
              entry is clearly marked with its verification status so visitors
              can trust what they read.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
