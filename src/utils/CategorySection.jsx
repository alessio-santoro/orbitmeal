import {useState} from 'react';
import '../App.css';
import PropTypes from "prop-types";

function CategorySection({title, dishes}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  return (
      <section style={{marginBottom: '20px'}}>
        <button className="meal-button" onClick={() => setIsOpen(!isOpen)}>
          {title}
          <span className={"meal-arrow"}>{isOpen ? '▲' : '▼'}</span>
        </button>

        {isOpen && (
            <div className="recipe-grid">
              {dishes.map((dish) => (
                  <button
                      key={dish.title.hash}
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
              <div className="modal-content" role="button"
                   onClick={(e) => e.stopPropagation()}>
                <button className="close-button"
                        onClick={() => setSelectedRecipe(null)}>×
                </button>
                <h2>{selectedRecipe.title}</h2>
                <h3>Ingredients:</h3>
                <ul>
                  {selectedRecipe.recipe.ingredients.map(
                      (ing) => (<li key={ing.hash}>{ing}</li>))}
                </ul>
                <h3>Steps:</h3>
                <ol>
                  {selectedRecipe.recipe.steps.map((step) => (
                      <li key={step.hash}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>
        )}
      </section>
  );
}

CategorySection.propTypes = {
  title: PropTypes.string,
  dishes: PropTypes.array
}

export default CategorySection;
