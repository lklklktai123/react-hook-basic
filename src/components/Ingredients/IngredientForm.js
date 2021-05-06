import React, { useState } from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';
import LoadingIndicator from '../UI/LoadingIndicator';

const IngredientForm = React.memo(props => {
  const [enteredTitle, setenteredTitle] = useState('');
  const [enteredAmount, setenteredAmount] = useState('');
  console.log('IngredientForm');
  const submitHandler = event => {
    event.preventDefault();
    props.onAddIngredient({ title: enteredTitle, amount: enteredAmount });
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input
              type="text"
              id="title"
              value={enteredTitle}
              // onchange={event => {
              //   const newTitle = event.target.value;
              //   setInputState(prevInputState => ({
              //     title: newTitle,
              //     amount: prevInputState.amount,
              //   }));
              // }}
              onChange={event => setenteredTitle(event.target.value)}
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              //value={inputState.amount}
              value={enteredAmount.amount}
              // onchange={event => {
              //   const newAmount = event.target.value;
              //   setInputState(prevInputState => ({
              //     title: prevInputState.title,
              //     amount: newAmount,
              //   }));
              // }}
              onChange={event => setenteredAmount(event.target.value)}
            />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            {props.loading ? <LoadingIndicator /> : null}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
