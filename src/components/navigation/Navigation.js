import React from 'react';
import {Container, Nav, Navbar} from 'react-bootstrap'
import {NavLink} from "react-router-dom";
import {useAuth} from "../../lib/contexts/AuthContext";


function Navigation() {
    const { currentUser } = useAuth()

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>
                    <NavLink to="/" bg="dark" variant="dark">
                        <img
                            src='img/navbar_logo.png'
                            alt=""
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />Cardboard Finance
                    </NavLink>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className="justify-content-end" >
                    <Nav>
                        {currentUser ?
                            <>
                                <NavLink to='/portfolio' className='mr-2'>Portfolio</NavLink>
                                <NavLink to='/profile' className='mr-2'>{currentUser.email}</NavLink>
                            </>
                            :
                            <>
                                <NavLink to='/login' className='mr-2'>Login</NavLink>
                                <NavLink to='/signup' className='mr-2'>Sign Up</NavLink>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation
