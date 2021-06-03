import React, {useEffect, useState} from "react";
import {Container, Row} from "react-bootstrap";
import './SearchView.css';
import '../../App.css';
import CardView from "../cardView/CardView";
import ListView from "../listView/ListView";
import {useAuth} from "../../lib/contexts/AuthContext";
import pokemon from "pokemontcgsdk";
import MockData from "../../lib/MockData";
import {ConvertData} from "../../lib/Function";



function SearchView({search,setSingleCard, portfolioValue,firebaseCardList}){

    const [viewState, setViewState] = useState('list')
    const {currentUser} = useAuth()
    const [cardList,setCardList] = useState([])


    useEffect(()=>{
        pokemon.configure({apiKey: process.env.REACT_APP_API_KEY})
        async function getCardList() {

            // let result = await pokemon.card.where({ q: `name:${search}` })
            // let data = await result.data

            let data = MockData


            let newData = ConvertData(data)
            for (let i in newData){
                for (let j in firebaseCardList){
                    if(newData[i].id===firebaseCardList[j].id && newData[i].variant===firebaseCardList[j].variant){
                        newData[i].totalvalue=firebaseCardList[j].totalvalue
                        newData.splice(i,1)
                        newData.unshift(firebaseCardList[j])
                    } else {
                        newData[i].totalvalue = 0
                    }
                }
            }

            setCardList(newData)
        }
        getCardList()
    },[firebaseCardList])

    return(
        <Container style={{height:'100%'}}>
            {currentUser ?
                <Row>
                    <h2 className='text-white mt-0 pt-0'>Total Portfolio Value: ${portfolioValue}</h2>
                </Row>
            :
            <></>}

            <Row className='mt-3'>
                <div className="text-white mr-2 pt-1">Set View Type</div>
                <button type="button" className="btn btn-secondary btn-sm active mr-2" role="button" aria-pressed="true" onClick={()=>setViewState('image')}>Image</button>
                <button type="button" className="btn btn-secondary btn-sm active" role="button" aria-pressed="true" onClick={()=>setViewState('list')}>List</button>
            </Row>
            <Row>
                {viewState === 'image'?
                    <CardView cardList={cardList} setSingleCard={setSingleCard}/>
                    :<ListView cardList={cardList} setSingleCard={setSingleCard}/>}
            </Row>
        </Container>
    )
}

export default SearchView
