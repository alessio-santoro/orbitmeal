import {jsPDF} from "jspdf";

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
  const ingredients = recipeData.recipe?.mandatory_ingredients
      || recipeData.mandatory_ingredients || [];
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

export const downloadFullPlan = (results) => {

  if (!results || !results.shopList) {
    console.error("No meal plan results found to download");
    return;
  }

  const doc = new jsPDF();
  let yPos = 20;

  doc.setFontSize(22);
  doc.setTextColor(43, 118, 82);
  doc.text("My Orbitmeal Plan", 20, yPos);
  yPos += 15;

  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text("Shopping List", 20, yPos);
  yPos += 10;

  doc.setFontSize(11);
  results.shopList.forEach((item) => {

    const splitItem = doc.splitTextToSize(`[ ] ${item}`, 170);

    if (yPos + (splitItem.length * 7) > 280) {
      doc.addPage();
      yPos = 20;
    }

    doc.text(splitItem, 25, yPos);
    yPos += (splitItem.length * 7);
  });

  yPos += 10;

  results.plan.forEach((recipeObj, index) => {
    doc.addPage();
    yPos = 20;

    doc.setFontSize(18);
    doc.setTextColor(43, 118, 82);
    doc.text(`${index + 1}. ${recipeObj.title}`, 20, yPos);
    yPos += 12;

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("Ingredients:", 20, yPos);
    yPos += 8;

    doc.setFontSize(10);
    const ingredients = recipeObj.recipe?.mandatory_ingredients
        || recipeObj.mandatory_ingredients || [];
    ingredients.forEach(ing => {
      doc.text(`• ${ing}`, 25, yPos);
      yPos += 6;
    });

    yPos += 8;

    doc.setFontSize(14);
    doc.text("Instructions:", 20, yPos);
    yPos += 8;

    doc.setFontSize(10);
    const steps = recipeObj.recipe?.steps || [];
    const splitSteps = doc.splitTextToSize(steps.join('\n\n'), 170);
    doc.text(splitSteps, 20, yPos);
  });

  doc.save("Orbitmeal_Plan.pdf");
};