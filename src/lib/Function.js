import {Button, FormControl, Table} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import React, {useState} from "react";
import {useAuth} from "./contexts/AuthContext";
import firebase from "firebase";

function ConvertData(data){
    let newData=[]
    for (let i in data){
        try{
            let cardVersion = Object.keys(data[i].tcgplayer.prices)
            if (cardVersion.length==1){
                let tempData = [...data][i]
                tempData.variant=cardVersion[0]
                tempData.variantcount=cardVersion.length
                tempData.marketprice=tempData.tcgplayer.prices[cardVersion[0]].market
                newData.push(tempData)
            } else {
                for(let j in cardVersion){
                    let tempData = [...data][i]
                    tempData.variant=cardVersion[j]
                    tempData.variantcount=cardVersion.length
                    tempData.marketprice=tempData.tcgplayer.prices[cardVersion[j]].market
                    let pushData = {...tempData}
                    newData.push(pushData)
                }
            }
        }catch{
            // no tcg player data
            let tempData = [...data][i]
            tempData.variant='normal'
            tempData.variantcount=1
            tempData.marketprice=0
            newData.push(tempData)
        }
    }
    return newData
}

function CreateTable({miscColumn,cardList,submit,firebaseData}){

    const[newQuantity,setNewQuantity] = useState()
    const { currentUser } = useAuth()

    function changeQuantity(e){
        setNewQuantity(e.target.value)
    }

    function writeToFirebase(id,pokemon,quantity,variant){
        let docRef=firebaseData.doc(currentUser.email)
        docRef.set({
            [`${id}-${variant}`]:{
                'id':id,
                'pokemon':pokemon,
                'variant':variant,
                'quantity':quantity,
            }
        },{merge:true})
    }


    return(
        <Table striped bordered hover variant="dark" className='mt-4 mb-4'>
            <thead>
            <tr style={{fontSize: "small"}} className='text-center'>
                <th>#</th>
                <th>Card Name</th>
                <th>Set Name</th>
                <th>Series</th>
                <th>Variant</th>
                <th>Card Number</th>
                <th>Market Price</th>
                {miscColumn == 'Portfolio' ?
                    <th>Portfolio</th>
                    :
                    <>
                        <th>Quantity</th>
                        <th>Total Value</th>
                        <th>Change Quantity</th>
                    </>

                }

            </tr>
            </thead>

            {cardList ?
                <tbody>
                {cardList.map((card,index) => (
                    <tr style={{fontSize: "small"}} className='text-center align-items-center justify-content-center'>
                        <td>{index+1}</td>
                        <td>
                            <NavLink to={`/card/${card.id}`} className='galleryImg' onClick={()=>{submit(card)}} key={card.id}>
                                {card.name}
                            </NavLink>
                        </td>
                        <td>{card.set.name}</td>
                        <td>{card.set.series}</td>
                        <td>{card.variant}</td>
                        <td>{`${card.number}/${card.set.total}`}</td>
                        <td>{`$${card.marketprice}`}</td>
                        {miscColumn == 'Portfolio' ?
                            <td><Button variant="secondary" size='sm'>Add</Button></td>
                            :
                            <>
                                <td>{card.quantity}</td>
                                <td>${parseInt(card.quantity)*parseFloat(card.marketprice)}</td>
                                <div className="d-flex pl-4 pr-4" id={'searchBar'} >
                                    <FormControl
                                        type="search"
                                        className="mr-2 p-0"
                                        aria-label="Search"
                                        style={{fontSize: "small"}}
                                        onChange={changeQuantity}

                                    />
                                    <Button
                                        variant="secondary"
                                        size="sm" className='p-0'
                                        style={{fontSize: "x-small"}}
                                        onClick={()=>(writeToFirebase(card.id,card.name,parseInt(newQuantity),card.variant))}>
                                        Submit
                                    </Button>
                                </div>
                            </>
                        }

                    </tr>
                ))}
                </tbody>
                :
                <></>
            }

        </Table>
    )
}


export {
    ConvertData,
    CreateTable
}
