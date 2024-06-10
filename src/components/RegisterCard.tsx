import React from 'react'
import { IconComponent } from '../utils/Icons'
import { Link } from 'react-router-dom'

type Props = {}

const RegisterCard = (props: Props) => {
  return (
    <div className="d-inline-block">
    <Link className="navbar-brand d-flex" to="/api/register">
      <IconComponent iconName="Profile"  />
      <div className="pb-0">Register</div>
    </Link>
  </div>
  )
}

export default RegisterCard