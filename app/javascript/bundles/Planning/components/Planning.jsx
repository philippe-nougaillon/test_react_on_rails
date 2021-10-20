import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ListeCours from './Liste_Cours';

const API_ENDPOINT = "https://planning.iae-paris.com/api/v2/cours?d="

const useInterval = (callback, delay) => {
  const savedCallback = React.useRef();

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    const tick = () => {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

const Planning = ({current_date}) => {

  const [currentPage, setCurrentPage] = React.useState(0); 

  const per_page = 10;

  const planningReducer = (state, action) => {
    switch (action.type) {
      case 'PLANNING_FETCH_INIT':
        return{
          ...state,
          isLoading: true,
          isError: false,
        };
      case 'PLANNING_FETCH_SUCCESS':
        return{
          ...state,
          isLoading: false,
          isError: false,
          data: action.payload,
        };
      case 'PLANNING_FETCH_FAILURE':
        return{
          ...state,
          isLoading: false,
          isError: true,
        };
      default:
        throw new Error();
    }
  };

  const [planning, dispatchPlanning] = React.useReducer(
    planningReducer,
    { data: [], isLoading: false, isError: false }
  );

  React.useEffect(() => {
    dispatchPlanning({ type: 'PLANNING_FETCH_INIT' });

    fetch(`${ API_ENDPOINT }${ current_date }`)
      .then((response) => response.json())
      .then((result) => {
        dispatchPlanning({
          type: 'PLANNING_FETCH_SUCCESS',
          payload: result,
        });
      })
      .catch(() => 
        dispatchPlanning({ type: 'PLANNING_FETCH_FAILURE' })
      );
  }, []);

  useInterval(() => {
    if (currentPage < (planning.data.length / per_page)) {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(0);
    }
  }, 1000);

  return (
    <div>
      { planning.isLoading 
        ? (<p>Loading...</p>) 
        : (<div>
            <h2>page: { currentPage }</h2>
            <ListeCours items={ planning.data.slice(per_page * currentPage, (per_page * currentPage) + per_page ) } />
          </div>) 
      }
    </div>
  );
};

Planning.propTypes = {
  current_date: PropTypes.string.isRequired, // this is passed from the Rails view
};

export default Planning;