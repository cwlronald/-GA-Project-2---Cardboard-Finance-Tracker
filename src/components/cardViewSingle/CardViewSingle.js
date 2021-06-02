import {useEffect, useState} from "react";
import {Container, Col, Row} from "react-bootstrap";
import './CardViewSingle.css';
import '../../App.css';


function CardViewSingle({cardObj}){
    const [cardDetails,setCardDetails]=useState({images:{},set:{}})

    useEffect(()=>{
        async function getCardDetails() {
            setCardDetails(cardObj)
        }
        getCardDetails()
    },[cardObj])


    return(
        <Container className="text-white pt-3 pb-3 d-flex justify-content-center align-items-center"
                   style={{minHeight:'100vh'}}>
            {!cardDetails ?
                'Loading':
                <Row>
                    <Col className='justify-content-center'>
                        <img src={cardDetails.images.small} alt=""/>
                    </Col>
                    <Col>
                        <Row>
                            <h1>{`${cardDetails.name} - ${cardDetails.variant}`}</h1>
                        </Row>
                        <Row>
                            <h2>{cardDetails.set.name} - {cardDetails.set.series}</h2>
                        </Row>
                        <Row>
                            <h2>{`Price: $${cardDetails.marketprice}`}</h2>
                        </Row>
                    </Col>
                </Row>
            }
        </Container>

    )
}

export default CardViewSingle
