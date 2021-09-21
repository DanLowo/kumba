import React from 'react'

const UserInfo = ({ sectionTitle, sectionValue, sectionIcon }) => {
  return(
      <>
        { sectionTitle !== 'id' && (
          <div className="user-info-component">
            <p className="title">{sectionTitle}</p>
            <p className="value">{sectionValue}</p>
          </div>
        )}
      </>
  )
}

export default UserInfo;