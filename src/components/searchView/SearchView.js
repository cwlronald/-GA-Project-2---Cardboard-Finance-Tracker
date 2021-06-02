import React, {useState} from "react";
import {Container, Row} from "react-bootstrap";
import './SearchView.css';
import '../../App.css';
import CardView from "../cardView/CardView";
import ListView from "../listView/ListView";


function SearchView({search, singleCard, setSingleCard}){

    const [viewState, setViewState] = useState('list')


    return(
        <Container>
            <Row className='mt-3'>
                <div className="text-white mr-2 pt-1">Set View Type</div>
                <button type="button" className="btn btn-secondary btn-sm active mr-2" role="button" aria-pressed="true" onClick={()=>setViewState('image')}>Image</button>
                <button type="button" className="btn btn-secondary btn-sm active" role="button" aria-pressed="true" onClick={()=>setViewState('list')}>List</button>
            </Row>
            <Row>
                {viewState === 'image'?
                    <CardView search={search} singleCard={singleCard} setSingleCard={setSingleCard}/>
                    :<ListView search={search} singleCard={singleCard} setSingleCard={setSingleCard}/>}
            </Row>
        </Container>
    )
}

export default SearchView
