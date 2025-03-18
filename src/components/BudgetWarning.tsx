import React from 'react';
import styled from 'styled-components';

interface BudgetWarningProps {
  total: number;
}

const BudgetWarning: React.FC<BudgetWarningProps> = ({ total }) => {
  if (total <= 30) {
    return null;
  }

  return (
    <Warning 
      role="alert" 
      aria-live="assertive"
      aria-atomic="true"
    >
      <WarningIcon aria-hidden="true">⚠️</WarningIcon>
      <WarningContent>
        <strong>Over Budget!</strong> Your total of ${total.toFixed(2)} exceeds $30.00.
      </WarningContent>
    </Warning>
  );
};

export default BudgetWarning;

//#region styled-components
const Warning = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff5f5;
  border: 1px solid #fc8181;
  color: #c53030;
  padding: 12px;
  border-radius: 4px;
  font-weight: bold;
  margin-top: 10px;
`;

const WarningIcon = styled.span`
  margin-right: 8px;
  font-size: 20px;
`;

const WarningContent = styled.div`
  flex: 1;
`;
//#endregion