import React, { Component } from "react";
import { Link } from "react-router-dom";
import DesireList from "./DesireList";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getDesireList } from "../../actions/desireListActions";

class MapBoard extends Component {
  //constructor to handle errors
  constructor() {
    super();
    this.state = {
      errors: {},
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getDesireList(id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { id } = this.props.match.params;
    const { desires } = this.props.desireList;
    const { errors } = this.state;

    let BoardContent;

    const boardAlgorithm = (errors, desires) => {
      if (desires.length < 1) {
        if (errors.mapNotFound) {
          return (
            <div className="alert alert-danger text-center" role="alert">
              {errors.mapNotFound}
            </div>
          );
        } else if (errors.mapIdentifier) {
          return (
            <div className="alert alert-danger text-center" role="alert">
              {errors.mapIdentifier}
            </div>
          );
        } else {
          return (
            <div className="alert alert-info text-center" role="alert">
              No Desires on this map
            </div>
          );
        }
      } else {
        return <DesireList desires_prop={desires} />;
      }
    };

    BoardContent = boardAlgorithm(errors, desires);

    return (
      <div className="container">
        <Link to={`/addDesire/${id}`} className="btn btn-info mb-3">
          Create Desire
        </Link>
        <br />
        <hr />
        {BoardContent}
      </div>
    );
  }
}

MapBoard.propTypes = {
  desireList: PropTypes.object.isRequired,
  getDesireList: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  desireList: state.desireList,
  errors: state.errors,
});

export default connect(mapStateToProps, { getDesireList })(MapBoard);
