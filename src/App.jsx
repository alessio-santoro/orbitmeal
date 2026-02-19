import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShuffle, faArrowDownAZ} from '@fortawesome/free-solid-svg-icons';
import {useState} from 'react';
import recipes from './collections/recipes.json';
import CategorySection from './utils/CategorySection.jsx';
import logo from './assets/logo.png';
import {getShuffledData, getSortedData} from "./utils/SortUtils.jsx";

function App() {

  const [displayRecipes, setDisplayRecipes] = useState(getSortedData(recipes));

  const handleShuffle = () => {
    const shuffled = getShuffledData(recipes);

    setDisplayRecipes(shuffled);
  };

  const handleReset = () => {
    setDisplayRecipes(getSortedData(recipes));
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
        <div className="button-group">
        <button
            onClick={handleShuffle}
            className="sort-button"
        >
          <FontAwesomeIcon icon={faShuffle} style={{marginRight: '8px'}}/>
          <span className="button-text"> Shuffle </span>
        </button>

        <button onClick={handleReset}
                className="sort-button">
          <FontAwesomeIcon icon={faArrowDownAZ} style={{marginRight: '8px'}}/>
          <span className="button-text"> Sort A-Z </span>
        </button>
        </div>
        {/*<br/>*/}
        {Object.entries(displayRecipes).map(([categoryName, dishes]) => (
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