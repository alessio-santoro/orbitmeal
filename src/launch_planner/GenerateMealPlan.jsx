/**
 * Core Algorithm: Picks recipes based on pantry matches and requested counts.
 * Uses a pre-shuffle to ensure variety.
 */
export const generateMealPlan = (recipes, pantry, counts) => {
  const selectedRecipes = [];
  const shoppingList = new Set();

  const pantrySet = new Set(pantry.map(i => i.toLowerCase().trim()));

  const categoryMap = {
    breakfasts: "Breakfast",
    meals: "Lunch/Dinner",
    salads: "Salads",
    soups: "Soups"
  };

  Object.keys(counts).forEach(key => {
    const requestedCount = counts[key];
    const categoryName = categoryMap[key];
    let categoryRecipes = recipes[categoryName] || [];

    if (requestedCount <= 0 || categoryRecipes.length === 0) return;

    const shuffledCategory = [...categoryRecipes].sort(() => Math.random() - 0.5);

    const scored = shuffledCategory.map(dish => {
      // Inside the map function of your algorithm
      const mandatory = (dish.recipe && dish.mandatory_ingredients)
          ? dish.mandatory_ingredients.map(i => i.toLowerCase().trim())
          : [];

      const owned = mandatory.filter(ing => pantrySet.has(ing));
      const missing = mandatory.filter(ing => !pantrySet.has(ing));

      const score = mandatory.length > 0 ? owned.length / mandatory.length : 0;

      return { ...dish, score, missing };
    });

    const topMatches = scored
        .toSorted((a, b) => b.score - a.score)
        .slice(0, requestedCount);

    selectedRecipes.push(...topMatches);

    // STEP D: Build the consolidated shopping list
    topMatches.forEach(match => {
      match.missing.forEach(item => shoppingList.add(item));
    });
  });

  return {
    plan: selectedRecipes,
    shopList: Array.from(shoppingList).sort((a, b) => a.localeCompare(b))
  };
};