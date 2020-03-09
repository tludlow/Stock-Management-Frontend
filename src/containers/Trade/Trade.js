import React, { useState, useEffect } from 'react';

import api from "../../api";
import { browserHistory } from "react-router";

export default function Trade(props) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [trade, setTrade] = useState({});

    const [similarTrades, setSimilarTrades] = useState(null)
    const [similarError, setSimilarError] = useState("")
    const [similarLoading, setSimilarLoading] = useState(true)

    const [errors, setErrors] = useState(null)

    useEffect(()=> {
        api.get("/trade/id=" + props.params.tradeID).then(response => {
            if(response.data.length === 0) {
                setTrade({});
                setLoading(false);
                setError("No trade exists with that id."); 
            } else {
                console.log(response);
                setTrade(response.data[0]);
                setLoading(false);
                setError("");

                if (trade !== {} && error.length === 0) {
                    getSimilarData(response.data[0])
                    checkForErrors()
                    
                }
            }
        }).catch(err => {
            console.log(err);
            setError(err.message);
            setLoading(false);
        });

    }, []);

    const prettifyAttribute = (att) => {
        if (att === "QT") {
            return "Quantity"
        }
        if (att === "UP") {
            return "Underlying Price"
        }
        if (att === "ST") {
            return "Strike Price"
        }
    }

    const navigateTo = (id) => {
        browserHistory.push("/trade/" + id)
        window.location.reload()
    }

    const checkForErrors = () => {
        api.get(`/error/check/id=${props.params.tradeID}`).then(response => {
            console.log(response)
            if (response.data.length !== 0) {
                setErrors(response.data)
            }
        }).catch(err => {
            console.log(err)
        })
    }

    const getSimilarData = (trade) => {
        //Load similar trades.
        api.get(`/trade/product=${trade.product_id}&buyer=${trade.buying_party_id}&seller=${trade.selling_party_id}/`).then(response => {
            setSimilarTrades(response.data)
            setSimilarLoading(false);
        }).catch(error => {
            setSimilarError("Error getting similar data to the trade.")
            console.log(error)
            setSimilarLoading(false);
        })

        console.log("Similar trades: " + similarTrades)
    }

    if (loading) {
        return (
            <>  
            <h2 className="mt-12 text-xl text-center">Loading trade: <strong>{props.params.tradeID}</strong></h2>
            <div className="h-32 w-32 mx-auto spinner text-center"></div>
            </>
        );
    }

    if(error.length > 0) {
        return (
            <>  
            <h2 className="mt-12 text-xl text-center">Error loading trade: <strong>{props.params.tradeID}</strong></h2>
            <p className=" mt-2 text-red-700 text-center">{error}</p>
            </>
        );
    }

    if (trade === null || props.params.tradeID === "undefined") {
        return (
            <>  
            <h2 className="mt-12 text-xl text-center">Error loading trade: <strong>{props.params.tradeID}</strong></h2>
            <p className=" mt-2 text-red-700 text-center">{error}</p>
            </>
        );
    } else {
        return (
            <>
                <h2 className="text-center text-xl">Trade Information for: <strong>{trade.id}</strong></h2>
                <div className="w-8/12 mt-8 mx-auto py-4 px-4 text-center rounded shadow bg-white">
                    <p><span className="font-bold">Product ID</span>: {trade.product}</p>
                    <p><span className="font-bold">Date</span>: {trade.date}</p>
                    <p><span className="font-bold">Maturity Date</span>: {trade.maturity_date}</p>
                    <p><span className="font-bold">Strike Price</span>: {trade.strike_price}</p>
                    <p><span className="font-bold">Underlying Price</span>: {trade.underlying_price}</p>
                    <p><span className="font-bold">Quantity</span>: {trade.quantity}</p>
                    <p><span className="font-bold">Buying Party</span>: {trade.buying_party}</p>
                    <p><span className="font-bold">Selling Party</span>: {trade.selling_party}</p>
                    <p><span className="font-bold">Notional Currency</span>: {trade.notional_currency}</p>
                    <p><span className="font-bold">Underlying Currency</span>: {trade.underlying_currency}</p>
                    <p><span className="font-bold">Notional Amount</span>: {trade.notional_amount}</p>
    
                    <div className="mt-6 w-full mx-auto flex justify-center">
                        <button onClick={()=> browserHistory.push(`/trading/edit-trade/${trade.id}`)} className="mr-2 px-4 py-1 text-white rounded shadow bg-indigo-700 hover:cursor-pointer hover:bg-indigo-500">Edit</button>
                        <button onClick={()=> browserHistory.push(`/trading/delete-trade/${trade.id}`)} className="ml-2 px-4 py-1 text-white rounded shadow bg-red-700 hover:cursor-pointer hover:bg-red-500">Delete</button>
                    </div>
                </div>
                
                {errors !== null &&
                <div className="mt-6">
                    <h3 className="text-brand text-lg font-semibold">This trades errors</h3>
                    <p>To fix this trades errors, please edit the trade or go to the corrections page</p>
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {errors.map((tradeerror, idx)=> (
                            <div key={idx} className="flex flex-col items-center p-4 bg-white rounded shadow">
                                <p className="font-bold">{prettifyAttribute(tradeerror.erroneous_attribute)}</p>
                                <p>Value: {tradeerror.erroneous_value}</p>
                            </div>
                        ))}
                    </div>
                </div>
                }
                {similarLoading ? 
                    <div className="h-32 w-32 mx-auto spinner text-center"></div>
                :
                similarError.length > 0 ? <p className="text-red-700">Error getting similar trade data: {similarError}</p>
                    :
                    <div className="mt-12">
                        <h3 className="text-brand text-lg font-semibold">Similar trades</h3>
                        <p>The following trades have similar attributes to the current trade being viewed.</p>

                        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
                            {similarTrades.map((strade, idx)=> (
                                <div key={idx} className="p-4 text-center bg-white rounded shadow">
                                    <p className="text-brand font-semibold">{strade.id}</p>
                                    <p>Quantity: {strade.quantity}</p>
                                    <p>Strike Price: {strade.quantity}</p>
                                    <p>Quantity: {strade.quantity}</p>
                                    <button onClick={()=> navigateTo(strade.id)} className="mt-3 px-2 py-1 bg-brand text-white hover:cursor-pointer rounded">View Trade</button>
                                </div>
                            ))}
                        </div>
                    </div>
                }
                
                
            </>
        );
    }

    
    
}