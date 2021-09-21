import React, { useState } from 'react'

// import components
import NavigationDrawer from "./NavigationDrawer";

const NavBarComponent = () => {

  const [openNavBar, setOpenBar] = useState(false)

  return (
    <nav id="navbar">
      <h1>Kumba</h1>
      <div id="nav-links">
        <ul>
          <li>Home</li>
          <li>Profile</li>
          <li>Orders</li>
        </ul>
      </div>
      <div id="navbar-menu">
        <p onClick={() => setOpenBar(!openNavBar)} className="fas fa-align-justify"> </p>
      </div>

      {/*Navigation Drawer*/}
      {openNavBar && <NavigationDrawer /> }
    </nav>
  )
}

export default NavBarComponent;