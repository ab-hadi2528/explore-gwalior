import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const scrollToExplore = () => {
    const el = document.getElementById('explore');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/4164281/pexels-photo-4164281.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1920"
          alt="Gwalior Fort"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1b2a4a]/70 via-[#1b2a4a]/50 to-[#1b2a4a]/85" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <p className="text-gold text-sm md:text-base font-semibold tracking-widest uppercase mb-4">
          Beyond the Fort
        </p>
        <h1 className="text-cream text-3xl sm:text-4xl md:text-6xl font-bold leading-tight mb-6">
          Discover Gwalior Beyond the Fort
        </h1>
        <p className="text-cream/85 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
          Explore the stories, music, history, and hidden experiences that make
          Gwalior unique.
        </p>
        <button
          onClick={scrollToExplore}
          className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-[#1b2a4a] font-bold px-8 py-4 rounded-full text-base transition-all duration-300 hover:shadow-xl hover:scale-105"
        >
          Explore Places
          <ChevronDown size={20} />
        </button>
      </div>

      {/* Subtle scroll indicator */}
      <button
        onClick={scrollToExplore}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-cream/60 animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown size={28} />
      </button>
    </section>
  );
}
