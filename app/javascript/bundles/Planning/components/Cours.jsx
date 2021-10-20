import React from "react"
import PropTypes from "prop-types"

const Cours = ({ item }) => {
  return (
    <React.Fragment>
      <h1>
        { `${ item.debut_fin_json_v2 } : ${ item.formation_json_v2 } : ${ item.intervenant_json } : ${ item.salle_json_v2 }` } 
      </h1>
    </React.Fragment>
  );
}

Cours.propTypes = {
  item: PropTypes.object
};

export default Cours
