
---
# Orbitmeal
**Orbitmeal** is a smart, localized cookbook designed to find the minimal shop list for my groceries.

It uses a weighted-random algorithm to suggest recipes based on actual inventory, reducing food waste and decision fatigue.
## Features
* **"Launch Planner" Logic**: 
Select the ingredients you already have, and the app calculates which recipes you are closest to completing for the amount of meals you need to cover.
* Choose exactly how many breakfasts, lunches/dinners, salads, and soups you need for your cycle.
* **Smart Scoring Algorithm**: Uses a randomized shuffle and match-percentage scoring to ensure variety and relevance in suggestions.
* **PDF Export**: Download formatted recipe cards directly to your device for offline kitchen use.
* **Responsive Design**: Functional on desktop and mobile, featuring a sleek, modern modal-based UI.
## Tech-stack
* **Core**: React (Vite)
* **State Management**: React Hooks (`useState`, `useMemo`)
* **Styling**: Custom CSS3 with Flexbox/Grid systems
* **PDF Generation**: `jsPDF`
* **Icons**: FontAwesome
## Getting Started
### Prerequisites
* Node.js (v18 or higher recommended)
* npm or yarn
### Installation
1. **Clone the repository**
```bash
git clone https://github.com/your-username/orbitmeal.git
cd orbitmeal
```
2. **Install dependencies**
```bash
npm install
```
3. **Run the development server**
```bash
npm run dev
```
4. **Build for production**
```bash
npm run build
```
## How the Algorithm Works
The "Launch Planner" doesn't just pick recipes at random. It follows a three-step process:
1. **Shuffle**: To avoid alphabetical bias, it shuffles the category list.
2. **Score**: It compares the `mandatory_ingredients` of each recipe against your `pantrySet`.
3. **Sort & Slice**: It sorts by the highest match percentage and takes only the number of meals you requested.
## Next features
* Download meals plan pdf
* when in the start page, add more recipes together to print them in the same document 
---
