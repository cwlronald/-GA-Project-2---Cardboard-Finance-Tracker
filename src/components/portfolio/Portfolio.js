import React, {useEffect, useState} from 'react'
import firebase from '../../lib/Firebase'
import {useAuth} from "../../lib/contexts/AuthContext";
import MockData from "../../lib/MockData";
import {ConvertData, CreateTable} from "../../lib/Function";
import {Container} from "react-bootstrap";
import pokemon from 'pokemontcgsdk'


export function Portfolio(setSingleCard){
    const[cardList,setCardList] = useState()
    const[loading,setLoading] = useState(false)
    const { currentUser } = useAuth()

    const firebaseData=firebase.firestore().collection('usercarddata')

    // query from firebase, get cardid, variant, quantity
    useEffect(()=>{
        pokemon.configure({apiKey: process.env.REACT_APP_API_KEY})

        async function getCardList(){
            setLoading(true)

            await firebaseData.where('user','==',currentUser.email).onSnapshot((querySnapshot)=>{

                let firebaseUserCards = []
                querySnapshot.forEach((doc)=>{
                    firebaseUserCards.push((doc.data()).cards)
                })
                firebaseUserCards=firebaseUserCards[0]

                let cardIdToFilter = []
                firebaseUserCards.forEach((doc)=>{
                    cardIdToFilter.push(doc.id)
                })


                // //successfully pulled the required cards from the pokemon api
                // let pokemonApiQuery = cardIdToFilter.map(async card=> await pokemon.card.find(card))
                // let pokemonApiQueryResult = Promise.all(pokemonApiQuery)
                let pokemonApiQueryResult = MockData

                //converted the pulled data to the required format
                let newData = ConvertData(pokemonApiQueryResult)

                //the newData now has multiple variants for the same card, must determine which card is the correct one and add in the quantity
                let tempData = []
                for (let i in newData){
                    for(let j in firebaseUserCards){
                        if(firebaseUserCards[j].id==newData[i].id && firebaseUserCards[j].variant==newData[i].variant){
                            newData[i].quantity = firebaseUserCards[j].quantity
                            tempData.push(newData[i])
                        }
                    }
                }
                console.log(tempData)
                setCardList(tempData)
                setLoading(false)
            })
        }

        getCardList()
    },[])



    if (loading) {
        return <h1>Loading...</h1>
    }
    function submit(cardObj){
        setSingleCard(cardObj)
    }

    return(
        <div>
            {
                cardList ?
                    <Container
                        className='d-flex'
                        style={{minHeight:'100vh'}}>
                        <div className='w-100'>
                            <CreateTable miscColumn={'Quantity'} cardList={cardList} submit={submit}/>
                        </div>
                    </Container>
                    :'null'
            }



        </div>
    )
}
