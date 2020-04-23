import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
import { addDesire } from "../../../actions/desireListActions";
import PropTypes from "prop-types";

class AddDesire extends Component {
  constructor(props) {
    super(props);
    const { id } = this.props.match.params;

    this.state = {
      description: "",
      tag: "",
      dueDate: "",
      mapIdentifier: id,
      example: 0,
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onExampleClick = this.onExampleClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  // on change
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  //on submit
  onSubmit(e) {
    e.preventDefault();
    const newDesire = {
      description: this.state.description,
      tag: this.state.tag,
      dueDate: this.state.dueDate,
    };
    this.props.addDesire(
      this.state.mapIdentifier,
      newDesire,
      this.props.history
    );
  }

  onExampleClick(e) {
    e.preventDefault();
    this.setState({ example: (this.state.example + 1) % 10 });
  }

  render() {
    const { id } = this.props.match.params;
    const { errors } = this.state;

    let desires = [];
    desires.push("Learn new language");
    desires.push("Make a trip around the world");
    desires.push("Go on a date 5 times");
    desires.push("Grow accustomed to do exercises every morning");
    desires.push("Gather close relatives for a field trip");
    desires.push("Get an internship at Google");
    desires.push("Arrange an exhibition of my paintings");
    desires.push("Learn how to play the guitar");
    desires.push("Start eating healthy food");
    desires.push("Get a driver's license and buy a car");

    let i = this.state.example;

    return (
      <div className="add-PBI">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={`/mapBoard/${id}`} className="btn btn-light">
                Back to Map Board
              </Link>
              <h4 className="display-4 text-center my-3">Add Desire</h4>
              <div className="row">
                <div className="col-md-4">
                  <p>Click to see more examples</p>
                </div>
                <div className="col-md-8">
                  <button
                    className="btn-warning btn-block"
                    onClick={this.onExampleClick}
                  >
                    {desires[i]}
                  </button>
                </div>
              </div>

              <form onSubmit={this.onSubmit}>
                <div className="form-group mt-4">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.description,
                    })}
                    name="description"
                    placeholder="Desire Description"
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
                <h6>Tag</h6>
                <div className="form-group">
                  <select
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.tag,
                    })}
                    name="tag"
                    value={this.state.tag}
                    onChange={this.onChange}
                  >
                    <option value={0}>Select tag</option>
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
                  {errors.tag && (
                    <div className="invalid-feedback">{errors.tag}</div>
                  )}
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

AddDesire.propTypes = {
  addDesire: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { addDesire })(AddDesire);
