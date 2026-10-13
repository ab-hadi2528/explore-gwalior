import { useState } from 'react';
import { MapPin, Clock, Sparkles, Search, Navigation, AlertTriangle, AlertCircle, Clock3, ChevronRight, Route } from 'lucide-react';
import type { Attraction, ItineraryResult } from '@/data/attractionTypes';
import AttractionImage from '@/components/AttractionImage';

const startingLocations = ['Gwalior Railway Station', 'Gwalior Fort', 'Jai Vilas Palace', 'Other'];
const timeOptions = ['2 hours', '4 hours', '6 hours', '8 hours'];
const interestOptions = ['Historical Places', 'Musical Heritage', 'Museums', 'Nature', 'Spirituality', 'Architecture', 'Photography', 'Local Culture'];

interface TripDiscoveryProps {
  onSuggest: (location: string, time: string, interests: string[]) => void;
  itinerary: ItineraryResult | null;
  onViewDetails: (attraction: Attraction) => void;
}

export default function TripDiscovery({ onSuggest, itinerary, onViewDetails }: TripDiscoveryProps) {
  const [location, setLocation] = useState(startingLocations[0]);
  const [time, setTime] = useState(timeOptions[0]);
  const [interests, setInterests] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const toggleInterest = (interest: string) => {
    setInterests((current) => current.includes(interest) ? current.filter((item) => item !== interest) : [...current, interest]);
    setSubmitted(false);
  };

  const handleFind = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSuggest(location, time, interests);
    setSubmitted(true);
  };

  return (
    <section id="explore" className="py-16 md:py-24 bg-cream px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-2">Trip Discovery</p>
          <h2 className="text-[#1b2a4a] text-3xl md:text-4xl font-bold mb-4">Plan Your Gwalior Experience</h2>
          <p className="text-[#1b2a4a]/60 text-base md:text-lg max-w-2xl mx-auto">Choose your starting point, available time, and interests to get a suggested itinerary from Gwalior's attractions.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-sandstone/20">
          <form onSubmit={handleFind} className="space-y-8">
            <div>
              <label className="flex items-center gap-2 text-[#1b2a4a] font-semibold mb-3"><MapPin size={18} className="text-gold" /> Starting Location</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {startingLocations.map((item) => <button key={item} type="button" onClick={() => { setLocation(item); setSubmitted(false); }} className={`px-4 py-3 rounded-xl text-sm font-medium border-2 transition ${location === item ? 'bg-[#1b2a4a] text-cream border-[#1b2a4a]' : 'bg-white text-[#1b2a4a] border-sandstone/30 hover:border-[#1b2a4a]/50'}`}>{item}</button>)}
              </div>
            </div>
            <div>
              <label className="flex items-center gap-2 text-[#1b2a4a] font-semibold mb-3"><Clock size={18} className="text-gold" /> Available Time</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
                  {location} · {time} · {interests.length ? interests.join(', ') : 'All interests'}
                </p>
                <p className="text-[#1b2a4a]/70 text-sm mt-2">
                  Estimated visit time: <span className="font-semibold">{itinerary.totalTimeLabel}</span> · {itinerary.stops.length} stop(s)
                </p>
              </div>

              {/* Itinerary stops */}
              {itinerary.stops.length > 0 && (
                <div className="space-y-4">
                  {itinerary.stops.map((stop) => (
                    <div key={stop.attraction.id} className="bg-cream border border-sandstone/25 rounded-xl p-5 flex flex-col sm:flex-row gap-4">
                      <div className="flex-shrink-0 w-full sm:w-32 h-24 rounded-lg overflow-hidden bg-[#1b2a4a]">
                        <AttractionImage src={stop.attraction.image} alt={stop.attraction.name} className="h-full w-full" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#1b2a4a] text-cream text-xs font-bold flex-shrink-0">{stop.order}</span>
                          <h3 className="text-[#1b2a4a] font-bold text-base">{stop.attraction.name}</h3>
                        </div>
                        <p className="text-xs text-[#1b2a4a]/60 mb-2 flex items-center gap-1"><Clock3 size={13} className="text-gold" /> {stop.durationLabel}</p>
                        <p className="text-sm text-[#1b2a4a]/70 mb-2">{stop.reason}</p>
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
                          <a href={stop.attraction.directionsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-semibold text-cream bg-[#1b2a4a] rounded-lg px-3 py-1.5 hover:bg-[#243760] transition">
                            <Navigation size={13} /> Directions
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
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
}
