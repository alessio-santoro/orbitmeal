import React, {useMemo, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faUtensils,
  faXmark
} from '@fortawesome/free-solid-svg-icons';
import {general} from "./General.jsx";

function LaunchPlanner({recipes, onClose}) {

  //validation for function's arguemnts

  const [step, setStep] = useState(1);
  const [mealCount, setMealCount] = useState(3);
  const allIngredients = useMemo(() => general(recipes), [recipes]);
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  //const [inventory, setInventory] = useState("");
  //const [results, setResults] = useState(null);

  const handleToggle = (ing) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [ing]: !prev[ing]
    }));
  };

  const getSelectedIngredients = () => {
    return Object.keys(checkedIngredients).filter(
        ing => checkedIngredients[ing]);
  };

  const calculatePlan = () => {
    // Logic goes here
    setStep(3);
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

                {getSelectedIngredients().length > 0 && (
                    <div className="planner-actions">
                      <button className="next-btn" onClick={() => setStep(2)}>
                        Next ({getSelectedIngredients().length} selected)
                      </button>
                    </div>)}
              </div>
          )}
          {step === 2 && (
              <div className="planner-step">
                <h2>How many meals?</h2>
                <p>Choose the number of meals you'd like to plan for the
                  week.</p>

                <div className="meal-count-selector">
                  <input
                      type="range"
                      min="1"
                      max="7"
                      value={mealCount}
                      onChange={(e) => setMealCount(e.target.value)}
                      className="meal-slider"
                  />
                  <div className="meal-badge">
                    {mealCount} {"1" === mealCount ? "Meal" : "Meals"}
                  </div>
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

          {/* Step 3: Results (Placeholder) */}
          {step === 3 && (
              <div className="planner-step">
                <h2>Your Custom Plan</h2>
                <p>Based on your pantry, we found these matches...</p>
                {/* Results will go here */}
                <button className="back-btn" onClick={() => setStep(1)}>Start
                  Over
                </button>
              </div>
          )}
        </div>
      </div>
  );
}

export default LaunchPlanner;