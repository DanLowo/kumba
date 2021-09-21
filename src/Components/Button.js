import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({ text, route, icon, iconPosition, dark, fullWidth }) => {
  return (
    <Link to={route}>
      <button className={`${dark && 'dark'} ${fullWidth && 'fullWidth'}`}>
        {iconPosition === 'left' && <span className={`${icon} icon`} />}
        {text}
        {iconPosition === 'right' && <span className={`${icon} icon`} />}
      </button>
    </Link>
  )
}

export default Button;