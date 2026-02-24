import {useState} from 'react';
import '../App.css';
import PropTypes from "prop-types";
import {faFilePdf, faXmark} from "@fortawesome/free-solid-svg-icons";
import {downloadRecipePDF} from "./PdfGenerator.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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
                      key={dish.title}
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
                <div className="button-group">
                  <button className="pdf-download-btn" title="Download PDF"
                          onClick={(e) => {
                            e.stopPropagation();
                            downloadRecipePDF(selectedRecipe);
                          }}
                  >
                    <FontAwesomeIcon icon={faFilePdf}/>
                  </button>
                  <button className="close-button"
                          onClick={() => setSelectedRecipe(null)}>
                    <FontAwesomeIcon icon={faXmark}/>
                  </button>
                </div>
                <h2>{selectedRecipe.title}</h2>
                <h3>Ingredients:</h3>
                <ul>
                  {selectedRecipe.recipe.ingredients.map(
                      (ing) => (<li key={ing}>{ing}</li>))}
                </ul>
                <h3>Steps:</h3>
                <ol>
                  {selectedRecipe.recipe.steps.map((step) => (
                      <li key={step}>{step}</li>
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
