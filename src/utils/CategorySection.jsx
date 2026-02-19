import {useState} from 'react';
import '../App.css'; // Make sure your CSS is linked

function CategorySection({title, dishes}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null); // New state for the popup

  return (
      <section style={{marginBottom: '20px'}}>
        {/* Category Button */}
        <button className="meal-button" onClick={() => setIsOpen(!isOpen)}>
          {title}
          <span className={"meal-arrow"}>{isOpen ? '▲' : '▼'}</span>
        </button>

        {/* Recipe List (shown when category is open) */}
        {isOpen && (
            <div className="recipe-grid">
              {dishes.map((dish, index) => (
                  <button
                      key={index}
                      className="recipe-card"
                      onClick={() => setSelectedRecipe(dish)}
                  >
                    <h3 style={{
                      color: '#e67e22',
                      cursor: 'pointer'
                    }}>{dish.title}</h3>
                  </button>
              ))}
            </div>
        )}

        {selectedRecipe && (
            <div className="modal-overlay"
                 onClick={() => setSelectedRecipe(null)}>
              <div className="modal-content"
                   onClick={(e) => e.stopPropagation()}>
                <button className="close-button"
                        onClick={() => setSelectedRecipe(null)}>×
                </button>

                <h2>{selectedRecipe.title}</h2>

                <h3>Ingredients:</h3>
                <ul>
                  {selectedRecipe.recipe.ingredients.map((ing, i) => (
                      <li key={i}>{ing}</li>
                  ))}
                </ul>

                <h3>Steps:</h3>
                <ol>
                  {selectedRecipe.recipe.steps.map((step, i) => (
                      <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>
        )}
      </section>
  );
}

export default CategorySection;
