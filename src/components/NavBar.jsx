import React, { useState } from 'react'
import RegistrationForm from './RegistrationForm'
import { Grid, Menu, Image, Button } from 'semantic-ui-react'
import { useSelector } from 'react-redux'
import { signOutUser } from '../modules/authenticationServices'
import { Link, useLocation } from "react-router-dom"
import logo from '../assets/navLogo.png'

const NavBar = () => {
  const location = useLocation()
  const [activeItem, setActiveItem] = useState(location.pathname)
  const { authenticated } = useSelector(state => state)

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
        </Menu>
      </Grid.Column>
      <div className="user-button">
        {!authenticated ? (
          <RegistrationForm />
        ) : (
            <Button
              color="blue"
              data-cy="log-out-button"
              onClick={() => signOutUser()}
            >Log out</Button>
          )}
      </div>
    </Grid>
  )
}

export default NavBar
