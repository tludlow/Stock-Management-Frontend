import React, { useState, useEffect } from 'react';

import api from "../../api";

export default function Trade(props) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [trade, setTrade] = useState({});

    useEffect(()=> {
        api.get("/trade/id=" + props.params.tradeID).then(response => {
            console.log(response);
            setTrade(response.data[0]);
            setLoading(false);
            setError("");
        }).catch(err => {
            console.log(err);
            setLoading(false);
            setError(err.message);
        });
    }, []);

    if (loading) {
        return (
            <>  
            <h2 className="mt-12 text-xl text-center">Loading trade: <strong>{props.params.tradeID}</strong></h2>
            <div className="h-32 w-32 mx-auto spinner text-center"></div>
            </>
        );
    }

    if (error.length > 0) {
        return (
            <>  
            <h2 className="mt-12 text-xl text-center">Error loading trade: <strong>{props.params.tradeID}</strong></h2>
            <p className=" mt-2 text-red-700 text-center">{error}</p>
            </>
        );
    }

    return (
        <>
            <h2 className="text-center text-xl">Trade Information for: <strong>{trade.id}</strong></h2>
            <div className="w-8/12 mt-8 mx-auto py-4 px-4 text-center rounded shadow bg-white">
                <p><span className="font-bold">Product ID</span>: {trade.product_id}</p>
                <p><span className="font-bold">Date</span>: {trade.date}</p>
                <p><span className="font-bold">Maturity Date</span>: {trade.maturity_date}</p>
                <p><span className="font-bold">Strike Price</span>: {trade.strike_price}</p>
                <p><span className="font-bold">Quantity</span>: {trade.quantity}</p>
                <p><span className="font-bold">Buying Party</span>: {trade.buying_party}</p>
                <p><span className="font-bold">Selling Party</span>: {trade.selling_party}</p>
                <p><span className="font-bold">Notional Currency</span>: {trade.notional_currency}</p>
                <p><span className="font-bold">Underlying Currency</span>: {trade.underlying_currency}</p>

                <div className="mt-6 w-full mx-auto flex justify-center">
                    <button className="mr-2 px-4 py-1 text-white rounded shadow bg-indigo-700 hover:cursor-pointer hover:bg-indigo-500">Edit</button>
                    <button className="ml-2 px-4 py-1 text-white rounded shadow bg-red-700 hover:cursor-pointer hover:bg-red-500">Delete</button>
                </div>
            </div>
            
        </>
    );
    
}