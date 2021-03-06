import React, { useEffect, useState } from 'react'
import axios from "axios";

// import components
import UserImage from "../../asset/reddit.png"
import UserInfo from "../../Components/UserInfo";
import Button from "../../Components/Button";

const ProfileContainer = () => {

  const [user, setUser] = useState([])

  const getUser = async () => {
    const userArr = []
    try {
      // get users data from api
      const { data : { user } } = await axios.get('https://indapi.kumba.io/webdev/assignment')

      // make an array for all the keys and values of the user data
      Object.entries(user).map((keyValue) => {
        userArr.push({ title: keyValue[0], value: keyValue[1] })
      })

      // return new formatted array of users' data.
      return userArr
    } catch (err) {
      console.log(err)
    }
  }

  // eslint-disable-next-line
  useEffect(async () => {
    const newUser = await getUser()
    setUser(newUser)
  }, [])

  return (
    <div id="profile-container">

      <section id="user-info">
        <img id="profile-img" src={UserImage} alt="User Profile" />
      </section>

      <section id="actions">
        <Button text="Edit Profile" route="/" icon="fas fa-user" iconPosition="left" />
        <Button text="Change Picture" route="/" icon="fas fa-camera" iconPosition="left" />
      </section>
      <section id="user-data">
        {
          user.map(({title, value}) => {
            return <UserInfo sectionTitle={title} sectionValue={value} key={title} />
          })
        }
      </section>
      <br />
      <Button text="View All Orders" route="/orders" dark fullWidth iconPosition="right" icon="fas fa-chevron-right" />
    </div>
  )
}

export default ProfileContainer;