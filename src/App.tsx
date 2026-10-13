import { useMemo, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TripDiscovery from '@/components/TripDiscovery';
import ExploreCategories from '@/components/ExploreCategories';
import FeaturedAttractions from '@/components/FeaturedAttractions';
import AboutUs from '@/components/AboutUs';
import Footer from '@/components/Footer';
import AttractionDetailsModal from '@/components/AttractionDetailsModal';
import ReportIncorrectInformation from '@/components/ReportIncorrectInformation';
import { attractions as attractionRecords } from '@/data/attractions.js';
import type { Attraction } from '@/data/attractionTypes';

const attractions = attractionRecords as Attraction[];

function App() {
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [category, setCategory] = useState('All');
  const [subcategory, setSubcategory] = useState('All');
  const [suggestionNote, setSuggestionNote] = useState('');
  const [suggestionReason, setSuggestionReason] = useState('');

  const visibleAttractions = useMemo(() => attractions.filter((attraction) => {
    const categoryMatches = category === 'All' || attraction.category === category;
    const subcategoryMatches = subcategory === 'All' || attraction.subcategory === subcategory;
    return categoryMatches && subcategoryMatches;
  }), [category, subcategory]);

  const handleSuggestion = (location: string, time: string, interests: string[]) => {
    const categoryFromInterest = interests.includes('Musical Heritage') ? 'musical-heritage' : interests.some((item) => ['Historical Places', 'Museums', 'Local Culture'].includes(item)) ? 'historical-heritage' : 'All';
    const startingPointMatch = attractions.find((attraction) => attraction.name.toLowerCase().includes(location.toLowerCase()));
    const hasVerifiedTimeFit = attractions.some((attraction) => attraction.timings.value !== null && 'visitDurationHours' in attraction && 'travelTimeMinutes' in attraction);
    setCategory(categoryFromInterest);
    setSubcategory('All');
    setSuggestionReason(categoryFromInterest === 'musical-heritage' ? 'Matches your musical heritage interest.' : categoryFromInterest === 'historical-heritage' ? 'Matches your historical heritage interest.' : 'Showing all available attraction records.');
    setSuggestionNote(hasVerifiedTimeFit ? `${location} · ${time} selected. Attractions with verified visit and travel durations are shown.` : `Not enough verified information to create a reliable plan. ${startingPointMatch ? `${startingPointMatch.name} matches your starting location, but travel duration is unknown. ` : ''}The ${time} time limit was not used to claim that any attraction fits.`);
    document.getElementById('attractions')?.scrollIntoView({ behavior: 'smooth' });
  };

  return <div className="min-h-screen bg-cream">
    <Navbar />
    <main>
      <Hero />
      <TripDiscovery onSuggest={handleSuggestion} />
      <ExploreCategories />
      <section aria-live="polite" className="bg-cream px-4 sm:px-6 lg:px-8 pt-8">
        <div className="max-w-6xl mx-auto">
          {suggestionNote && <div className="rounded-xl border border-gold/30 bg-gold/10 px-5 py-4 text-sm text-[#1b2a4a]"><p>{suggestionNote}</p><p className="mt-1 text-[#1b2a4a]/70">{suggestionReason}</p></div>}
        </div>
      </section>
      <FeaturedAttractions suggestionReason={suggestionReason} attractions={visibleAttractions} onViewDetails={setSelectedAttraction} category={category} subcategory={subcategory} onCategoryChange={setCategory} onSubcategoryChange={setSubcategory} />
      <section className="bg-cream px-4 sm:px-6 lg:px-8 pb-16 md:pb-24"><div className="max-w-6xl mx-auto"><ReportIncorrectInformation /></div></section>
      <AboutUs />
    </main>
    <Footer />
    <AttractionDetailsModal attraction={selectedAttraction} onClose={() => setSelectedAttraction(null)} />
  </div>;
}

export default App;
