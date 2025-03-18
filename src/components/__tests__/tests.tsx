import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import AddItemForm from '../AddItemForm';
import BudgetWarning from '../BudgetWarning';

// 1. Test app renders correctly
test('App renders with initial items', () => {
  const { getByText } = render(<App />);
  const titleElement = getByText(/Grocery List App/i);
  const appleElement = getByText(/Apples/i);
  
  expect(titleElement).toBeTruthy();
  expect(appleElement).toBeTruthy();
});

// 2. Test form validation
test('AddItemForm validates inputs correctly', () => {
  const mockAddItem = jest.fn();
  const { getByLabelText, getByText } = render(<AddItemForm onAddItem={mockAddItem} />);
  
  // Button should be disabled initially
  const button = getByText('Add Item');
  expect(button.hasAttribute('disabled')).toBeTruthy();
  
  // Button should be enabled after valid input
  fireEvent.change(getByLabelText(/Item Name/i), { target: { value: 'Eggs' } });
  fireEvent.change(getByLabelText(/Price in Dollars/i), { target: { value: '2.99' } });
  
  expect(button.hasAttribute('disabled')).toBeFalsy();
});

// 3. Test adding an item (integration test)
test('Can add a new grocery item', () => {
  const { getByLabelText, getByText, queryByText } = render(<App />);
  
  // Verify new item doesn't exist yet
  expect(queryByText('Milk')).toBeFalsy();
  
  // Add a new item
  fireEvent.change(getByLabelText(/Item Name/i), { target: { value: 'Milk' } });
  fireEvent.change(getByLabelText(/Price in Dollars/i), { target: { value: '4.50' } });
  fireEvent.click(getByText('Add Item'));
  
  // Verify it was added
  expect(getByText('Milk')).toBeTruthy();
  expect(getByText('$4.50')).toBeTruthy();
});

// 4. Test removing an item
test('Can remove a grocery item', () => {
  const { queryByText } = render(<App />);
  
  // Verify Apples exists initially
  expect(queryByText('Apples')).toBeTruthy();
  
  // Find Apples' remove button
  const appleText = queryByText('Apples');
  if (!appleText) throw new Error('Apples not found');
  const appleRow = appleText.closest('li');
  const removeButton = appleRow?.querySelector('button');
  if (!removeButton) throw new Error('Remove button not found');
  fireEvent.click(removeButton);
  
  // Verify Apples is removed
  expect(queryByText('Apples')).toBeFalsy();
});

// 5. Test budget warning
test('Budget warning appears when total exceeds $30', () => {
  const { queryByText: belowBudget } = render(<BudgetWarning total={20} />);
  expect(belowBudget(/Over Budget/i)).toBeFalsy();
  
  const { queryByText: overBudget } = render(<BudgetWarning total={40} />);
  expect(overBudget(/Over Budget/i)).toBeTruthy();
});