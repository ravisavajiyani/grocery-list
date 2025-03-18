import React from 'react';
import styled from 'styled-components';
import { GroceryItemType } from './App';

interface GroceryItemProps {
  item: GroceryItemType;
  onRemoveItem: (id: string) => void;
}

const GroceryItem: React.FC<GroceryItemProps> = ({ item, onRemoveItem }) => {
  return (
    <ListItem>
      <ItemName>{item.name}</ItemName>
      <ItemDetails>
        <ItemPrice>${item.price.toFixed(2)}</ItemPrice>
        <RemoveButton
          onClick={() => onRemoveItem(item.id)}
          aria-label={`Remove ${item.name}`}
        >
          Remove
        </RemoveButton>
      </ItemDetails>
    </ListItem>
  );
};

export default GroceryItem;

//#region styled-components
const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ItemName = styled.span`
  font-size: 16px;
`;

const ItemDetails = styled.div`
  display: flex;
  align-items: center;
`;

const ItemPrice = styled.span`
  font-weight: bold;
  margin-right: 15px;
`;

const RemoveButton = styled.button`
  background-color: #e53e3e;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 10px;
  cursor: pointer;
  
  &:hover {
    background-color: #c53030;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.5);
  }
`;
//#endregion