import React from "react";
import {Card, Container} from "react-bootstrap";
import {NavLink} from "react-router-dom"
import './CardView.css';
import '../../App.css';

function CardView({cardList, setSingleCard}){

    function submit(cardObj){
        setSingleCard(cardObj)
    }

    function checkCardVariants(card){
        try{
            if (Object.keys(card.tcgplayer.prices).length > 1){
                let cardVersion = Object.keys(card.tcgplayer.prices)
                if(cardVersion.indexOf(card.variant)>0){
                    return true
                    console.log("variant present")
                }
            }
        }catch{
            return false
        }

    }

    return(
        <Container className='gallery'>
            {cardList.map(card => (
                checkCardVariants(card)===true ?
                    <NavLink to={`/card/${card.id}`} className='galleryImg hoverImg' onClick={()=>{submit(card)}} key={card.id}>
                        <Card className="bg-dark text-white" key={card.id}>
                            <div className='wrapper'>
                                <Card.Img src={card.images.small}/>
                            </div>
                            <Card.ImgOverlay>
                                <div className='cardText'>
                                    <Card.Title >{card.variant}</Card.Title>
                                </div>
                            </Card.ImgOverlay>
                        </Card>
                    </NavLink>
                    :
                    <NavLink to={`/card/${card.id}`} className='galleryImg' onClick={()=>{submit(card)}} key={card.id}>
                        <img className='hoverImg' src={card.images.small}/>
                    </NavLink>
            ))}
        </Container>
    )
}

export default CardView
