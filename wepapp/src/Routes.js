import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom';


const routesConfig = [
  {
    exact: true,
    path: '/',
    component: () => <Redirect to="/home" />
  },
  {
    exact: true,
    path: '/home',
    component: lazy(() => import('./pages/Home'))
  },
  {
    exact: true,
    path: '/plans',
    component: lazy(() => import('./pages/Plans'))
  },
  {
    exact: true,
    path: '/register',
    component: lazy(() => import('./pages/Register'))
  },
  {
    exact: true,
    path: '/login',
    component: lazy(() => import('./pages/Login'))
  },
  {
    exact: true,
    path: '/dashboard',
    component: lazy(() => import('./pages/Dashboard'))
  },
];

const renderRoutes = (routes) => {
  if (routes) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          {routes.map((route, i) => {
            const Component = route.component;

            return (
              <Route
                key={i}
                path={route.path}
                exact={route.exact}
                render={(props) => {
                  if (route.routes) {
                    return renderRoutes(route.routes)
                  }

                  return <Component {...props} />;
                }}
              />
            );
          })}
        </Switch>
      </Suspense>
    );
  }
};

function Routes() {
  return (
    <Router>
      <div>
        {renderRoutes(routesConfig)}
      </div>
    </Router>
  );
}

export default Routes;
