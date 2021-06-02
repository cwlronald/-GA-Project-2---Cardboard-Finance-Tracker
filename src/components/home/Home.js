import React from 'react'
import {Container, Form, FormControl} from 'react-bootstrap'
import './Home.css';
import '../../App.css';
import {NavLink, useHistory} from "react-router-dom"


function Home({search,setSearch}) {

    let history = useHistory()
    function change(e){
        setSearch(e.target.value)
    }
    function test(e){

        if (e.key==='Enter'){
            history.push(`/search/${search}`)
            console.log('enter pressed')
        }
    }

    return (
            <Container
                className='d-flex align-items-center justify-content-center'
                style={{minHeight:'100vh'}}>
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
                            onKeyDown={test}
                        />
                        <NavLink
                            to={`/search/${search}`}
                            className="btn btn-primary"
                            variant="outline-success"
                        >Search
                        </NavLink>
                    </div>
                </div>
            </Container>
    )
}

export default Home
