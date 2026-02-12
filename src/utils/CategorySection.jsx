import { useState } from 'react';
import '../App.css'; // Make sure your CSS is linked

function CategorySection({ title, dishes }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null); // New state for the popup

  return (
      <section style={{ marginBottom: '20px' }}>
        {/* Category Button */}
        <button className="category-button" onClick={() => setIsOpen(!isOpen)}>
          {title}
          <span>{isOpen ? '▲' : '▼'}</span>
        </button>

        {/* Recipe List (shown when category is open) */}
        {isOpen && (
            <div className="recipe-grid">
              {dishes.map((dish, index) => (
                  <div
                      key={index}
                      className="recipe-card"
                      onClick={() => setSelectedRecipe(dish)} // Click to open popup
                  >
                    <h3 style={{ color: '#e67e22', cursor: 'pointer' }}>{dish.title}</h3>
                  </div>
              ))}
            </div>
        )}

        {/* Popup Overlay (Modal) */}
        {selectedRecipe && (
            <div className="modal-overlay" onClick={() => setSelectedRecipe(null)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={() => setSelectedRecipe(null)}>×</button>

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
/*
import {useState} from 'react';

function CategorySection({title, dishes}) {
  const [isOpen, setIsOpen] = useState(false);

  return (<section style={{marginBottom: '20px'}}>
    <button
        id={'category'}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          textAlign: 'left',
          padding: '15px',
          fontSize: '1.5rem',
          textTransform: 'capitalize',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#eee',
          border: '1px solid #ccc',
          borderRadius: '8px'
        }}>
      {title}
      <span>{isOpen ? '▲' : '▼'}</span>
    </button>

    {isOpen && (<div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '20px',
      marginTop: '20px',
      padding: '10px'
    }}>
      {dishes.map((dish, index) => (<div key={index} style={{
        border: '1px solid #ddd',
        padding: '15px',
        borderRadius: '8px',
        background: 'white'
      }}>
        <h3 style={{color: '#e67e22'}}>{dish.title}</h3>
      </div>))}
    </div>)}
  </section>);
}

export default CategorySection;
*/
