import "../styles/App.css";
import React from "react";
import MainPage from "./MainPage";
import ArticlePage from "./ArticlePage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";

export default function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact>
            <MainPage />
          </Route>
          {/* Note how these two routes are ordered. The more specific
            path="/contact/:id" comes before path="/contact" so that
            route will render when viewing an individual contact */}
          <Route path="/:slug">
            <ArticlePage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
