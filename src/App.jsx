import recipes from './collections/recipes.json';

function App() {
  return (
      <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
        <h1>My Digital Cookbook</h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
          {recipes.map((recipe) => (
              <div key={recipe.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', boxShadow: '2px 2px 10px rgba(0,0,0,0.1)' }}>
                <h2>{recipe.title}</h2>
                <p><strong>Time:</strong> {recipe.time}</p>
                <h3>Ingredients:</h3>
                <ul>
                  {recipe.ingredients.map((ing, index) => (
                      <li key={index}>{ing}</li>
                  ))}
                </ul>
              </div>
          ))}
        </div>
      </div>
  );
}

export default App;