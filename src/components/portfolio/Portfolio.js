import React, {useEffect, useState} from 'react'
import firebase from '../../lib/Firebase'
import {useAuth} from "../../lib/contexts/AuthContext";
import MockData from "../../lib/MockData";
import {ConvertData, CreateTable} from "../../lib/Function";
import {Container} from "react-bootstrap";
import pokemon from 'pokemontcgsdk'


export function Portfolio({setSingleCard, portfolioValue, setPortfolioValue}){
    const [cardList,setCardList] = useState()
    const [loading,setLoading] = useState(false)
    const {currentUser} = useAuth()


    const firebaseData=firebase.firestore().collection('usercarddata')

    // query from firebase, get cardid, variant, quantity
    useEffect(()=>{
        pokemon.configure({apiKey: process.env.REACT_APP_API_KEY})

        async function getCardList(){
            setLoading(true)
            await firebaseData.doc(currentUser.email).onSnapshot((querySnapshot)=>{
                try{
                    let firebaseUserCards = []
                    for (let i in querySnapshot.data()){
                        firebaseUserCards.push(querySnapshot.data()[i])
                    }

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
                    let pV=0
                    for (let i in newData){
                        for(let j in firebaseUserCards){
                            if(firebaseUserCards[j].id==newData[i].id && firebaseUserCards[j].variant==newData[i].variant){
                                newData[i].quantity=firebaseUserCards[j].quantity
                                let total = newData[i].quantity*newData[i].marketprice
                                total = total || 0
                                pV+=total
                                tempData.push(newData[i])
                            }
                        }
                    }

                    setCardList(tempData)
                    setPortfolioValue(pV)
                    setLoading(false)
                }
                catch{
                    console.log('user has no data')
                    setLoading(false)
                }
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


    // writeToFirebase('xy7-68','Lugia',10,'holofoil')
    // writeToFirebase('smp-SM82','Lugia',20,'holofoil')
    // writeToFirebase('pop5-2','Lugia',100,'holofoil')

    return(


        <Container
            className='d-flex'
            style={{minHeight:'100vh'}}>
            <div className='w-100'>
                <h2 className='text-white mt-3'>Total Portfolio Value: ${portfolioValue}</h2>
                <CreateTable miscColumn={'Quantity'} cardList={cardList} submit={submit} firebaseData={firebaseData}></CreateTable>
            </div>
        </Container>

    )
}
