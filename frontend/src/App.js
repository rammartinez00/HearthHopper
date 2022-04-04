import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupForm from "../src/components/SignupFormPage/SignupForm";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Home from "./components/index/index.js";
import NewSpotForm from "./components/NewSpot";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/signup">
            <SignupForm />
          </Route>
          <Route path="/spots/new">
            <NewSpotForm />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
