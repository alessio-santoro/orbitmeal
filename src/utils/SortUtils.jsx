const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
export const getShuffledData = (recipes) => {
  const newRecipes = {};
  for (const [category, list] of Object.entries(recipes)) {
    newRecipes[category] = shuffleArray(list);
  }
  return newRecipes;
};