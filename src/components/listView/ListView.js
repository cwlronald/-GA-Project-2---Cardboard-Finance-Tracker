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
        <Container>
            <div>
                <CreateTable miscColumn={'Portfolio'} cardList={cardList} submit={submit}/>
            </div>
        </Container>
    )
}

export default ListView
