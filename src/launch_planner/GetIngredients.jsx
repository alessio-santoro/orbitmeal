export const getIngredients = (recipes) => {
  const ingredientsSet = new Set();

  Object.values(recipes).forEach(categoryList => {
    categoryList.forEach(dish => {
      dish.mandatory_ingredients.forEach(ing => {
        ingredientsSet.add(ing.toLowerCase().trim());
      });
    });
  });

  return Array.from(ingredientsSet).sort((a, b) => a.localeCompare(b));
};