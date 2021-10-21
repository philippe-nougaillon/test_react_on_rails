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

const Planning = () => {

  const per_page = 8;
  const [currentPage, setCurrentPage] = React.useState(0); 
  const [paginatedPlanning, setPaginatedPlanning] = React.useState(new Array());

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
          totalPages: Math.round(action.payload.length / per_page),
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
    { data: [], isLoading: false, isError: false, totalPages: 0 }
  );

  const fetchPlanning = () => {
    dispatchPlanning({ type: 'PLANNING_FETCH_INIT' });

    const today = new Date().toISOString().slice(0, 10);

    fetch(`${ API_ENDPOINT }${ today }`)
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
  };

  React.useEffect(() => {
    fetchPlanning();
  }, []);

  React.useEffect(() => {
    // Pagine la liste des cours par tranche de 'per_page'
    const item_position = per_page * currentPage;
    setPaginatedPlanning(planning.data.slice(item_position, item_position + per_page))
  }, [currentPage]);

  // Changer de page à l'expiration du délai et recharger si première page
  useInterval(() => {
    if (currentPage < planning.totalPages) {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(0);
      console.log("Fetching Planning...")
      fetchPlanning();
    }
  }, 5000);

  return (
    <div>
      { planning.isLoading 
        ? (<p>Loading...</p>) 
        : (<div>
            <h2>page: { currentPage }/{ planning.totalPages }</h2>
            <ListeCours items={ paginatedPlanning } />
          </div>) 
      }
    </div>
  );
};

Planning.propTypes = {
  current_date: PropTypes.string.isRequired, // this is passed from the Rails view
};

export default Planning;