import React from 'react'
import { Navbar} from 'react-bootstrap'
import { Link } from 'react-router-dom'


export default function NavbarComponent() {
    const navbarBrandStyles = { 
        textDecoration: 'none', 
        display: 'flex',
        alignItems: 'center'
    }
    return (
    <Navbar bg="primary" data-bs-theme="light">
      <Navbar.Brand as={Link} to="/" style={navbarBrandStyles}>
        <img
          alt=""
          src="/photo.jpg"
          width="100"
          height="100"
          style={{mixBlendMode: 'multiply', filter: 'contrast(1)'}}
        />
        <span className="fw-bold" style={{marginLeft: '-25px'}}>PhotoFolio</span>
      </Navbar.Brand>
  </Navbar>

    )
}

