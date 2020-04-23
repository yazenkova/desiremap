import React, { Component } from "react";
import { Link } from "react-router-dom";
import { deleteDesire } from "../../../actions/desireListActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class DesireItem extends Component {
  onDeleteClick(desireList_id, desire_id) {
    this.props.deleteDesire(desireList_id, desire_id);
  }
  render() {
    const { desire } = this.props;

    return (
      <div className="card mb-1 bg-light">
        <div className="card-header bg-info text-light">
          <h5>{desire.description}</h5>
        </div>
        <div className="card-body">
          <font color="#82ccd9">Due to: {desire.dueDate}</font>
          <Link
            to={`/updateDesire/${desire.mapIdentifier}/${desire.desireSequence}`}
            className="btn btn-outline-info m-1 mt-3"
          >
            View / Update
          </Link>

          <button
            className="btn btn-outline-danger m-1 mt-3"
            onClick={this.onDeleteClick.bind(
              this,
              desire.mapIdentifier,
              desire.desireSequence
            )}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

DesireItem.propTypes = {
  deleteDesire: PropTypes.func.isRequired,
};
export default connect(null, { deleteDesire })(DesireItem);
