import recipes from './collections/recipes.json';
import logo from './assets/logo.png';

import CategorySection from './utils/CategorySection.jsx';
import {useMemo} from "react";

const shuffleArray = (array) => {
  const shuffled = [...array]; // Create a copy so we don't mutate the original
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

function App() {

  const shuffledRecipes = useMemo(() => {
    const newRecipes = {};

    for (const [category, list] of Object.entries(recipes)) {
      newRecipes[category] = shuffleArray(list);
    }

    return newRecipes;
  }, []); // The empty array [] ensures this only runs once

  return (
      <div>
        <h1 style={{
          display: 'flex',
          alignItems: 'center',
          gap: '3px',
          color: '#2b7652'
        }}>
          <img
              src={logo}
              alt="Cookbook Logo"
              style={{width: '100px', height: '100px', borderRadius: '8px'}}/>
          orbitmeal
        </h1>
        {Object.entries(shuffledRecipes).map(([categoryName, dishes]) => (
            <CategorySection
                key={categoryName}
                title={categoryName}
                dishes={dishes}
            />
        ))}
      </div>
  );
}

export default App;