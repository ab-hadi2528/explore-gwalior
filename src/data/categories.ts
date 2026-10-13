export interface Category {
  id: string;
  title: string;
  description: string;
  image: string;
  subcategories: string[];
}

export const categories: Category[] = [
  {
    id: 'historical-heritage',
    title: 'Historical & Architectural Heritage',
    description:
      "Explore Gwalior's majestic forts, palaces, temples, and museums that tell the story of its royal past.",
    image:
      'https://images.pexels.com/photos/5949485/pexels-photo-5949485.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    subcategories: ['Forts & Palaces', 'Palaces & Museums', 'Archaeological Museums', 'Temples & Architecture'],
  },
  {
    id: 'musical-heritage',
    title: 'Music & Culture',
    description:
      'Discover the legacy of the Gwalior Gharana, legendary musicians, and the cultural heritage that shaped Indian classical music.',
    image:
      'https://images.pexels.com/photos/39943661/pexels-photo-39943661.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    subcategories: ['Musical Heritage', 'Musical Instruments & Heritage', 'Musical & Architectural Heritage'],
  },
  {
    id: 'spiritual-scenic',
    title: 'Spiritual & Scenic Places',
    description:
      "Visit serene temples and enjoy the natural beauty of Gwalior's scenic reservoirs and recreational spots.",
    image:
      'https://images.pexels.com/photos/27644579/pexels-photo-27644579.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    subcategories: ['Temples & Architecture', 'Nature & Recreation'],
  },
];
