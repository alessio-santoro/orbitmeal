import React, {useMemo, useState} from 'react';
import PropTypes from "prop-types";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faUtensils,
  faXmark
} from '@fortawesome/free-solid-svg-icons';
import {getIngredients} from "./GetIngredients.jsx";
import {generateMealPlan} from "./GenerateMealPlan.jsx";

function LaunchPlanner({recipes, onClose}) {

  const [step, setStep] = useState(1);
  const [breakfasts, setBreakfasts] = useState(0);
  const [meals, setMeals] = useState(0);
  const [soups, setSoups] = useState(0);
  const [salads, setSalads] = useState(0);
  const totalMeals = () => {
    return breakfasts + meals + soups + salads;
  }
  const allIngredients = useMemo(() => getIngredients(recipes), [recipes]);
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const [results, setResults] = useState([]);

  const [viewingRecipe, setViewingRecipe] = useState(null);

  const handleToggle = (ing) => {
    setCheckedIngredients(prev => ({
      ...prev, [ing]: !prev[ing]
    }));
  };

  const getSelectedIngredients = () => {
    return Object.keys(checkedIngredients).filter(
        ing => checkedIngredients[ing]);
  };

  const filteredAndSortedIngredients = useMemo(() => {
    const query = searchTerm.toLowerCase();
    return [...allIngredients]
        .filter(ing => ing.toLowerCase().includes(query))
        .sort((a, b) => {
          const aChecked = checkedIngredients[a];
          const bChecked = checkedIngredients[b];
          if (aChecked && !bChecked) {
            return -1;
          }
          if (!aChecked && bChecked) {
            return 1;
          }
          return a.localeCompare(b);
        });
  }, [searchTerm, checkedIngredients, allIngredients]);

  const handleClearAll = () => {
    const resetChecked = Object.keys(checkedIngredients).reduce((acc, ing) => {
      acc[ing] = false;
      return acc;
    }, {});
    setCheckedIngredients(resetChecked);
    setSearchTerm("");
  };

  const renderSlider = (title, counter, action) => {
    return (<> <h3>{title}: {counter}</h3> <input type="range" min={0} max={7}
                                                  value={counter}
                                                  onChange={action}
                                                  className="meal-slider"/> </>);
  };

  const calculatePlan = () => {
    const pantry = getSelectedIngredients();

    const counts = {
      breakfasts: breakfasts,
      meals: meals,
      salads: salads,
      soups: soups
    };
    const results = generateMealPlan(recipes, pantry, counts);
    console.log("Calculated results: ", results);
    setResults(results);
    setStep(3);
  };

  return (
      <div className="planner-overlay">
        <div className="planner-card">
          <button className="close-icon" onClick={onClose}>
            <FontAwesomeIcon icon={faXmark}/>
          </button>
          {step === 1 && (<div className="planner-step">
                <h2>Step 1: What's in your pantry?</h2>
                <p>Select the items you already have at home:</p>
                <div className="planner-search-container">
                  <div className="planner-search">
                    <input
                        type="text"
                        placeholder="Filter ingredients..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <button className="clear-all-btn" onClick={handleClearAll}
                          type="button">
                    Clear All
                  </button>
                </div>
                <div className="checklist-container">
                  {filteredAndSortedIngredients.map(ing => (
                      <label key={ing}
                             className={`checklist-item ${checkedIngredients[ing]
                                 ? 'is-checked' : ''}`}>
                        <input
                            type="checkbox"
                            checked={checkedIngredients[ing] || false}
                            onChange={() => handleToggle(ing)}
                        />
                        <span>{ing}</span>
                      </label>
                  ))}
                </div>
                <div className="planner-actions">
                  <button className="next-btn" onClick={() => setStep(2)}>
                    Next ({getSelectedIngredients().length} selected)
                  </button>
                </div>
              </div>
          )}
          {step === 2 && (
              <div className="planner-step">
                <h2>How many meals?</h2>
                <p>Choose the number of meals you'd like to plan for.</p>
                <div className="meal-count-selector">
                  {renderSlider("Breakfasts", breakfasts,
                      (e) => setBreakfasts(Number(e.target.value)))}
                  {renderSlider("Lunches/Dinners", meals,
                      (e) => setMeals(Number(e.target.value)))}
                  {renderSlider("Salads", salads,
                      (e) => setSalads(Number(e.target.value)))}
                  {renderSlider("Soups", soups,
                      (e) => setSoups(Number(e.target.value)))}
                  <h2 className="meal-badge">
                    {totalMeals()} {1 === totalMeals() ? "Meal" : "Meals"}
                  </h2>
                </div>
                <div className="planner-actions">
                  <button className="back-btn" onClick={() => setStep(1)}>
                    Back
                  </button>
                  <button className="next-btn" onClick={calculatePlan}>
                    <FontAwesomeIcon icon={faUtensils}/>
                    Generate My Plan
                  </button>
                </div>
              </div>
          )}
          {step === 3 && results?.shopList && (
              <div className="planner-step results-view">
                <h1>Your Custom Plan</h1>
                <div className="results-container">
                  <section className="meal-results">
                    <h2>Selected Recipes</h2>
                    <ul>
                      {results.plan.map((dish, idx) => (
                          <li key={idx} className="recipe-result-item">
                            <button
                                className="recipe-title-link"
                                onClick={() => setViewingRecipe(dish)}
                            >
                              <strong>{dish.title}</strong>
                            </button>
                          </li>
                      ))}
                    </ul>
                  </section>
                  <section className="shop-list">
                    <br/>
                    <h2>Shopping List</h2>
                    <div className="shop-list-container">
                      <ul className="simple-shop-list">
                        {results.shopList.map((item, idx) => (
                            <li key={idx} className="shop-item-text">
                              {item}
                            </li>
                        ))}
                      </ul>
                    </div>
                  </section>
                </div>

                <div className="planner-actions">
                  <button className="back-btn" onClick={() => setStep(1)}>Start
                    Over
                  </button>
                  <button className="next-btn" onClick={onClose}>Finish</button>
                </div>
              </div>
          )}
          {viewingRecipe && (
              <div className="recipe-detail-overlay">
                <div className="recipe-detail-card">
                  <button className="close-icon"
                          onClick={() => setViewingRecipe(null)}>
                    <FontAwesomeIcon icon={faXmark}/>
                  </button>

                  <h2>{viewingRecipe.title}</h2>
                  <hr/>

                  <div className="detail-content">
                    <h3>Ingredients:</h3>
                    <ul>
                      {/* Using your defensive logic for ingredients */}
                      {(viewingRecipe.recipe?.mandatory_ingredients
                          || viewingRecipe.mandatory_ingredients || []).map(
                          (ing, i) => (
                              <li key={i}>{ing}</li>
                          ))}
                    </ul>

                    <h3>Instructions:</h3>
                    <ol>
                      {viewingRecipe.recipe?.steps?.map((step, i) => (
                          <li key={i}>{step}</li>
                      )) || <li>No instructions available for this recipe.</li>}
                    </ol>
                  </div>
                </div>
              </div>
          )}
        </div>
      </div>

  );
}

LaunchPlanner.propTypes = {
  recipes: PropTypes.objectOf(
      PropTypes.arrayOf(
          PropTypes.shape({
            title: PropTypes.string.isRequired,
            recipe: PropTypes.shape({
              mandatory_ingredients: PropTypes.arrayOf(PropTypes.string),
              ingredients: PropTypes.arrayOf(PropTypes.string),
              steps: PropTypes.arrayOf(PropTypes.string)
            })
          })
      )
  ).isRequired,
  onClose: PropTypes.func.isRequired,
};
export default LaunchPlanner;