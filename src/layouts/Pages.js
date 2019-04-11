import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ListOfCountries from '../pages/ListOfCountries.js';
import ErrorPage from '../pages/ErrorPage.js';
import SearchCountry from '../pages/SearchCountry.js';
import PlayGame from '../pages/PlayGame.js';
import MainPage from '../pages/MainPage.js';

const Pages = () => {
  return (
    <>
      <Switch>
        <Route exact path='/' component={MainPage} />

        <Route path='/all' component={ListOfCountries} />

        <Route path='/search' component={SearchCountry} />

        <Route path='/game' component={PlayGame} />

        <Route component={ErrorPage} />
      </Switch>
    </>
  );
}

export default Pages;