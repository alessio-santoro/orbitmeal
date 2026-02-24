import { jsPDF } from "jspdf";

export const downloadRecipePDF = (recipeData) => {
  const doc = new jsPDF();
  const margin = 20;
  let cursorY = 20;

  doc.setFontSize(22);
  doc.setTextColor(43, 118, 82); // Your Orbitmeal Green
  doc.text(recipeData.title, margin, cursorY);
  cursorY += 15;

  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text("Ingredients", margin, cursorY);
  cursorY += 10;

  doc.setFontSize(12);
  const ingredients = recipeData.recipe?.mandatory_ingredients || recipeData.mandatory_ingredients || [];
  ingredients.forEach((ing) => {
    doc.text(`• ${ing}`, margin + 5, cursorY);
    cursorY += 7;
  });

  cursorY += 5;

  doc.setFontSize(16);
  doc.text("Instructions", margin, cursorY);
  cursorY += 10;

  doc.setFontSize(11);
  const steps = recipeData.recipe?.steps || [];
  steps.forEach((step, index) => {
    const splitStep = doc.splitTextToSize(`${index + 1}. ${step}`, 170);

    if (cursorY + (splitStep.length * 7) > 280) {
      doc.addPage();
      cursorY = 20;
    }

    doc.text(splitStep, margin, cursorY);
    cursorY += (splitStep.length * 7) + 2;
  });

  doc.save(`${recipeData.title.replace(/\s+/g, '_')}_Recipe.pdf`);
};