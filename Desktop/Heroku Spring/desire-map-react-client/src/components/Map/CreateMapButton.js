import React from "react";
import { Link } from "react-router-dom";

const CreateMapButton = () => {
  return (
    <React.Fragment>
      <Link to="/addMap" className="btn btn-lg btn-info">
        Create a Map
      </Link>
    </React.Fragment>
  );
};

export default CreateMapButton;
