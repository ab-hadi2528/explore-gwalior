import type { Attraction, ItineraryResult, ItineraryStop } from '@/data/attractionTypes';

const interestToCategoryMap: Record<string, string[]> = {
  'Historical Places': ['historical-heritage'],
  'Musical Heritage': ['musical-heritage'],
  'Museums': ['historical-heritage'],
  'Nature': ['spiritual-scenic'],
  'Spirituality': ['spiritual-scenic', 'historical-heritage'],
  'Local Culture': ['musical-heritage', 'historical-heritage'],
  'Architecture': ['historical-heritage', 'spiritual-scenic'],
  'Photography': ['historical-heritage', 'musical-heritage', 'spiritual-scenic'],
};

const durationMinutes: Record<string, number> = {
  '30-45 minutes (planning estimate)': 38,
  '45-60 minutes if open (estimate)': 53,
  '1-1.5 hours (planning estimate)': 75,
  '1.5-2 hours': 105,
  '2-3 hours (planning estimate)': 150,
  '3-4 hours for the main fort complex. Sound and Light Show requires additional evening time.': 210,
};

function parseTimeLimit(time: string): number {
  const match = time.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 4;
}

function attractionMatchesInterests(attraction: Attraction, interests: string[]): boolean {
  if (interests.length === 0) return true;
  const matchedCategories = new Set<string>();
  for (const interest of interests) {
    const cats = interestToCategoryMap[interest];
    if (cats) cats.forEach((c) => matchedCategories.add(c));
  }
  if (matchedCategories.has(attraction.category)) return true;
  const interestLower = interests.map((i) => i.toLowerCase());
  return attraction.visitorInterests.some((vi) =>
    interestLower.some((il) => vi.toLowerCase().includes(il) || il.includes(vi.toLowerCase()))
  );
}

function reasonForAttraction(attraction: Attraction, interests: string[]): string {
  const reasons: string[] = [];
  if (interests.length > 0) {
    const matched = interests.filter((interest) => {
      const cats = interestToCategoryMap[interest];
      return cats?.includes(attraction.category) ||
        attraction.visitorInterests.some((vi) =>
          vi.toLowerCase().includes(interest.toLowerCase()) ||
          interest.toLowerCase().includes(vi.toLowerCase())
        );
    });
    if (matched.length > 0) {
      reasons.push(`Matches your interest in ${matched.join(', ')}`);
    }
  }
  if (reasons.length === 0) reasons.push('A notable Gwalior attraction worth visiting');
  return reasons.join('; ');
}

function uncertaintyForAttraction(attraction: Attraction): string | null {
  const uncertainties: string[] = [];
  if (attraction.timings.value === null && !attraction.timings.display.toLowerCase().includes('see fort hours')) {
    uncertainties.push('Opening hours not verified');
  }
  if (attraction.ticket.value === null) {
    uncertainties.push('Ticket price not verified');
  }
  if (attraction.warning) {
    uncertainties.push(attraction.warning);
  }
  return uncertainties.length > 0 ? uncertainties.join('. ') : null;
}

export function generateItinerary(
  attractions: Attraction[],
  startingLocation: string,
  timeLimit: string,
  interests: string[]
): ItineraryResult {
  const totalMinutes = parseTimeLimit(timeLimit);
  const warnings: string[] = [];

  let pool = attractions.filter((a) => a.id !== 'sarod-ghar-museum');
  pool = pool.filter((a) => attractionMatchesInterests(a, interests));

  if (pool.length === 0) {
    pool = attractions.filter((a) => a.id !== 'sarod-ghar-museum');
    warnings.push('No attractions directly matched your selected interests. Showing a general selection of Gwalior attractions.');
  }

  const startingMatch = pool.find((a) =>
    a.name.toLowerCase().includes(startingLocation.toLowerCase()) ||
    startingLocation.toLowerCase().includes(a.name.toLowerCase().replace("'s tomb", '').replace(', gwalior', ''))
  );

  let ordered: Attraction[];
  if (startingMatch) {
    ordered = [startingMatch, ...pool.filter((a) => a.id !== startingMatch.id)];
  } else {
    ordered = [...pool];
  }

  const stops: ItineraryStop[] = [];
  let accumulatedMinutes = 0;
  let order = 1;

  for (const attraction of ordered) {
    const dur = durationMinutes[attraction.suggestedDuration] ?? 60;
    if (accumulatedMinutes + dur > totalMinutes && stops.length > 0) {
      warnings.push(`The ${timeLimit} time limit was reached. ${attraction.name} and other attractions were not included to respect your time constraint.`);
      break;
    }
    accumulatedMinutes += dur;
    stops.push({
      attraction,
      reason: reasonForAttraction(attraction, interests),
      durationLabel: attraction.suggestedDuration,
      order,
      uncertainty: uncertaintyForAttraction(attraction),
    });
    order++;
  }

  if (stops.length === 0) {
    return {
      stops: [],
      totalTimeLabel: '0 hours',
      summary: 'No itinerary could be generated. Please try different options.',
      warnings: ['No attractions could be selected for the given criteria.'],
    };
  }

  const hours = Math.floor(accumulatedMinutes / 60);
  const mins = accumulatedMinutes % 60;
  const totalTimeLabel = mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;

  const summary = stops.length === 1
    ? `1 attraction selected for your ${timeLimit} visit starting from ${startingLocation}.`
    : `${stops.length} attractions selected for your ${timeLimit} visit starting from ${startingLocation}.`;

  const unverifiedTimingsCount = stops.filter((s) => s.uncertainty && s.uncertainty.includes('Opening hours')).length;
  if (unverifiedTimingsCount > 0) {
    warnings.push(`${unverifiedTimingsCount} attraction(s) in this itinerary have unverified opening hours. Please confirm before visiting.`);
  }

  warnings.push('Travel times between attractions are not calculated. Use the Google Maps directions links to estimate travel time.');

  return { stops, totalTimeLabel, summary, warnings };
}
