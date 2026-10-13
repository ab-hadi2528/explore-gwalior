import { useState } from 'react';
import { Clock, Sparkles, Search, Navigation, AlertTriangle, AlertCircle, Clock3, ChevronRight, Route, MapPin, CheckCircle2, Info } from 'lucide-react';
import type { Attraction, ItineraryResult } from '@/data/attractionTypes';
import { buildDirectionsUrl, ORIGIN_LOCATION } from '@/data/attractionTypes';
import AttractionImage from '@/components/AttractionImage';

const timeOptions = ['4 hours', '6 hours', '8 hours'];
const interestOptions = ['Historical Places', 'Musical Heritage', 'Museums', 'Nature', 'Spirituality', 'Architecture', 'Photography', 'Local Culture'];

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

interface TripDiscoveryProps {
  onSuggest: (time: string, interests: string[]) => void;
  itinerary: ItineraryResult | null;
  onViewDetails: (attraction: Attraction) => void;
}

export default function TripDiscovery({ onSuggest, itinerary, onViewDetails }: TripDiscoveryProps) {
  const [time, setTime] = useState(timeOptions[0]);
  const [interests, setInterests] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const toggleInterest = (interest: string) => {
    setInterests((current) => current.includes(interest) ? current.filter((item) => item !== interest) : [...current, interest]);
    setSubmitted(false);
  };

  const handleFind = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSuggest(time, interests);
    setSubmitted(true);
  };

  const confirmedStops = itinerary?.stops.filter((s) => s.fitsTimeBudget) ?? [];
  const suggestionStops = itinerary?.stops.filter((s) => !s.fitsTimeBudget) ?? [];

  return (
    <section id="explore" className="py-16 md:py-24 bg-cream px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-2">Trip Discovery</p>
          <h2 className="text-[#1b2a4a] text-3xl md:text-4xl font-bold mb-4">Plan Your Gwalior Experience</h2>
          <p className="text-[#1b2a4a]/60 text-base md:text-lg max-w-2xl mx-auto">Choose your available time and interests to get recommendations for Gwalior's attractions. All directions start from {ORIGIN_LOCATION}.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-sandstone/20">
          <form onSubmit={handleFind} className="space-y-8">
            <div>
              <label className="flex items-center gap-2 text-[#1b2a4a] font-semibold mb-3"><MapPin size={18} className="text-gold" /> Starting Point</label>
              <div className="flex items-center gap-2 text-sm text-[#1b2a4a]/60 bg-cream border border-sandstone/25 rounded-xl px-4 py-3">
                <MapPin size={16} className="text-gold" />
                <span>{ORIGIN_LOCATION} <span className="text-[#1b2a4a]/40">(fixed)</span></span>
              </div>
            </div>
            <div>
              <label className="flex items-center gap-2 text-[#1b2a4a] font-semibold mb-3"><Clock size={18} className="text-gold" /> Available Time</label>
              <div className="grid grid-cols-3 gap-3">
                {timeOptions.map((item) => <button key={item} type="button" onClick={() => { setTime(item); setSubmitted(false); }} className={`px-4 py-3 rounded-xl text-sm font-medium border-2 transition ${time === item ? 'bg-[#1b2a4a] text-cream border-[#1b2a4a]' : 'bg-white text-[#1b2a4a] border-sandstone/30 hover:border-[#1b2a4a]/50'}`}>{item}</button>)}
              </div>
            </div>
            <div>
              <label className="flex items-center gap-2 text-[#1b2a4a] font-semibold mb-3"><Sparkles size={18} className="text-gold" /> Interests <span className="text-[#1b2a4a]/40 font-normal text-sm">(optional - select one or more)</span></label>
              <div className="flex flex-wrap gap-3">
                {interestOptions.map((item) => <button key={item} type="button" onClick={() => toggleInterest(item)} className={`px-5 py-2.5 rounded-full text-sm font-medium border-2 transition ${interests.includes(item) ? 'bg-gold text-[#1b2a4a] border-gold' : 'bg-white text-[#1b2a4a] border-sandstone/30 hover:border-gold/50'}`}>{item}</button>)}
              </div>
            </div>
            <div className="text-center pt-2">
              <button type="submit" className="inline-flex items-center gap-2 bg-[#1b2a4a] hover:bg-[#243760] text-cream font-bold px-10 py-4 rounded-full text-base transition hover:shadow-xl">
                <Search size={20} /> Find Places
              </button>
            </div>
          </form>

          {submitted && itinerary && (
            <div className="mt-8 space-y-6">
              {/* Summary bar */}
              <div className="bg-gold/10 border border-gold/30 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Route size={20} className="text-gold" />
                  <p className="text-[#1b2a4a] font-bold text-sm">Suggested Itinerary</p>
                </div>
                <p className="text-[#1b2a4a] font-semibold text-sm">{itinerary.summary}</p>
                <p className="text-[#1b2a4a]/60 text-sm mt-1">
                  {time} · {interests.length ? interests.join(', ') : 'All interests'}
                </p>
                {itinerary.confirmedCount > 0 && (
                  <p className="text-[#1b2a4a]/70 text-sm mt-2">
                    Estimated visit time for confirmed stops: <span className="font-semibold">{itinerary.totalTimeLabel}</span>
                  </p>
                )}
              </div>

              {/* Confirmed stops */}
              {confirmedStops.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 size={18} className="text-green-600" />
                    <h3 className="text-[#1b2a4a] font-bold text-sm">Confirmed Stops ({confirmedStops.length})</h3>
                    <span className="text-xs text-[#1b2a4a]/50">Fit within {time} based on estimated visit durations</span>
                  </div>
                  <div className="space-y-4">
                    {confirmedStops.map((stop) => (
                      <StopCard key={stop.attraction.id} stop={stop} onViewDetails={onViewDetails} />
                    ))}
                  </div>
                </div>
              )}

              {/* Suggestion stops */}
              {suggestionStops.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Info size={18} className="text-amber-600" />
                    <h3 className="text-[#1b2a4a] font-bold text-sm">Additional Suggestions ({suggestionStops.length})</h3>
                    <span className="text-xs text-[#1b2a4a]/50">May not fit within {time} or have unknown duration</span>
                  </div>
                  <div className="space-y-4">
                    {suggestionStops.map((stop) => (
                      <StopCard key={stop.attraction.id} stop={stop} onViewDetails={onViewDetails} />
                    ))}
                  </div>
                </div>
              )}

              {/* Warnings */}
              {itinerary.warnings.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle size={18} className="text-amber-600" />
                    <p className="text-amber-900 font-semibold text-sm">Please note</p>
                  </div>
                  {itinerary.warnings.map((warning, idx) => (
                    <p key={idx} className="text-amber-800 text-xs leading-relaxed pl-7">{warning}</p>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );

  function StopCard({ stop, onViewDetails }: { stop: import('@/data/attractionTypes').ItineraryStop; onViewDetails: (a: Attraction) => void }) {
    return (
      <div className={`border rounded-xl p-5 flex flex-col sm:flex-row gap-4 ${stop.fitsTimeBudget ? 'bg-cream border-sandstone/25' : 'bg-amber-50/50 border-amber-200/50'}`}>
        <div className="flex-shrink-0 w-full sm:w-32 h-24 rounded-lg overflow-hidden bg-[#1b2a4a]">
          <AttractionImage src={stop.attraction.image} alt={stop.attraction.name} className="h-full w-full" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            {stop.fitsTimeBudget && (
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#1b2a4a] text-cream text-xs font-bold flex-shrink-0">{stop.order}</span>
            )}
            <h3 className="text-[#1b2a4a] font-bold text-base">{stop.attraction.name}</h3>
            <span className="text-xs font-medium text-gold bg-gold/15 px-2 py-0.5 rounded-full">{categoryNames[stop.attraction.category] ?? stop.attraction.category}</span>
          </div>
          <p className="text-xs text-[#1b2a4a]/50 mb-2">{subcategoryNames[stop.attraction.subcategory] ?? stop.attraction.subcategory} · {stop.attraction.address}</p>
          <p className="text-xs text-[#1b2a4a]/60 mb-2 flex items-center gap-1"><Clock3 size={13} className="text-gold" /> {stop.durationLabel}</p>
          <p className="text-sm text-[#1b2a4a]/70 mb-2">{stop.reason}</p>

          {/* Verification status line */}
          <div className="flex flex-wrap items-center gap-3 mb-2 text-xs">
            <span className={`font-medium ${stop.attraction.timings.value ? 'text-green-700' : 'text-amber-700'}`}>
              {stop.attraction.timings.value ? 'Hours verified' : 'Hours unverified'}
            </span>
            <span className={`font-medium ${stop.attraction.ticket.value ? 'text-green-700' : 'text-amber-700'}`}>
              {stop.attraction.ticket.value ? 'Tickets verified' : 'Tickets unverified'}
            </span>
          </div>

          {stop.uncertainty && (
            <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-2">
              <AlertCircle size={14} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800">{stop.uncertainty}</p>
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            <button onClick={() => onViewDetails(stop.attraction)} className="inline-flex items-center gap-1 text-xs font-semibold text-[#1b2a4a] bg-white border border-sandstone/30 rounded-lg px-3 py-1.5 hover:border-gold/50 transition">
              View Details <ChevronRight size={13} />
            </button>
            <a href={buildDirectionsUrl(stop.attraction)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-semibold text-cream bg-[#1b2a4a] rounded-lg px-3 py-1.5 hover:bg-[#243760] transition">
              <Navigation size={13} /> Directions from {ORIGIN_LOCATION}
            </a>
          </div>
        </div>
      </div>
    );
  }
}
