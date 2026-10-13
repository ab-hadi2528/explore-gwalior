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

const durationMinutes: Record<string, number | null> = {
  '3-4 hours for the main fort complex. Sound and Light Show requires additional evening time.': 210,
  '1.5-2 hours': 105,
  '1-1.5 hours (planning estimate)': 75,
  '2-3 hours (planning estimate)': 150,
  '45-60 minutes if open (estimate)': 53,
  '30-45 minutes (planning estimate)': 38,
};

function parseTimeLimit(time: string): number {
  const match = time.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 4;
}

function getDurationMinutes(attraction: Attraction): number | null {
  return durationMinutes[attraction.suggestedDuration] ?? null;
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
  if (interests.length === 0) return 'A notable Gwalior attraction worth visiting.';
  const matched = interests.filter((interest) => {
    const cats = interestToCategoryMap[interest];
    return cats?.includes(attraction.category) ||
      attraction.visitorInterests.some((vi) =>
        vi.toLowerCase().includes(interest.toLowerCase()) ||
        interest.toLowerCase().includes(vi.toLowerCase())
      );
  });
  if (matched.length > 0) return `Recommended because you selected ${matched.join(', ')}.`;
  return 'A notable Gwalior attraction worth visiting.';
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
  _startingLocation: string,
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

  const stops: ItineraryStop[] = [];
  let accumulatedMinutes = 0;
  let confirmedCount = 0;
  let order = 1;

  for (const attraction of pool) {
    const dur = getDurationMinutes(attraction);
    let fitsTimeBudget = false;

    if (dur !== null && accumulatedMinutes + dur <= totalMinutes) {
      accumulatedMinutes += dur;
      fitsTimeBudget = true;
      confirmedCount++;
    }

    const durLabel = dur !== null
      ? attraction.suggestedDuration
      : `${attraction.suggestedDuration} (duration estimate only — cannot confirm fit)`;

    const uncertainty = uncertaintyForAttraction(attraction);
    let stopUncertainty = uncertainty;
    if (!fitsTimeBudget && dur !== null) {
      stopUncertainty = (stopUncertainty ? stopUncertainty + '. ' : '') +
        `Does not fit within ${timeLimit} based on estimated visit duration.`;
    }
    if (dur === null) {
      stopUncertainty = (stopUncertainty ? stopUncertainty + '. ' : '') +
        'Visit duration unknown — cannot confirm whether this fits your available time.';
    }

    stops.push({
      attraction,
      reason: reasonForAttraction(attraction, interests),
      durationLabel: durLabel,
      order,
      uncertainty: stopUncertainty,
      fitsTimeBudget,
    });
    order++;
  }

  if (stops.length === 0) {
    return {
      stops: [],
      totalTimeLabel: '0 hours',
      summary: 'No itinerary could be generated. Please try different options.',
      warnings: ['No attractions could be selected for the given criteria.'],
      confirmedCount: 0,
      suggestionCount: 0,
    };
  }

  const hours = Math.floor(accumulatedMinutes / 60);
  const mins = accumulatedMinutes % 60;
  const totalTimeLabel = mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  const suggestionCount = stops.length - confirmedCount;

  const parts: string[] = [`${stops.length} attraction(s) match your criteria`];
  if (confirmedCount > 0) {
    parts.push(`${confirmedCount} confirmed for your ${timeLimit} visit`);
  }
  if (suggestionCount > 0) {
    parts.push(`${suggestionCount} additional suggestion(s) that may not fit the time budget`);
  }
  parts.push(`starting from Gwalior Railway Station.`);
  const summary = parts.join(', ');

  const unverifiedTimingsCount = stops.filter((s) => s.uncertainty && s.uncertainty.includes('Opening hours')).length;
  if (unverifiedTimingsCount > 0) {
    warnings.push(`${unverifiedTimingsCount} attraction(s) have unverified opening hours. Please confirm before visiting.`);
  }

  warnings.push('Travel times from Gwalior Railway Station are not calculated. Use the Google Maps directions links to estimate travel time. Itinerary feasibility has not been verified against actual travel times.');

  return { stops, totalTimeLabel, summary, warnings, confirmedCount, suggestionCount };
}
