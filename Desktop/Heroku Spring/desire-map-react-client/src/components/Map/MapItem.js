import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteMap } from "../../actions/mapActions";

class MapItem extends Component {
  onDeleteClick = (id) => {
    this.props.deleteMap(id);
  };

  render() {
    const { map } = this.props;
    return (
      <div className="container">
        <div className="card card-body bg-light mb-3">
          <div className="row">
            <div className="col-lg-8 col-xs-6">
              <h5>{map.mapName}</h5>
              <p>{map.description}</p>
              <p>Due to: {map.end_date}</p>
            </div>
            <div className="col-lg-4 col-xs-6">
              <ul className="list-group">
                <Link to={`/mapBoard/${map.mapIdentifier}`}>
                  <li className="list-group-item board">
                    <i className="fa fa-flag-checkered pr-1"> Map Board </i>
                  </li>
                </Link>
                <Link to={`/updateMap/${map.mapIdentifier}`}>
                  <li className="list-group-item update">
                    <i className="fa fa-edit pr-1"> Update Map Info</i>
                  </li>
                </Link>

                <li
                  className="list-group-item delete"
                  onClick={this.onDeleteClick.bind(this, map.mapIdentifier)}
                >
                  <i className="fa fa-minus-circle pr-1"> Delete Map</i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MapItem.propTypes = {
  deleteMap: PropTypes.func.isRequired,
};

export default connect(null, { deleteMap })(MapItem);
