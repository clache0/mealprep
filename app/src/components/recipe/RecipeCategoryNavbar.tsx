import React, { useState } from 'react';
import { RecipeCategory } from '../../types/types';
import Button from '../general/Button';
import '../../styles/components/recipe/RecipeCategoryNavbar.css';

interface RecipeCategoryNavbarProps {
  onSelectCategory: (category: RecipeCategory | null) => void;
}

const RecipeCategoryNavbar: React.FC<RecipeCategoryNavbarProps> = ({ onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState<RecipeCategory | null>(null);

  const handleCategoryClick = (category: RecipeCategory) => {
    // Clear selected category if already selected
    if (selectedCategory === category) {
      setSelectedCategory(null);
      onSelectCategory(null);
    }
    else {
      setSelectedCategory(category);
      onSelectCategory(category);
    }
  };

  return (
    <div className="recipe-category-navbar">
      {Object.values(RecipeCategory)
        .map((category) => (
          <Button
            key={category}
            label={category}
            onClick={() => handleCategoryClick(category)}
            backgroundColor={selectedCategory === category ? 'var(--primary-color)' : 'var(--medium-gray)'}
          />
        ))}
    </div>
  );
};

export default RecipeCategoryNavbar;
