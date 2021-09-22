import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.css';

// import containers
import ProfileContainer from "./Containers/Dashboard/Profile";
import OrdersContainer from "./Containers/Dashboard/Orders";

// import components
import NavBarComponent from "./Components/NavBar";

import LoadingImage from './asset/loading.webp'
import NavigationDrawer from "./Components/NavigationDrawer";

const App = () => {
  const [loading, setLoading] = useState(true)

  // remove loading after 5 seconds
  useEffect(() => {
    setTimeout(function () {
      setLoading(false)
    }, 5000)
  })

  return (
    <div>
      {
        loading ? (
          <div id="loading-container">
            <img alt="Loading..." src={LoadingImage} id="loading-image" />
          </div>
        ) : (
          <>
            <NavBarComponent />
            <div id="dashboard">
              <NavigationDrawer id="navigation-drawer" />
              <div id="dashboard-containers">
                <Switch>
                  <Route exact path="/" component={ProfileContainer} />
                  <Route path="/orders" component={OrdersContainer} />
                </Switch>
              </div>
            </div>
          </>
        )
      }
    </div>
  );
  
}

export default App;
