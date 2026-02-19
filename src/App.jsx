import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShuffle} from '@fortawesome/free-solid-svg-icons';
import {useState} from 'react';
import recipes from './collections/recipes.json';
import CategorySection from './utils/CategorySection.jsx';
import logo from './assets/logo.png';
import {getShuffledData} from "./utils/SortUtils.jsx";

function App() {

  const [shuffledRecipes, setShuffledRecipes] = useState(
      getShuffledData(recipes));

  const handleShuffleClick = () => {
    setShuffledRecipes(getShuffledData(recipes));
  };

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
        <button
            onClick={handleShuffleClick}
            className="shuffle-button"
        >
          <FontAwesomeIcon icon={faShuffle} style={{marginRight: '8px'}}/>
          <span className="button-text"> Shuffle Recipes</span>
        </button>
        <br/>
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