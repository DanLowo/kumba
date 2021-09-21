import React from 'react'

// import components
import UserImage from "../../asset/reddit.png"

const ProfileContainer = () => {

  return (
    <div id="profile-container">

      <section id="user-info">
        <img id="profile-img" src={UserImage} alt="User Profile" />
      </section>
    </div>
  )
}

export default ProfileContainer;