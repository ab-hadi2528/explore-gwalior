import { Info, MapPin } from 'lucide-react';
import AttractionFilters from '@/components/AttractionFilters';
import AttractionImage from '@/components/AttractionImage';
import type { Attraction } from '@/data/attractionTypes';

interface FeaturedAttractionsProps {
  attractions: Attraction[];
  onViewDetails: (attraction: Attraction) => void;
  category: string;
  subcategory: string;
  onCategoryChange: (value: string) => void;
  onSubcategoryChange: (value: string) => void;
  suggestionReason: string;
}

const categoryNames: Record<string, string> = {
  'historical-heritage': 'Historical & Architectural Heritage',
  'musical-heritage': 'Music & Culture',
  'spiritual-scenic': 'Spiritual & Scenic Places',
};

const subcategoryNames: Record<string, string> = {
  'forts-palaces': 'Forts & Palaces',
  'palaces-museums': 'Palaces & Museums',
  'archaeological-museums': 'Archaeological Museums',
  'temples-architecture': 'Temples & Architecture',
  'musical-heritage': 'Musical Heritage',
  'musical-instruments-heritage': 'Musical Instruments & Heritage',
  'musical-architectural-heritage': 'Musical & Architectural Heritage',
  'nature-recreation': 'Nature & Recreation',
};

export default function FeaturedAttractions({ attractions, onViewDetails, category, subcategory, onCategoryChange, onSubcategoryChange, suggestionReason }: FeaturedAttractionsProps) {
  return <section id="attractions" className="py-16 md:py-24 bg-cream px-4 sm:px-6 lg:px-8">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-2">Featured Attractions</p>
        <h2 className="text-[#1b2a4a] text-3xl md:text-4xl font-bold mb-4">Discover Gwalior's Treasures</h2>
        <p className="text-[#1b2a4a]/60 text-base md:text-lg max-w-2xl mx-auto">Browse the current attraction records and their verification status.</p>
      </div>
      <AttractionFilters category={category} subcategory={subcategory} onCategoryChange={onCategoryChange} onSubcategoryChange={onSubcategoryChange} />
      {attractions.length === 0 ? (
        <div className="rounded-2xl bg-white border border-sandstone/25 p-10 text-center text-[#1b2a4a]/60">No attractions match these filters yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {attractions.map((attraction) => (
            <article key={attraction.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition border border-sandstone/20">
              <div className="relative h-56 overflow-hidden bg-[#1b2a4a]">
                <AttractionImage src={attraction.image} alt={attraction.name} className="h-full w-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1b2a4a]/60 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="text-xs font-semibold text-cream bg-[#1b2a4a]/90 px-3 py-1.5 rounded-full">{categoryNames[attraction.category] ?? attraction.category}</span>
                </div>
                {attraction.warning && (
                  <div className="absolute top-4 right-4 bg-red-500/90 text-cream text-xs font-semibold px-2.5 py-1 rounded-full">Warning</div>
                )}
              </div>
              <div className="p-6">
                <p className="text-xs font-medium text-gold mb-2">{subcategoryNames[attraction.subcategory] ?? attraction.subcategory}</p>
                <h3 className="text-[#1b2a4a] text-xl font-bold mb-2">{attraction.name}</h3>
                <p className="text-[#1b2a4a]/60 text-sm leading-relaxed mb-3">{attraction.shortDescription}</p>
                {suggestionReason && <p className="text-xs font-semibold text-[#1b2a4a]/70 mb-4">{suggestionReason}</p>}
                <div className="flex items-center gap-2 mb-5">
                  <Info size={14} className="text-[#1b2a4a]/50" />
                  <span className="text-xs font-medium text-[#1b2a4a]/60">{attraction.verificationStatus}</span>
                </div>
                <button onClick={() => onViewDetails(attraction)} className="inline-flex items-center gap-2 w-full justify-center bg-[#1b2a4a] hover:bg-[#243760] text-cream font-semibold px-5 py-3 rounded-xl text-sm transition">
                  <MapPin size={16} /> View Details
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  </section>;
}
