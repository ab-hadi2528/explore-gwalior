import { SlidersHorizontal } from 'lucide-react';

interface AttractionFiltersProps {
  category: string;
  subcategory: string;
  onCategoryChange: (value: string) => void;
  onSubcategoryChange: (value: string) => void;
}

export default function AttractionFilters({ category, subcategory, onCategoryChange, onSubcategoryChange }: AttractionFiltersProps) {
  return <div className="mb-8 rounded-2xl border border-sandstone/25 bg-white p-5 md:p-6 shadow-sm">
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <SlidersHorizontal size={18} className="text-gold" />
      <h3 className="text-[#1b2a4a] font-semibold">Filter attractions</h3>
      <span className="text-sm text-[#1b2a4a]/50">Choose a category or subcategory</span>
    </div>
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="grid gap-2 text-sm font-semibold text-[#1b2a4a]">Category
        <select value={category} onChange={(event) => onCategoryChange(event.target.value)} className="rounded-xl border border-sandstone/35 bg-cream px-4 py-3 font-normal outline-none focus:border-gold">
          <option value="All">All categories</option>
          <option value="historical-heritage">Historical &amp; Architectural Heritage</option>
          <option value="musical-heritage">Music &amp; Culture</option>
          <option value="spiritual-scenic">Spiritual &amp; Scenic Places</option>
        </select>
      </label>
      <label className="grid gap-2 text-sm font-semibold text-[#1b2a4a]">Subcategory
        <select value={subcategory} onChange={(event) => onSubcategoryChange(event.target.value)} className="rounded-xl border border-sandstone/35 bg-cream px-4 py-3 font-normal outline-none focus:border-gold">
          <option value="All">All subcategories</option>
          <option value="forts-palaces">Forts &amp; Palaces</option>
          <option value="palaces-museums">Palaces &amp; Museums</option>
          <option value="archaeological-museums">Archaeological Museums</option>
          <option value="temples-architecture">Temples &amp; Architecture</option>
          <option value="musical-heritage">Musical Heritage</option>
          <option value="musical-instruments-heritage">Musical Instruments &amp; Heritage</option>
          <option value="musical-architectural-heritage">Musical &amp; Architectural Heritage</option>
          <option value="nature-recreation">Nature &amp; Recreation</option>
        </select>
      </label>
    </div>
  </div>;
}
