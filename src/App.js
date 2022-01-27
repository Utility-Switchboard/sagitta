import React, { lazy, useEffect, useState } from "react";
// React Router
import { useRoutes } from "react-router-dom";
// IdleTimerContainer
import IdleTimerContainer from "./components/IdleTimerContainer/IdleTimerContainer";

// Pages
const Home = lazy(() => import("./components/HomePage/Home"));

function App() {
  let element = useRoutes([
    // A route object has the same properties as a <Route>
    // element. The `children` is just an array of child routes.
    { path: "/", element: <Home /> },
  ]);

  return element;
}

export default App;
