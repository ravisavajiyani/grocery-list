import React, { useState } from 'react';
import styled from 'styled-components';
import AddItemForm from './AddItemForm';
import GroceryList from './GroceryList';
import BudgetWarning from './BudgetWarning';

export interface GroceryItemType {
  id: string;
  name: string;
  price: number;
}

const App: React.FC = () => {
  // Mock grocery items
  const [items, setItems] = useState<GroceryItemType[]>([
    { id: '1', name: 'Apples', price: 6.00 },
    { id: '2', name: 'Bread', price: 3.50 },
    { id: '3', name: 'Watermelon', price: 7.99 }
  ]);
  
  const total = items.reduce((sum, item) => sum + item.price, 0);
  
  // Add grocery to list
  const handleAddItem = (newItem: Omit<GroceryItemType, 'id'>) => {
    const item: GroceryItemType = {
      ...newItem,
      id: Date.now().toString() // Generate a unique ID using timestamp
    };
    setItems([...items, item]);
  };

  // Remove grocery from list
  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <AppContainer>
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <Header>
        <Title>Grocery List App</Title>
      </Header>
      <Main id="main-content" tabIndex={-1}>
        <AddItemForm onAddItem={handleAddItem} />
        <GroceryList
          items={items}
          onRemoveItem={handleRemoveItem}
        />
        <Total aria-live="polite" aria-atomic="true">
          Total: ${total.toFixed(2)}
        </Total>
        <BudgetWarning total={total} />
      </Main>
    </AppContainer>
  );
};

export default App;

//#region styled-components
const AppContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 640px) {
    padding: 15px;
  }
`;

const SkipLink = styled.a`
  position: absolute;
  top: -40px;
  left: 0;
  background-color: #3182ce;
  color: white;
  padding: 8px;
  z-index: 100;
  
  &:focus {
    top: 0;
  }
`;

const Header = styled.header`
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  text-align: center;
  color: #2d3748;
`;

const Main = styled.main`
  &:focus {
    outline: none;
  }
`;

const Total = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin: 20px 0;
`;
//#endregion