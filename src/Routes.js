import React from 'react';
import {  BrowserRouter, Route } from 'react-router-dom';

import SelectLanguage from './view/SelectLanguage';
// import Main from './pages/Main';

export default function Routes () {

  return (
    <BrowserRouter>
      <Route path="/" exact component={SelectLanguage}/>
      {/* <Route path="/main" component={Main}/> */}
    </BrowserRouter>
  );
}