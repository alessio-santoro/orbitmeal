import React, {useMemo, useState} from 'react';
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
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [results, setResults] = useState([]);

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

    setResults(generateMealPlan(recipes, pantry, counts));
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
                            checked={checkedIngredients[ing]}
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
          {step === 3 && (
              <div className="planner-step results-view">
                <h2>Your Custom Plan</h2>
                <div className="results-container">
                  <section className="meal-results">
                    <h3>Selected Recipes</h3>
                    <ul>
                      {results.plan.map((dish, idx) => (
                          <li key={idx}>
                            <strong>{dish.title}</strong>
                          </li>
                      ))}
                    </ul>
                  </section>

                  <section className="shop-list">
                    <h3>Shopping List</h3>
                    <p>You need to buy these items:</p>
                    <div className="checklist-container shop-list-items">
                      {results.shopList.map(item => (
                          <label key={item} className="checklist-item" />
                      ))}
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
        </div>
      </div>
  );
}

export default LaunchPlanner;