import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { getDesire, updateDesire } from "../../../actions/desireListActions";
import PropTypes from "prop-types";

class UpdateDesire extends Component {
  constructor() {
    super();

    this.state = {
      id: "",
      desireSequence: "",
      description: "",
      tag: "",
      dueDate: "",
      mapIdentifier: "",
      create_At: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { desireList_id, desire_id } = this.props.match.params;
    this.props.getDesire(desireList_id, desire_id, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    const {
      id,
      desireSequence,
      description,
      tag,
      dueDate,
      mapIdentifier,
      create_At,
    } = nextProps.desire;

    this.setState({
      id,
      desireSequence,
      description,
      tag,
      dueDate,
      mapIdentifier,
      create_At,
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const UpdateDesire = {
      id: this.state.id,
      desireSequence: this.state.desireSequence,
      description: this.state.description,
      tag: this.state.tag,
      dueDate: this.state.dueDate,
      mapIdentifier: this.state.mapIdentifier,
      create_At: this.state.create_At,
    };

    //console.log(UpdateDesire);
    this.props.updateDesire(
      this.state.mapIdentifier,
      this.state.desireSequence,
      UpdateDesire,
      this.props.history
    );
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="add-PBI">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link
                to={`/mapBoard/${this.state.mapIdentifier}`}
                className="btn btn-light"
              >
                Back to Map Board
              </Link>
              <h4 className="display-4 text-center">Update Desire</h4>
              <form onSubmit={this.onSubmit}>
                <h6>Description</h6>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.description,
                    })}
                    name="description"
                    placeholder="Desire description"
                    value={this.state.description}
                    onChange={this.onChange}
                  />
                  {errors.description && (
                    <div className="invalid-feedback">{errors.description}</div>
                  )}
                </div>
                <h6>Due Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.dueDate,
                    })}
                    name="dueDate"
                    value={this.state.dueDate}
                    onChange={this.onChange}
                  />
                  {errors.dueDate && (
                    <div className="invalid-feedback">{errors.dueDate}</div>
                  )}
                </div>
                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="tag"
                    value={this.state.tag}
                    onChange={this.onChange}
                  >
                    <option value={0}>Select Tag</option>
                    <option value={1}>Wealth</option>
                    <option value={2}>Self-realisation</option>
                    <option value={3}>Love</option>
                    <option value={4}>Family</option>
                    <option value={5}>Self</option>
                    <option value={6}>Creativity</option>
                    <option value={7}>Knowledge</option>
                    <option value={8}>Career</option>
                    <option value={9}>Travelling</option>
                  </select>
                </div>

                <input type="submit" className="btn btn-info btn-block my-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UpdateDesire.propTypes = {
  getDesire: PropTypes.func.isRequired,
  desire: PropTypes.object.isRequired,
  updateDesire: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  desire: state.desireList.desire,
  errors: state.errors,
});

export default connect(mapStateToProps, { getDesire, updateDesire })(
  UpdateDesire
);
