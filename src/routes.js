import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import V2EX from './Component/V2EX';
import V2EXList from './Component/V2EXList';
import CNode from './Component/CNode';
import CNodeList from './Component/CNodeList';

const routes = [
  {
    path: "/v2ex",
    component: V2EX,
    routes: [
      {
        path: ':id',
        component: V2EXList,
      }
    ],
  },
  {
    path: "/cnode",
    component: CNode,
    routes: [
      {
        path: ":id",
        component: CNodeList
      },
    ]
  }
];

const RouteConfigExample = () => (
  <Router>
    {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
  </Router>
);

const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    render={props => (
      // pass the sub-routes down to keep nesting
      <route.component {...props} routes={route.routes} />
    )}
  />
);

export default RouteWithSubRoutes;
