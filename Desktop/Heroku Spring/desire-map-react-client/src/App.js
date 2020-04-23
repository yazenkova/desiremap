import React, { Component } from "react";
import "./App.css";
import Board from "./components/Board";
import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddMap from "./components/Map/AddMap";
import { Provider } from "react-redux";
import store from "./store";
import UpdateMap from "./components/Map/UpdateMap";
import MapBoard from "./components/MapBoard/MapBoard";
import AddDesire from "./components/MapBoard/Desires/AddDesire";
import UpdateDesire from "./components/MapBoard/Desires/UpdateDesire";
import Landing from "./components/Layout/Landing";
import Register from "./components/UserManagement/Register";
import Login from "./components/UserManagement/Login";
import jwt_decode from "jwt-decode";
import setJWTToken from "./securityUtils/setJWTToken";
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/securityActions";
import SecuredRoute from "./securityUtils/SecureRoute";

const jwtToken = localStorage.jwtToken;

if (jwtToken) {
  setJWTToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken,
  });

  const currentTime = Date.now() / 1000;
  if (decoded_jwtToken.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <SecuredRoute exact path="/board" component={Board} />
              <SecuredRoute exact path="/addMap" component={AddMap} />
              <SecuredRoute exact path="/updateMap/:id" component={UpdateMap} />
              <SecuredRoute exact path="/mapBoard/:id" component={MapBoard} />
              <SecuredRoute exact path="/addDesire/:id" component={AddDesire} />
              <SecuredRoute
                exact
                path="/updateDesire/:desireList_id/:desire_id"
                component={UpdateDesire}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
