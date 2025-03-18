import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { GroceryItemType } from './App';

interface AddItemFormProps {
  onAddItem: (item: Omit<GroceryItemType, 'id'>) => void;
}

interface InputProps {
    hasError?: boolean;
  }

const AddItemForm: React.FC<AddItemFormProps> = ({ onAddItem }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [nameError, setNameError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  // Validate form on input changes
  useEffect(() => {
    // Name validation
    if (!name.trim()) {
      setNameError('Item name is required');
    } else {
      setNameError('');
    }

    // Price validation
    if (!price.trim()) {
      setPriceError('Price is required');
    } else {
      const priceNum = Number(price);
      if (isNaN(priceNum) || priceNum <= 0) {
        setPriceError('Price must be a positive number');
      } else if (price.includes('.') && price.split('.')[1].length > 2) {
        setPriceError('Price cannot have more than 2 decimal places');
      } else {
        setPriceError('');
      }
    }

    // Update form validity
    setIsFormValid(name.trim() !== '' && price.trim() !== '' && 
                  !isNaN(Number(price)) && Number(price) > 0 &&
                  (!price.includes('.') || price.split('.')[1].length <= 2)
                );
  }, [name, price]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isFormValid) {
      // Convert price to a number with 2 decimal places
      const priceValue = parseFloat(parseFloat(price).toFixed(2));
      
      onAddItem({
        name: name.trim(),
        price: priceValue
      });
      
      // Reset form
      setName('');
      setPrice('');
    }
  };

  return (
    <Form onSubmit={handleSubmit} aria-labelledby="form-title">
      <FormTitle id="form-title">Add New Item</FormTitle>
      
      <FormGroup>
        <Label htmlFor="name">Item Name (e.g., Milk, Bread)</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          hasError={!!nameError}
          aria-invalid={!!nameError}
          aria-describedby={nameError ? "name-error" : undefined}
          placeholder="Enter item name"
          autoComplete="off"
        />
        {nameError && <ErrorMessage id="name-error">{nameError}</ErrorMessage>}
      </FormGroup>
      
      <FormGroup>
        <Label htmlFor="price">Price in Dollars (e.g., 3.99)</Label>
        <Input
          id="price"
          type="number"
          min="0.01"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          hasError={!!priceError}
          aria-invalid={!!priceError}
          aria-describedby={priceError ? "price-error" : undefined}
          placeholder="0.00"
        />
        {priceError && <ErrorMessage id="price-error">{priceError}</ErrorMessage>}
      </FormGroup>
      
      <Button 
        type="submit"
        aria-label="Add item to grocery list"
        aria-disabled={!isFormValid}
        disabled={!isFormValid}
      >
        Add Item
      </Button>
    </Form>
  );
};

export default AddItemForm;

//#region styled-components
const Form = styled.form`
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const FormTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 15px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
`;

const Input = styled.input<InputProps>`
  width: 100%;
  padding: 8px;
  border: 1px solid ${props => props.hasError ? '#e53e3e' : '#ccc'};
  border-radius: 4px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 2px rgba(49, 130, 206, 0.3);
  }
`;

const ErrorMessage = styled.p`
  color: #e53e3e;
  font-size: 14px;
  margin-top: 5px;
`;

const Button = styled.button`
  background-color: #3182ce;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  
  &:hover {
    background-color: ${props => props.disabled ? '#3182ce' : '#2c5282'};
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.5);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
//#endregion