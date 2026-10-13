import { X, MapPin, Clock, Ticket, Globe, UtensilsCrossed, Building, FileText, CheckCircle2, AlertCircle, AlertTriangle, ExternalLink, Navigation, Car, Hotel, Clock3, Sparkles, Calendar, Info } from 'lucide-react';
import AttractionImage from '@/components/AttractionImage';
import type { Attraction } from '@/data/attractionTypes';
import { buildDirectionsUrl, DEFAULT_ORIGIN } from '@/data/attractionTypes';

interface Props { attraction: Attraction | null; onClose: () => void; }

function DetailRow({ icon, label, value, status }: { icon: React.ReactNode; label: string; value: string; status?: string }) {
  const isUnverified = value === 'Not verified' || value === 'Not verified yet' || value === 'Conflicting information - not confirmed' || value === 'Conflicting information' || value === 'Uncertain - sources conflict' || value === 'Ticket arrangement not confirmed';
  return <div className="flex gap-3 py-3 border-b border-sandstone/15 last:border-0"><div className="flex-shrink-0 mt-0.5 text-gold">{icon}</div><div className="min-w-0"><p className="text-xs font-semibold text-[#1b2a4a]/50 uppercase tracking-wide mb-1">{label}</p><p className={`text-sm leading-relaxed ${isUnverified ? 'text-[#1b2a4a]/50 italic' : 'text-[#1b2a4a]'}`}>{value}</p>{status && <p className="text-xs text-[#1b2a4a]/55 mt-1">{status}</p>}</div></div>;
}

function LinkRow({ icon, label, href, linkText, emptyText }: { icon: React.ReactNode; label: string; href: string | null; linkText: string; emptyText: string }) {
  return href ? <div className="flex gap-3 py-3 border-b border-sandstone/15"><div className="flex-shrink-0 mt-0.5 text-gold">{icon}</div><div><p className="text-xs font-semibold text-[#1b2a4a]/50 uppercase tracking-wide mb-1">{label}</p><a href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm text-[#1b2a4a] underline hover:text-gold">{linkText} <ExternalLink size={13} /></a></div></div> : <DetailRow icon={icon} label={label} value={emptyText} />;
}

function SourceLinks({ sources }: { sources: string[] }) {
  return <div className="flex gap-3 py-3 border-b border-sandstone/15"><div className="flex-shrink-0 mt-0.5 text-gold"><FileText size={18} /></div><div><p className="text-xs font-semibold text-[#1b2a4a]/50 uppercase tracking-wide mb-1">Sources</p><div className="grid gap-1">{sources.map((source) => <a key={source} href={source} target="_blank" rel="noreferrer" className="break-all text-sm text-[#1b2a4a] underline hover:text-gold">{source}</a>)}</div></div></div>;
}

function MapButton({ href, icon, label, variant }: { href: string; icon: React.ReactNode; label: string; variant: 'primary' | 'secondary' }) {
  return <a href={href} target="_blank" rel="noreferrer" className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${variant === 'primary' ? 'bg-[#1b2a4a] text-cream hover:bg-[#243760]' : 'bg-white border border-sandstone/30 text-[#1b2a4a] hover:border-gold/50'}`}>{icon}{label}</a>;
}

export default function AttractionDetailsModal({ attraction, onClose }: Props) {
  if (!attraction) return null;

  const timingConflict = attraction.verificationStatus.toLowerCase().includes('timings conflict');
  const isPotentiallyClosed = attraction.verificationStatus.toLowerCase().includes('potentially closed');

  const ticketValue = attraction.ticket.value === null
    ? (attraction.ticket.display === 'Not verified' ? 'Not verified' : attraction.ticket.display)
    : attraction.ticket.display;
  const timingValue = attraction.timings.value === null
    ? (attraction.timings.display === 'Not verified' ? 'Not verified' : attraction.timings.display)
    : attraction.timings.display;
  const closedDaysValue = attraction.closedDays.value === null
    ? attraction.closedDays.display
    : attraction.closedDays.display;

  return <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1b2a4a]/70 backdrop-blur-sm" onClick={onClose}>
    <div className="bg-cream rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(event) => event.stopPropagation()}>
      {/* Image header */}
      <div className="relative h-56 overflow-hidden rounded-t-2xl bg-[#1b2a4a]">
        <AttractionImage src={attraction.image} alt={attraction.name} className="h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1b2a4a]/70 to-transparent" />
        <button onClick={onClose} className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-cream rounded-full p-2" aria-label="Close"><X size={20} /></button>
        <div className="absolute bottom-4 left-5">
          <span className="text-xs font-semibold text-cream bg-[#1b2a4a]/90 px-3 py-1.5 rounded-full">{attraction.category === 'historical-heritage' ? 'Historical & Architectural Heritage' : attraction.category === 'musical-heritage' ? 'Music & Culture' : 'Spiritual & Scenic Places'}</span>
          <h2 className="text-cream text-2xl font-bold mt-2">{attraction.name}</h2>
          <p className="text-cream/70 text-xs mt-1">{attraction.subcategory.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}</p>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {/* Short description */}
        <p className="text-[#1b2a4a]/80 text-sm leading-relaxed mb-5">{attraction.shortDescription}</p>

        {/* Detailed description */}
        <div className="bg-white rounded-xl p-5 border border-sandstone/20 mb-5">
          <h3 className="text-[#1b2a4a] font-bold text-sm uppercase tracking-wide mb-2">About</h3>
          <p className="text-sm text-[#1b2a4a] leading-relaxed">{attraction.description}</p>
        </div>

        {/* Historical significance */}
        <div className="bg-white rounded-xl p-5 border border-sandstone/20 mb-5">
          <h3 className="text-[#1b2a4a] font-bold text-sm uppercase tracking-wide mb-2 flex items-center gap-2"><Sparkles size={16} className="text-gold" />Historical & Cultural Significance</h3>
          <p className="text-sm text-[#1b2a4a] leading-relaxed">{attraction.historicalSignificance}</p>
        </div>

        {/* Map action buttons */}
        <div className="mb-5">
          <h3 className="text-[#1b2a4a] font-bold text-sm uppercase tracking-wide mb-3">Maps & Directions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <MapButton href={attraction.mapsSearchUrl} icon={<MapPin size={16} />} label="Open in Google Maps" variant="primary" />
            <MapButton href={buildDirectionsUrl(attraction)} icon={<Navigation size={16} />} label={`Directions from ${DEFAULT_ORIGIN}`} variant="primary" />
            <MapButton href={attraction.nearbyRestaurants.url} icon={<UtensilsCrossed size={16} />} label="Find Nearby Restaurants" variant="secondary" />
            <MapButton href={attraction.nearbyHotels.url} icon={<Hotel size={16} />} label="Find Nearby Hotels" variant="secondary" />
            <MapButton href={attraction.parkingUrl} icon={<Car size={16} />} label="Find Parking" variant="secondary" />
          </div>
          {attraction.nearbyRestaurants.name && (
            <p className="text-xs text-[#1b2a4a]/55 mt-2">Restaurant mention: {attraction.nearbyRestaurants.name}. Verify current operation before visiting.</p>
          )}
        </div>

        {/* Visit details */}
        <div className="bg-white rounded-xl p-5 border border-sandstone/20 mb-5">
          <h3 className="text-[#1b2a4a] font-bold text-sm uppercase tracking-wide mb-2">Visit Details</h3>
          <DetailRow icon={<MapPin size={18} />} label="Location" value={attraction.address} status={attraction.locationStatus} />
          <DetailRow icon={<Clock size={18} />} label="Opening hours" value={timingValue} status={attraction.timings.status} />
          <DetailRow icon={<Calendar size={18} />} label="Closed days" value={closedDaysValue} status={attraction.closedDays.status} />
          <DetailRow icon={<Ticket size={18} />} label="Ticket prices" value={ticketValue} status={attraction.ticket.status} />
          <LinkRow icon={<Globe size={18} />} label="Official website" href={attraction.officialWebsite} linkText="Visit official website" emptyText="No official website verified" />
          <LinkRow icon={<Ticket size={18} />} label="Official booking" href={attraction.bookingUrl} linkText="Book tickets" emptyText={attraction.bookingDisplay} />
          <DetailRow icon={<Clock3 size={18} />} label="Suggested visit duration" value={attraction.suggestedDuration} />
        </div>

        {/* Highlights */}
        <div className="bg-white rounded-xl p-5 border border-sandstone/20 mb-5">
          <h3 className="text-[#1b2a4a] font-bold text-sm uppercase tracking-wide mb-3">Highlights</h3>
          <div className="grid gap-2">
            {attraction.highlights.map((highlight) => (
              <div key={highlight} className="flex items-start gap-2 text-sm text-[#1b2a4a]">
                <CheckCircle2 size={16} className="text-gold flex-shrink-0 mt-0.5" />
                {highlight}
              </div>
            ))}
          </div>
        </div>

        {/* Visitor interests */}
        <div className="bg-white rounded-xl p-5 border border-sandstone/20 mb-5">
          <h3 className="text-[#1b2a4a] font-bold text-sm uppercase tracking-wide mb-3">Visitor Interests</h3>
          <div className="flex flex-wrap gap-2">
            {attraction.visitorInterests.map((interest) => (
              <span key={interest} className="text-xs font-medium text-[#1b2a4a] bg-gold/15 px-3 py-1.5 rounded-full">{interest}</span>
            ))}
          </div>
        </div>

        {/* Nearby facilities */}
        {attraction.nearbyFacilities.length > 0 && (
          <div className="bg-white rounded-xl p-5 border border-sandstone/20 mb-5">
            <h3 className="text-[#1b2a4a] font-bold text-sm uppercase tracking-wide mb-3">Nearby Facilities</h3>
            {attraction.nearbyFacilities.map((facility) => (
              <div key={facility.name} className="py-2 border-b border-sandstone/15 last:border-0">
                <p className="text-sm font-semibold text-[#1b2a4a]">{facility.name}</p>
                <p className="text-xs text-[#1b2a4a]/60">{facility.address}</p>
                <p className="text-xs text-[#1b2a4a]/55 mt-1">{facility.status}</p>
              </div>
            ))}
          </div>
        )}

        {/* ===== WARNINGS & VERIFICATION (moved to bottom) ===== */}
        <div className="space-y-4 mb-5">
          <h3 className="text-[#1b2a4a] font-bold text-sm uppercase tracking-wide">Verification & Warnings</h3>

          {/* Verification status badge */}
          <span className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full border bg-amber-100 text-amber-900 border-amber-200">
            <AlertCircle size={18} />{attraction.verificationStatus}
          </span>

          {/* Warning banner */}
          {attraction.warning && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex gap-3">
              <AlertTriangle size={20} className="text-red-600 flex-shrink-0" />
              <div><p className="text-red-800 text-sm font-semibold">Important warning</p><p className="text-red-700 text-sm mt-1">{attraction.warning}</p></div>
            </div>
          )}

          {/* Timing conflict banner */}
          {timingConflict && (
            <div className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-3 flex gap-3">
              <AlertTriangle size={20} className="text-orange-600 flex-shrink-0" />
              <div><p className="text-orange-800 text-sm font-semibold">Conflicting timing information</p><p className="text-orange-700 text-sm mt-1">{attraction.timings.status}</p></div>
            </div>
          )}

          {/* Potentially closed banner */}
          {isPotentiallyClosed && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex gap-3">
              <AlertTriangle size={20} className="text-red-600 flex-shrink-0" />
              <div><p className="text-red-800 text-sm font-semibold">Potentially closed</p><p className="text-red-700 text-sm mt-1">Please confirm that this attraction is open before visiting.</p></div>
            </div>
          )}

          {/* Verification details */}
          <div className="bg-white rounded-xl p-5 border border-sandstone/20">
            <DetailRow icon={<Building size={18} />} label="Facilities status" value={attraction.facilitiesStatus} />
            <DetailRow icon={<Info size={18} />} label="Verification notes" value={attraction.verificationNotes} />
            <SourceLinks sources={attraction.sourceUrls} />
            <DetailRow icon={<CheckCircle2 size={18} />} label="Last verified" value={attraction.lastVerified} />
          </div>
        </div>

        <button onClick={onClose} className="mt-2 w-full bg-[#1b2a4a] hover:bg-[#243760] text-cream font-semibold px-6 py-3 rounded-xl text-sm">Close</button>
      </div>
    </div>
  </div>;
}
