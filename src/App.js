import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NoMatchPage from './pages/NoMatchPage'

const App = ({ routes, initialData }) => {
  return routes
    ? (
      <div>
        <Switch>
          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                render={props =>
                  React.createElement(route.component, {
                    ...props,
                    initialData: initialData[index] || null
                  })}
              />
            )
          })}
          <Route component={NoMatchPage} />
        </Switch>
      </div>
    ) : null
};

export default App;