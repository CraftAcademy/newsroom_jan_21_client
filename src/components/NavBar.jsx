import React, { useState } from 'react'
import RegistrationForm from './RegistrationForm'
import { Grid, Menu, Image } from 'semantic-ui-react'
import { Link, useLocation } from "react-router-dom"
import logo from '../assets/navLogo.png'

const NavBar = () => {
  const location = useLocation()
  const [activeItem, setActiveItem] = useState(location.pathname)

  return (
    <Grid className="nav-bar">
      <Image className="nav-logo" as='a' alt="logo" src={logo} href="/" data-cy="logo" />
      <Grid.Column verticalAlign="middle">
        <Menu size="massive" pointing color="blue" secondary vertical >
          <Menu.Item
            data-cy="nav-home"
            name="get local"
            as={Link}
            to={{ pathname: "/" }}
            active={activeItem === '/'}
            onClick={() => setActiveItem('/')}
          />
          <Menu.Item
            data-cy="nav-explore"
            name="explore"
            as={Link}
            to={{ pathname: "/explore" }}
            active={activeItem === '/explore'}
            onClick={() => setActiveItem('/explore')}
          />
          <Menu.Menu position="bottom">
            <RegistrationForm />
          </Menu.Menu>
        </Menu>
      </Grid.Column>
    </Grid>
  )
}

export default NavBar
