import React, { Fragment } from 'react'
import {Link} from 'react-router-dom'

const Button = ({text, route, icon, iconPosition, dark, fullWidth, onClick, disabled}) => {
  return (
    <Fragment>
    {route ? (
        <Link to={route}>
          <button className={`${(dark && 'dark') || ''} ${(fullWidth && 'fullWidth') || ''}`}>
            {iconPosition === 'left' && <span className={`${icon} icon`}/>}
            {text}
            {iconPosition === 'right' && <span className={`${icon} icon`}/>}
          </button>
        </Link>
      )
      : (
            <button style={disabled ? {backgroundColor: 'lightgrey', borderColor: 'lightgrey'} : {}} disabled={disabled} onClick={onClick} className={`${(dark && 'dark') || ''} ${(fullWidth && 'fullWidth') || ''}`}>
              {iconPosition === 'left' && <span className={`${icon} icon`}/>}
              {text}
              {iconPosition === 'right' && <span className={`${icon} icon`}/>}
            </button>
        )
    }
      </Fragment>
  )
}

export default Button;