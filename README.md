# Grocery List App

A simple React app to help track your grocery spending.

![Grocery List Screenshot](<img width="682" alt="image" src="https://github.com/user-attachments/assets/c59410f7-a727-4672-b8ff-46cb3c68d923" />)

## What it does

- Add items with prices (supports dollars and cents)
- Remove items with a single click
- Track your total spending
- Get warned when you go over $30

## Running the app

```bash
# Install dependencies
npm install

# Start it up
npm run dev
```

## Technology

React, TypeScript, styled-components, and Vite

## Project organization

I kept it simple with four main components:
- `App.tsx` - Manages state and coordinates everything
- `AddItemForm.tsx` - Handles adding new items with validation
- `GroceryList.tsx` - Shows your items
- `BudgetWarning.tsx` - Appears when you're over budget

## Testing

Run the tests with:
```bash
npm test
```

## Features

- Real-time form validation
- Proper price formatting with cents
- Fully accessible with ARIA support
- Works on mobile and desktop
