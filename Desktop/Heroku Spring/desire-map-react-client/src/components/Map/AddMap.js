import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createMap } from "../../actions/mapActions";
import classnames from "classnames";

class AddMap extends Component {
  constructor() {
    super();

    this.state = {
      mapName: "",
      mapIdentifier: "",
      description: "",
      start_date: "",
      end_date: "",
      example: 0,
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onExampleClick = this.onExampleClick.bind(this);
  }

  //life cycle hooks
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const newMap = {
      mapName: this.state.mapName,
      mapIdentifier: this.state.mapIdentifier,
      description: this.state.description,
      start_date: this.state.start_date,
      end_date: this.state.end_date,
    };
    this.props.createMap(newMap, this.props.history);
  }

  onExampleClick(e) {
    e.preventDefault();
    this.setState({ example: (this.state.example + 1) % 5 });
  }

  render() {
    const { errors } = this.state;
    let maps = [];
    maps.push("The most secret dreams");
    maps.push("Wishes for the current year");
    maps.push("Plans for the month");
    maps.push("Joint desires with a partner for a long-term");
    maps.push("My expectations for the summer");

    let i = this.state.example;

    return (
      <div>
        <div className="map">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h5 className="display-4 text-center mb-4">Create Map form</h5>
                <hr />
                <div className="row">
                  <div className="col-md-4">
                    <p>Click to see more examples</p>
                  </div>
                  <div className="col-md-8">
                    <button
                      className="btn-warning btn-block"
                      onClick={this.onExampleClick}
                    >
                      {maps[i]}
                    </button>
                  </div>
                </div>
                <form onSubmit={this.onSubmit}>
                  <div className="form-group mt-4">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.mapName,
                      })}
                      placeholder="Map Name"
                      name="mapName"
                      value={this.state.mapName}
                      onChange={this.onChange}
                    />
                    {errors.mapName && (
                      <div className="invalid-feedback">{errors.mapName}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.mapIdentifier,
                      })}
                      placeholder="Unique Map ID"
                      name="mapIdentifier"
                      value={this.state.mapIdentifier}
                      onChange={this.onChange}
                    />
                    {errors.mapIdentifier && (
                      <div className="invalid-feedback">
                        {errors.mapIdentifier}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <textarea
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.description,
                      })}
                      placeholder="Map Description"
                      name="description"
                      value={this.state.description}
                      onChange={this.onChange}
                    />
                    {errors.description && (
                      <div className="invalid-feedback">
                        {errors.description}
                      </div>
                    )}
                  </div>
                  <h6>Start Date</h6>
                  <div className="form-group">
                    <input
                      type="date"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.start_date,
                      })}
                      name="start_date"
                      value={this.state.start_date}
                      onChange={this.onChange}
                    />
                    {errors.start_date && (
                      <div className="invalid-feedback">
                        {errors.start_date}
                      </div>
                    )}
                  </div>
                  <h6>Estimated End Date</h6>
                  <div className="form-group">
                    <input
                      type="date"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.end_date,
                      })}
                      name="end_date"
                      value={this.state.end_date}
                      onChange={this.onChange}
                    />
                    {errors.end_date && (
                      <div className="invalid-feedback">{errors.end_date}</div>
                    )}
                  </div>

                  <input
                    type="submit"
                    className="btn btn-info btn-block my-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddMap.propTypes = {
  createMap: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { createMap })(AddMap);
