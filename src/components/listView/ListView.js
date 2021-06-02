import pokemon from 'pokemontcgsdk'
import React, {useEffect, useState} from "react";
import {Table, Button, Container} from "react-bootstrap";
import {NavLink} from "react-router-dom"
import './ListView.css';
import '../../App.css';
import {ConvertData,CreateTable} from "../../lib/Function";
import MockData from "../../lib/MockData";


function ListView({search, singleCard, setSingleCard}){

    const [cardList,setCardList] = useState([])


    useEffect(()=>{
        pokemon.configure({apiKey: process.env.REACT_APP_API_KEY})
        async function getCardList() {

            // let result = await pokemon.card.where({ q: `name:${search}` })
            // let data = await result.data

            let data = MockData


            let newData = ConvertData(data)
            setCardList(newData)
        }
        getCardList()
    },[search])

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
