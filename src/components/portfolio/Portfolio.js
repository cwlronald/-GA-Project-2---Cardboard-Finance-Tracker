import React from 'react'
import {CreateTable} from "../../lib/Function";
import {Container} from "react-bootstrap";



export function Portfolio({setSingleCard, portfolioValue, firebaseCardList}){

    function submit(cardObj){
        setSingleCard(cardObj)
    }


    // writeToFirebase('xy7-68','Lugia',10,'holofoil')
    // writeToFirebase('smp-SM82','Lugia',20,'holofoil')
    // writeToFirebase('pop5-2','Lugia',100,'holofoil')

    return(
        <Container
            style={{height:'100%'}}>
            <div className='w-100'>
                <h2 className='text-white mt-0 pt-0'>Total Portfolio Value: ${portfolioValue}</h2>
                <CreateTable miscColumn={'Quantity'} cardList={firebaseCardList} submit={submit}></CreateTable>
            </div>
        </Container>
    )
}
