import React from "react";

import Home from "./container/Home";
import Counter from "./container/Counter";
import App from "./container/App";
import Login from "./container/Login";
import Logout from "./container/Logout";
import Profile from "./container/Profile";
import NotFound from "./container/NotFound";
export default [
  {
    path: "/",
    component: App,
    loadData: App.loadData,
    routes: [
      {
        path: "/",
        component: Home,
        exact: true,
        key: "/",
        loadData: Home.loadData
      },
      {
        path: "/counter",
        key: "/counter",
        component: Counter
      },
      {
        path: "/profile",
        key: "/profile",
        component: Profile
      },
      {
        path: "/login",
        key: "/login",
        component: Login
      },
      {
        path: "/logout",
        key: "/logout",
        component: Logout
      },
      {
        key: "notFound",
        component: NotFound
      }
    ]
  }
];
// export default (
//   <>
//     <Route path="/" exact component={Home} />
//     <Route path="/counter" component={Counter} />
//   </>
// );
