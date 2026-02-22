const shuffleArray = (array) => {
  if (!Array.isArray(array)) {
    return [];
  }
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const getShuffledData = (allRecipes) => {
  const newRecipes = {};
  Object.entries(allRecipes).forEach(([category, list]) => {
    newRecipes[category] = shuffleArray(list);
  });
  return newRecipes;
};

export const getSortedData = (data) => {
  const sorted = {};
  Object.keys(data).forEach(category => {
    sorted[category] = [...data[category]].sort((a, b) =>
        a.title.localeCompare(b.title)
    );
  });
  return sorted;
};

export const getFilteredData = (data, query) => {
  const lowerQuery = query.toLowerCase();
  const filtered = {};

  Object.entries(data).forEach(([category, dishes]) => {
    const matchingDishes = dishes.filter(dish =>
        dish.title.toLowerCase().includes(lowerQuery) ||
        dish.recipe.ingredients.some(
            ing => ing.toLowerCase().includes(lowerQuery))
    );

    if (matchingDishes.length > 0) {
      filtered[category] = matchingDishes;
    }
  });

  return filtered;
};
