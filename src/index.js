import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import "./styles.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// Components
import Overlay from "./components/Overlay/Overlay";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Suspense
        fallback={
          <Overlay text={"Loading data, please wait..."} spinner={true} />
        }
      >
        <App />
      </Suspense>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
