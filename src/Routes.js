import React from 'react';
import {  BrowserRouter, Route } from 'react-router-dom';

import SelectLanguage from './view/SelectLanguage';
import Cards from './view/Cards';
import Champions from './view/Champions';

export default function Routes () {

  return (
    <BrowserRouter>
      <Route path="/" exact component={SelectLanguage}/>
      <Route path="/cards" component={Cards}/>
      <Route path="/champions" component={Champions}/>
    </BrowserRouter>
  );
}