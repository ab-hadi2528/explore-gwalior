import { ArrowRight } from 'lucide-react';
import { categories } from '@/data/categories';

export default function ExploreCategories() {
  const handleExplore = () => {
    const el = document.getElementById('attractions');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="categories"
      className="py-16 md:py-24 bg-[#1b2a4a] px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-2">
            Explore by Theme
          </p>
          <h2 className="text-cream text-3xl md:text-4xl font-bold">
            Explore Categories
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              id={cat.id}
              className="group relative rounded-2xl overflow-hidden shadow-xl bg-white/5"
            >
              {/* Image */}
              <div className="relative h-64 md:h-80 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1b2a4a] via-[#1b2a4a]/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h3 className="text-cream text-2xl font-bold mb-2">
                  {cat.title}
                </h3>
                <p className="text-cream/70 text-sm leading-relaxed mb-4">
                  {cat.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {cat.subcategories.map((sub) => (
                    <span
                      key={sub}
                      className="text-xs font-medium text-gold bg-gold/15 px-3 py-1.5 rounded-full"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
                <button
                  onClick={handleExplore}
                  className="inline-flex items-center gap-2 text-gold font-semibold text-sm hover:gap-3 transition-all duration-200"
                >
                  Explore {cat.title}
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
