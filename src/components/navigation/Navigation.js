import React, {useEffect, useState} from 'react';
import {Container, Nav, Navbar} from 'react-bootstrap'
import {NavLink} from "react-router-dom";
import {useAuth} from "../../lib/contexts/AuthContext";
import firebase from "../../lib/Firebase";
import pokemon from "pokemontcgsdk";
import MockData from "../../lib/MockData";
import {ConvertData} from "../../lib/Function";
import './Navigation.css';

function Navigation({portfolioValue,setPortfolioValue,setfirebaseCardList}) {
    const { currentUser } = useAuth()
    const [loading,setLoading] = useState(false)

    const firebaseData=firebase.firestore().collection('usercarddata')
    // query from firebase, get cardid, variant, quantity
    useEffect(()=>{
        pokemon.configure({apiKey: process.env.REACT_APP_API_KEY})
        if (currentUser){
            async function getFirebaseCardList(){
                await firebaseData.doc(currentUser.email).onSnapshot(async (querySnapshot)=>{
                    try{
                        let firebaseUserCards = []
                        for (let i in querySnapshot.data()){
                            firebaseUserCards.push(querySnapshot.data()[i])
                        }

                        let cardIdToFilter = []
                        firebaseUserCards.forEach((doc)=>{
                            cardIdToFilter.push(doc.id)
                        })

                        //successfully pulled the required cards from the pokemon api
                        let pokemonApiQuery = cardIdToFilter.map(async card=> await pokemon.card.find(card))
                        let pokemonApiQueryResult = await Promise.all(pokemonApiQuery)


                        // let pokemonApiQueryResult = MockData


                        //converted the pulled data to the required format
                        let newData = ConvertData(pokemonApiQueryResult)


                        //the newData now has multiple variants for the same card, must determine which card is the correct one and add in the quantity
                        let tempData = []
                        let pV=0
                        for (let i in newData){
                            for(let j in firebaseUserCards){
                                if(firebaseUserCards[j].id==newData[i].id && firebaseUserCards[j].variant==newData[i].variant){
                                    newData[i].quantity=firebaseUserCards[j].quantity
                                    newData[i].totalvalue = (newData[i].quantity*newData[i].marketprice).toFixed(2)
                                    newData[i].totalvalue = newData[i].totalvalue || 0
                                    let total = newData[i].quantity*newData[i].marketprice
                                    total = total || 0
                                    pV+=total
                                    tempData.push(newData[i])
                                }
                            }
                        }

                        setfirebaseCardList(tempData)
                        setPortfolioValue(pV.toFixed(2))
                        setLoading(false)
                    }
                    catch{
                        console.log('user has no data')
                    }
                })
            }
            getFirebaseCardList()
        }
    },[currentUser])

    if (loading) {
        return <h1>Loading...</h1>
    }

    return (
        <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark" className='header'>
            <Container>
                <Navbar.Brand>
                    <NavLink to="/" bg="dark" variant="dark">
                        <img
                            src='img/navbar_logo.png'
                            alt=""
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />Cardboard Finance
                    </NavLink>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className="justify-content-end" >
                    <Nav>
                        {currentUser ?
                            <>
                                <NavLink to='/portfolio' className='mr-2'>Portfolio: ${portfolioValue}</NavLink>
                                <NavLink to='/profile' className='mr-2'>{currentUser.email}</NavLink>
                            </>
                            :
                            <>
                                <NavLink to='/login' className='mr-2'>Login</NavLink>
                                <NavLink to='/signup' className='mr-2'>Sign Up</NavLink>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation
