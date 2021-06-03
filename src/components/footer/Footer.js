import React from 'react';
import {Container,Navbar} from 'react-bootstrap'
import './Footer.css';

function Footer() {
    return (
        <div className='main-footer'>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container id={'footerNotes'}>
                    <div>Made by Ronald for Ronald</div>
                    <div>Data from <a href = 'https://pokemontcg.io/'>Pokemon TCG API</a></div>
                    <div>This is a personal project, not intended for public usage</div>
                </Container>
            </Navbar>
        </div>
    );
}

export default Footer


