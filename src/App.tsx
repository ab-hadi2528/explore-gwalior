import { useMemo, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ExploreCategories from '@/components/ExploreCategories';
import TripDiscovery from '@/components/TripDiscovery';
import FeaturedAttractions from '@/components/FeaturedAttractions';
import AboutUs from '@/components/AboutUs';
import Footer from '@/components/Footer';
import AttractionDetailsModal from '@/components/AttractionDetailsModal';
import ReportIncorrectInformation from '@/components/ReportIncorrectInformation';
import { attractions as attractionRecords } from '@/data/attractions.js';
import { generateItinerary } from '@/data/itineraryPlanner';
import { DEFAULT_ORIGIN } from '@/data/attractionTypes';
import type { Attraction, ItineraryResult } from '@/data/attractionTypes';

const attractions = attractionRecords as Attraction[];

function App() {
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [category, setCategory] = useState('All');
  const [subcategory, setSubcategory] = useState('All');
  const [suggestionReason, setSuggestionReason] = useState('');
  const [itinerary, setItinerary] = useState<ItineraryResult | null>(null);

  const visibleAttractions = useMemo(() => attractions.filter((attraction) => {
    const categoryMatches = category === 'All' || attraction.category === category;
    const subcategoryMatches = subcategory === 'All' || attraction.subcategory === subcategory;
    return categoryMatches && subcategoryMatches;
  }), [category, subcategory]);

  const handleSuggestion = (location: string, time: string, interests: string[]) => {
    const result = generateItinerary(attractions, location, time, interests);
    setItinerary(result);

    const interestCats = new Set<string>();
    const map: Record<string, string[]> = {
      'Historical Places': ['historical-heritage'],
      'Museums': ['historical-heritage'],
      'Musical Heritage': ['musical-heritage'],
      'Local Culture': ['musical-heritage', 'historical-heritage'],
      'Nature': ['spiritual-scenic'],
      'Spirituality': ['spiritual-scenic'],
      'Architecture': ['historical-heritage', 'spiritual-scenic'],
      'Photography': ['historical-heritage', 'musical-heritage', 'spiritual-scenic'],
    };
    interests.forEach((i) => { const cats = map[i]; if (cats) cats.forEach((c) => interestCats.add(c)); });

    if (interestCats.size === 1) {
      const cat = [...interestCats][0];
      setCategory(cat);
      setSubcategory('All');
      setSuggestionReason(`Filtered to match your selected interests.`);
    } else {
      setCategory('All');
      setSubcategory('All');
      setSuggestionReason(interests.length > 0 ? 'Showing all attractions. See your itinerary above.' : 'Showing all available attraction records.');
    }
  };

  const handleExploreCategory = (catId: string) => {
    setCategory(catId);
    setSubcategory('All');
    setSuggestionReason('');
    document.getElementById('attractions')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main>
        <Hero />
        <ExploreCategories onSelectCategory={handleExploreCategory} />
        <TripDiscovery onSuggest={handleSuggestion} itinerary={itinerary} onViewDetails={setSelectedAttraction} />
        <section aria-live="polite" className="bg-cream px-4 sm:px-6 lg:px-8 pt-8">
          <div className="max-w-6xl mx-auto">
            {suggestionReason && (
              <div className="rounded-xl border border-gold/30 bg-gold/10 px-5 py-4 text-sm text-[#1b2a4a]">
                <p>{suggestionReason}</p>
              </div>
            )}
          </div>
        </section>
        <FeaturedAttractions
          suggestionReason={suggestionReason}
          attractions={visibleAttractions}
          onViewDetails={setSelectedAttraction}
          category={category}
          subcategory={subcategory}
          onCategoryChange={setCategory}
          onSubcategoryChange={setSubcategory}
        />
        <section className="bg-cream px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
          <div className="max-w-6xl mx-auto">
            <ReportIncorrectInformation />
          </div>
        </section>
        <AboutUs />
      </main>
      <Footer />
      <AttractionDetailsModal attraction={selectedAttraction} onClose={() => setSelectedAttraction(null)} />
    </div>
  );
}

export default App;
