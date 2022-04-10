import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupForm from "../src/components/SignupFormPage/SignupForm";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Home from "./components/index/index.js";
import NewSpotForm from "./components/NewSpot";
import SpotBrowser from "./components/AllSpots";
import { getSpots } from "./store/spots";
import EditSpotForm from "./components/EditSpot";
import SpotDetail from "./components/viewOneSpot";
import LoadAllBookings from "./components/LoadBookings";

import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(getSpots());
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
          <Route exact path="/spots">
            <SpotBrowser />
          </Route>
          <Route path="/spots/:id/edit">
            <EditSpotForm />
          </Route>
          <Route exact path="/spots/:id">
            <SpotDetail />
          </Route>
          <Route path="/bookings">
            <LoadAllBookings />
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
