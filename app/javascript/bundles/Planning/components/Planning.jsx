import PropTypes from 'prop-types';
import React, { useState } from 'react';
import axios from 'axios';
import ListeCours from './Liste_Cours';

const API_ENDPOINT = "https://planning.iae-paris.com/api/v2/cours?d="

const Planning = ({current_date}) => {

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


  return (
    <div>
      { planning.isLoading 
        ? (<p>Loading...</p>) 
        : (<div>
            <ListeCours items={ planning.data } />
          </div>) 
      }
    </div>
  );
};

Planning.propTypes = {
  current_date: PropTypes.string.isRequired, // this is passed from the Rails view
};

export default Planning;