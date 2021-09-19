import React from 'react';
import { Route, Switch } from 'react-router-dom'

import './App.css';

// import containers
import ProfileContainer from "./Containers/Profile";
import OrdersContainer from "./Containers/Profile/Orders";

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={ProfileContainer} />
      <Route path="/orders" component={OrdersContainer} />
    </Switch>
  );
  
}

export default App;
