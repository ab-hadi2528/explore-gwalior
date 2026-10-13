import { useState } from 'react';
import { MapPin, Clock, Sparkles, Search } from 'lucide-react';

const startingLocations = ['Gwalior Railway Station', 'Gwalior Fort', 'Jai Vilas Palace', 'Other'];
const timeOptions = ['2 hours', '4 hours', '6 hours', '8 hours'];
const interestOptions = ['Historical Places', 'Musical Heritage', 'Museums', 'Nature', 'Local Culture'];

interface TripDiscoveryProps {
  onSuggest: (location: string, time: string, interests: string[]) => void;
}

export default function TripDiscovery({ onSuggest }: TripDiscoveryProps) {
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
          <p className="text-[#1b2a4a]/60 text-base md:text-lg max-w-2xl mx-auto">Choose your starting point, time, and interests. The prototype uses clear category rules, not travel-time calculations.</p>
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
              <label className="flex items-center gap-2 text-[#1b2a4a] font-semibold mb-3"><Sparkles size={18} className="text-gold" /> Interests <span className="text-[#1b2a4a]/40 font-normal text-sm">(optional)</span></label>
              <div className="flex flex-wrap gap-3">
                {interestOptions.map((item) => <button key={item} type="button" onClick={() => toggleInterest(item)} className={`px-5 py-2.5 rounded-full text-sm font-medium border-2 transition ${interests.includes(item) ? 'bg-gold text-[#1b2a4a] border-gold' : 'bg-white text-[#1b2a4a] border-sandstone/30 hover:border-gold/50'}`}>{item}</button>)}
              </div>
            </div>
            <div className="text-center pt-2"><button type="submit" className="inline-flex items-center gap-2 bg-[#1b2a4a] hover:bg-[#243760] text-cream font-bold px-10 py-4 rounded-full text-base transition hover:shadow-xl"><Search size={20} /> Find Places</button></div>
          </form>
          {submitted && <div className="mt-8 bg-gold/10 border border-gold/30 rounded-xl p-5 text-center"><p className="text-[#1b2a4a] font-semibold text-sm">Suggestions updated using transparent category rules.</p><p className="text-[#1b2a4a]/60 text-sm mt-1">{location} · {time} · {interests.length ? interests.join(', ') : 'All interests'}</p><p className="text-[#1b2a4a]/50 text-xs mt-2">Travel time and route distance have not been calculated.</p></div>}
        </div>
      </div>
    </section>
  );
}
