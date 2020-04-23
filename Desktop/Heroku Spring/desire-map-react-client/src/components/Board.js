import React, { Component } from "react";
import MapItem from "./Map/MapItem";
import CreateMapButton from "./Map/CreateMapButton";
import { connect } from "react-redux";
import { getMaps } from "../actions/mapActions";
import PropTypes from "prop-types";

class Board extends Component {
  componentDidMount() {
    this.props.getMaps();
  }

  render() {
    const { maps } = this.props.map;

    return (
      <div className="maps">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Maps</h1>
              <br />
              <CreateMapButton />

              <br />
              <hr />
              {maps.map((map) => (
                <MapItem key={map.id} map={map} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Board.propTypes = {
  map: PropTypes.object.isRequired,
  getMaps: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  map: state.map,
});

export default connect(mapStateToProps, { getMaps })(Board);
