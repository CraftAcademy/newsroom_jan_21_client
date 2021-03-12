import React, {useEffect} from 'react';
import Explore from './views/Explore';
import SingleArticle from './components/SingleArticle'
import {authValidation} from './modules/authenticationServices'
import './app.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GetLocal from './views/GetLocal';
import NavBar from './components/NavBar';

const App = () => {

  useEffect(() => {
    authValidation()
  }, [])

  return (
    <>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <GetLocal />
          </Route>
          <Route exact path="/explore">
            <Explore />
          </Route>
          <Route path='/articles/:id'>
            <SingleArticle />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
