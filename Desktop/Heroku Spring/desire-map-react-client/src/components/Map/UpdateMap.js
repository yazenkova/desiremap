import React, { Component } from "react";
import { getMap, createMap } from "../../actions/mapActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

class UpdateMap extends Component {
  //set state
  constructor() {
    super();

    this.state = {
      id: "",
      mapName: "",
      mapIdentifier: "",
      description: "",
      start_date: "",
      end_date: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    const {
      id,
      mapName,
      mapIdentifier,
      description,
      start_date,
      end_date,
    } = nextProps.map;

    this.setState({
      id,
      mapName,
      mapIdentifier,
      description,
      start_date,
      end_date,
    });
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getMap(id, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const updateMap = {
      id: this.state.id,
      mapName: this.state.mapName,
      mapIdentifier: this.state.mapIdentifier,
      description: this.state.description,
      start_date: this.state.start_date,
      end_date: this.state.end_date,
    };

    this.props.createMap(updateMap, this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="map">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Update Map form</h5>
              <hr />
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
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
                    className="form-control form-control-lg"
                    placeholder="Unique Map ID"
                    name="mapIdentifier"
                    value={this.state.mapIdentifier}
                    onChange={this.onChange}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <textarea
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.description,
                    })}
                    placeholder="Map Description"
                    name="description"
                    onChange={this.onChange}
                    value={this.state.description}
                  />
                  {errors.description && (
                    <div className="invalid-feedback">{errors.description}</div>
                  )}
                </div>
                <h6>Start Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.start_date,
                    })}
                    name="end_date"
                    value={this.state.end_date}
                    onChange={this.onChange}
                  />
                  {errors.end_date && (
                    <div className="invalid-feedback">{errors.start_date}</div>
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

                <input type="submit" className="btn btn-info btn-block my-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UpdateMap.propTypes = {
  getMap: PropTypes.func.isRequired,
  createMap: PropTypes.func.isRequired,
  map: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  map: state.map.map,
  errors: state.errors,
});

export default connect(mapStateToProps, { getMap, createMap })(UpdateMap);
