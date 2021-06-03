import React from "react";
import {Container} from "react-bootstrap";
import './ListView.css';
import '../../App.css';
import {CreateTable} from "../../lib/Function";

function ListView({cardList, setSingleCard}){

    function submit(cardObj){
        setSingleCard(cardObj)
    }

    return(
        <Container
            className='d-flex'
            style={{minHeight:'100vh'}}>
            <div className='w-100'>
                <CreateTable miscColumn={'Portfolio'} cardList={cardList} submit={submit}/>
            </div>
        </Container>
    )
}

export default ListView
