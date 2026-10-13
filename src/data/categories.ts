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
    title: 'Historical Heritage',
    description:
      "Explore Gwalior's majestic forts, palaces, and museums that tell the story of its royal past.",
    image:
      'https://images.pexels.com/photos/5949485/pexels-photo-5949485.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    subcategories: ['Forts & Monuments', 'Palaces & Museums'],
  },
  {
    id: 'musical-heritage',
    title: 'Musical Heritage',
    description:
      'Discover the legacy of the Gwalior Gharana and the legendary musicians who shaped Indian classical music.',
    image:
      'https://images.pexels.com/photos/39943661/pexels-photo-39943661.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    subcategories: ['Musicians & Memorials'],
  },
];
