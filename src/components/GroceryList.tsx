import React from 'react';
import styled from 'styled-components';
import GroceryItem from './GroceryItem';
import { GroceryItemType } from './App';

interface GroceryListProps {
  items: GroceryItemType[];
  onRemoveItem: (id: string) => void;
}

const GroceryList: React.FC<GroceryListProps> = ({ items, onRemoveItem }) => {
  return (
    <ListContainer>
      <ListTitle id="grocery-list-title">Your Grocery List</ListTitle>
      
      {items.length === 0 ? (
        <EmptyMessage aria-live="polite">No items in your grocery list yet.</EmptyMessage>
      ) : (
        <List aria-labelledby="grocery-list-title">
          {items.map(item => (
            <GroceryItem
              key={item.id}
              item={item}
              onRemoveItem={onRemoveItem}
            />
          ))}
        </List>
      )}
    </ListContainer>
  );
};

export default GroceryList;

//#region styled-components
const ListContainer = styled.section`
  margin-bottom: 20px;
`;

const ListTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
  color: #2d3748;
`;

const EmptyMessage = styled.p`
  color: #666;
  padding: 10px 0;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
`;
//#endregion