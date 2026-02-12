import recipes from './collections/recipes.json';
import logo from './assets/logo.png';

import CategorySection from './utils/CategorySection.jsx';

function App() {
  return (
      <div>
        <h1 style={{
          display: 'flex',
          alignItems: 'center',
          gap: '3px',
          color: '#2b7652'
        }}>
          <img
              src={logo}
              alt="Cookbook Logo"
              style={{width: '100px', height: '100px', borderRadius: '8px'}}/>
          orbitmeal
        </h1>
        {Object.entries(recipes).map(([categoryName, dishes]) => (
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