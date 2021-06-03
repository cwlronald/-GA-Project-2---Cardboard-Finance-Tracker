import React from 'react'
import {Container, FormControl} from 'react-bootstrap'
import './Home.css';
import '../../App.css';
import {NavLink, useHistory} from "react-router-dom"


function Home({search,setSearch}) {

    function change(e){
        setSearch(e.target.value)
    }

    let history = useHistory()
    function keyDown(e){
        if (e.key==='Enter'){
            history.push(`/search/${search}`)
            console.log('enter pressed')
        }
    }

    return (
            <Container className='d-flex align-items-center justify-content-center body'>
                <div className='w-100' style={{maxWidth:'800px'}}>
                    <h1 className="text-center headers" id={'header1'}>Cardboard Finance Tracker</h1>
                    <h2 className="text-center headers" id={'header2'}>The not yet ultimate way to track your PTCG Collection</h2>
                    <div className="d-flex" id={'searchBar'} >
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="mr-2"
                            aria-label="Search"
                            onChange={change}
                            onKeyDown={keyDown}
                        />
                        <NavLink
                            to={`/search/${search}`}
                            className="btn btn-primary"
                            variant="outline-success"
                        >Search
                        </NavLink>
                    </div>
                    <div>
                        <p className='text-center'>
                            <img
                                src='img/home_img.png'
                                alt=""
                                width="100"
                                height="100"
                            />
                            <img
                                src='img/home_img.png'
                                alt=""
                                width="100"
                                height="100"
                            />
                            <img
                                src='img/home_img.png'
                                alt=""
                                width="100"
                                height="100"
                            />
                        </p>
                    </div>
                </div>
            </Container>
    )
}

export default Home
