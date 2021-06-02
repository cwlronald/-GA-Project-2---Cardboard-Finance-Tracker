import {Button, FormControl, Table} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import React from "react";

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

function CreateTable({miscColumn,cardList,submit}){
    return(
        <Table striped bordered hover variant="dark" className='mt-4 mb-4'>
            <thead>
            <tr>
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
            <tbody>

            {cardList.map((card,index) => (
                <tr>
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
                            <div className="d-flex" id={'searchBar'} >
                                <FormControl
                                    type="search"
                                    className="mr-2"
                                    aria-label="Search"
                                />
                                <Button>Submit</Button>
                            </div>
                        </>
                    }

                </tr>
            ))}
            </tbody>
        </Table>


    )
}


export {
    ConvertData,
    CreateTable
}
