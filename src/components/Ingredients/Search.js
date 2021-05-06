import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const { onLoadIngredients } = props;
  const [enteredFilter, setEnteredFilter] = useState('');
  const [isloading, setIsloading] = useState(false);
  const inputRef = useRef();
  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredFilter === inputRef.current.value) {
        const query =
          enteredFilter.length === 0
            ? ''
            : `?orderBy="title"&equalTo="${enteredFilter}"`;
        setIsloading(true);
        axios
          .get(
            'https://react-hook-update-1996-default-rtdb.firebaseio.com/ingredients.json' +
              query
          )
          .then(reponseData => {
            const loadedIngredients = [];
            for (const key in reponseData.data) {
              loadedIngredients.push({
                id: key,
                title: reponseData.data[key].title,
                amount: reponseData.data[key].amount,
              });
            }
            setIsloading(false);
            onLoadIngredients(loadedIngredients);
          });
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [enteredFilter, onLoadIngredients, inputRef]);
  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          {isloading ? <span>Loading...</span> : null}
          <input
            ref={inputRef}
            type="text"
            value={enteredFilter}
            onChange={event => setEnteredFilter(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
