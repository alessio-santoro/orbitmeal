import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faShuffle,
  faArrowDownAZ,
  /*faCalculator*/
} from '@fortawesome/free-solid-svg-icons';
import {useState, useMemo} from 'react';
import recipes from './collections/recipes.json';
import CategorySection from './utils/CategorySection.jsx';
import logo from './assets/logo.png';
import {getShuffledData, getSortedData} from "./utils/SortUtils.jsx";

function App() {

  const [displayRecipes, setDisplayRecipes] = useState(getSortedData(recipes));
  const [searchQuery, setSearchQuery] = useState("");

  const handleShuffle = () => {
    const shuffled = getShuffledData(recipes);
    setDisplayRecipes(shuffled);
  };
  const handleReset = () => {
    setDisplayRecipes(getSortedData(recipes));
  };
  const filteredRecipes = useMemo(() => {
    const query = searchQuery.toLowerCase();
    const filtered = {};

    Object.entries(displayRecipes).forEach(([category, dishes]) => {
      const matchingDishes = dishes.filter(dish =>
          dish.title.toLowerCase().includes(query) ||
          dish.recipe.ingredients.some(ing => ing.toLowerCase().includes(query))
      );

      if (matchingDishes.length > 0) {
        filtered[category] = matchingDishes;
      }
    });

    return filtered;
  }, [searchQuery, displayRecipes]);

  return (
      <div style={{padding: '20px', fontFamily: 'sans-serif'}}>
        <h1 style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          margin: 0
        }}>
          <img src={logo} alt="Logo" style={{width: '60px'}}/>
          Orbitmeal
        </h1>
        <div className="app-container">
          <div className="search-container">
            <input
                type="text"
                placeholder="Search recipes or ingredients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
            />
          </div>
          <div className="button-group">
            <button onClick={handleShuffle} className="sort-button">
              <FontAwesomeIcon icon={faShuffle} style={{marginRight: '8px'}}/>
              <span className="button-text"> Shuffle </span>
            </button>

            <button onClick={handleReset} className="sort-button">
              <FontAwesomeIcon icon={faArrowDownAZ}
                               style={{marginRight: '8px'}}/>
              <span className="button-text"> Sort A-Z </span>
            </button>
          </div>
          {Object.entries(filteredRecipes).map(([categoryName, dishes]) => (
              <CategorySection
                  key={categoryName}
                  title={categoryName}
                  dishes={dishes}
              />
          ))}
        </div>
      </div>
  );
}

export default App;