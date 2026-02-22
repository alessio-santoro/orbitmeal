import {useState, useMemo} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faShuffle,
  faArrowDownAZ,
  faCalculator
} from '@fortawesome/free-solid-svg-icons';
import CategorySection from './utils/CategorySection.jsx';
import LaunchPlanner from "./utils/LaunchPlanner.jsx";
import {
  getShuffledData,
  getSortedData,
  getFilteredData
} from "./utils/SortUtils.jsx";
import recipes from './collections/recipes.json';
import logo from './assets/logo.png';

function App() {

  const [displayRecipes, setDisplayRecipes] = useState(getSortedData(recipes));
  const [searchQuery, setSearchQuery] = useState("");
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);

  const handleShuffle = () => {
    const shuffled = getShuffledData(recipes);
    setDisplayRecipes(shuffled);
  };
  const handleReset = () => {
    setDisplayRecipes(getSortedData(recipes));
  };
  const filteredRecipes = useMemo(() => {
    return getFilteredData(displayRecipes, searchQuery);
  }, [searchQuery, displayRecipes]);

  return (
      <div style={{padding: '20px', fontFamily: 'sans-serif'}}>
        <h1 style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          margin: 0
        }}>
          <img src={logo} alt="Logo" style={{width: '100px'}}/>
          Orbitmeal
        </h1>
        <div className="app-container">
          <br/>
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
            <button onClick={() => setIsPlannerOpen(true)}
                    className="sort-button">
              <FontAwesomeIcon icon={faCalculator}
                               style={{marginRight: '16px'}}/>
              <span className="button-text"> Launch Planner </span>
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
        {isPlannerOpen && (
            <LaunchPlanner
                recipes={recipes}
                onClose={() => setIsPlannerOpen(false)}
            />
        )}
      </div>
  );
}

export default App;