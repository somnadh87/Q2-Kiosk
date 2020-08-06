import React, { Component, Suspense } from 'react';
import { withRouter, Route, Switch, HashRouter as Router, Redirect } from 'react-router-dom';
import { IRoutePath } from './models/utilitiesModel';
import routes from './routes';
import './custom.css';
import './App.scss';
import AppIdle from './AppIdle';

// Get all Auth methods

// Activating fake backend
//fakeBackend();


function withLayout(WrappedComponent) {
  // ...and returns another component...
  return class extends React.Component {
    render() {
      return (<Suspense fallback={<div className="appLoading">Loading <div className="lds-ring"><div></div><div></div><div></div><div></div></div></div>}>
        <WrappedComponent></WrappedComponent>
      </Suspense>)
    }
  };
}
let previousPath;
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount() {
    window.history.pushState(null, "", window.location.href);
    previousPath = window.location.hash;
    window.onpopstate = function () {
      if (previousPath !== window.location.hash) {
        let index = routes.filter(y => y.ispublic || (y.isClient && !y.isProfilePath)).findIndex(x => '#' + x.path === previousPath || '#' + x.path === window.location.hash);
        previousPath = window.location.hash;
        if (index !== -1)
          window.history.pushState(null, "", window.location.href);
      }
      else
        window.history.pushState(null, "", window.location.href);
    };
  }


  render() {
    const PrivateRoute = ({ component: Component, ...rest }) => {
      // let isAuthenticated = isUserAuthenticated(rest)
      let isAuthenticated = '1'
      return (<Route {...rest} render={(props) => (
        isAuthenticated === IRoutePath.isAuthenticated
          ? <Component {...props} />
          : <Redirect to={isAuthenticated} />
      )} />)
    }
    return (
      <React.Fragment>
        <AppIdle />
        <Router >
          <Switch>
            {routes.map((route, idx) =>
              route.ispublic ?
                <Route path={route.path} exact component={route.component} key={idx} />
                :
                <PrivateRoute path={route.path} exact component={withLayout(route.component)} key={idx} />
            )}
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}


export default withRouter(App);


