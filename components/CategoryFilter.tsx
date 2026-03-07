'use client'

type Category = 'All' | 'Mindset' | 'Discipline' | 'Growth' | 'Life'

interface CategoryFilterProps {
  onCategoryChange: (category: Category) => void
  activeCategory: Category
}

export default function CategoryFilter({ onCategoryChange, activeCategory }: CategoryFilterProps) {
  const categories: Category[] = ['All', 'Mindset', 'Discipline', 'Growth', 'Life']

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            activeCategory === category
              ? 'bg-accent text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
