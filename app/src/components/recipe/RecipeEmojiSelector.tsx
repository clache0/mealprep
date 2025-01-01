import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import '../../styles/components/recipe/RecipeEmojiSelector.css';
import { Recipe } from '../../types/types';

interface RecipeProps {
  recipe: Recipe;
  onSaveEmoji: (emoji: string) => void;
  onClose: () => void;
}

const RecipeEmojiSelector: React.FC<RecipeProps> = ({ recipe, onSaveEmoji, onClose }) => {
  const [selectedEmoji, setSelectedEmoji] = useState(recipe.emoji || '');

  const handleEmojiClick = (emojiData: any) => {
    setSelectedEmoji(emojiData.emoji);
    onSaveEmoji(emojiData.emoji);
  };

  return (
    <>
      <div className="emoji-selector-backdrop" onClick={onClose}></div>

      {/* Emoji Selector Modal */}
      <div className="emoji-selector-container">
        <button className="close-button" onClick={onClose}>
          ✖
        </button>
        <h3>{recipe.name}</h3>
        <p>Selected Emoji: {selectedEmoji || 'None'}</p>
        <EmojiPicker onEmojiClick={handleEmojiClick} />
      </div>
    </>
  );
};

export default RecipeEmojiSelector;
