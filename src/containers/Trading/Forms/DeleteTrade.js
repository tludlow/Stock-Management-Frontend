import React, { useState, useEffect } from 'react';

import api from "../../../api.js";

export default function DeleteTrade(props) {

    const [loading, setLoading] = useState(false);
    const [tradeID, setTradeID] = useState("");
    const [trade, setTrade] = useState([]);
    const [error, setError] = useState("");
    const [justDeleted, setJustDeleted] = useState(false);

    useEffect(()=> {
        if (props.params.tradeID !== undefined){
            getTrade(props.params.tradeID)
        }
    }, [])

    const submit = e => {
        e.preventDefault();
        setLoading(true);
        console.log("Form submitted", tradeID);
        getTrade(tradeID);
    }

    const getTrade = id => {
        api.get("/trade/id=" + id).then(response => {
            setError("");
            setLoading(false);
            setJustDeleted(false);
            if (response.data.length === 0) {
                setError("No trades exist with that ID")
            } else {
                setTrade(response.data[0]);
                console.log(response);
            }
            
        }).catch(err => {
            console.log(err);
            setLoading(false);
            setError(err.message);
        });
    }

    const deleteTrade = id => {
        setLoading(true);
        setError("")
        api.post("/trade/delete/",
        {
            trade_id: id
        }).then(response => {
            console.log(response)
            if (response.status === 400) {
                setError(response.data.error);
                setLoading(false);
            } else {
                console.log(response);
                setLoading(false);
                setJustDeleted(true);
            }
            }).catch(err => {
                console.log(err);
                setError(err.response.data.error);
                setLoading(false);
            });
    }

    return (
        <>
        {error.length > 0 &&  
            <>
                <p className="text-red-800 font-bold text-xl">Error</p>
                <p className="text-red-600">{error}</p>
            </>
        }
        
        {justDeleted && <p className="text-green-600 font-semibold mb-4">Successfully deleted trade: {tradeID} </p>}
        <h2 className="text-brand text-2xl font-bold">Delete a Trade</h2>
        <p>Search for the ID of a trade you wish to delete</p>

        {loading === false ? 
        <form className="mt-6" onSubmit={submit}>
            <label className="block uppercase tracking-wide text-gray-600 text-xs font-bold mb-2" htmlFor="trade-id">
                Trade ID
            </label>
            <input className="appearance-none block w-full md:w-1/6 bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" value={tradeID} onChange={e => setTradeID(e.target.value)}id="trade-id" type="text" placeholder="################" />
            <input className="bg-brand text-white px-3 py-2 rounded hover:shadow hover:cursor-pointer text-xs uppercase tracking-wide" type="submit" value={loading ? "Loading..." : "Search"} />
        </form> : ""}

        {loading ? <div className="h-32 w-32 mx-auto spinner text-center"></div> : ""}
        
        {error.length === 0 && !(trade instanceof Array) && !justDeleted ?
            <div className="w-8/12 mt-8 py-4 px-4 text-center rounded shadow bg-white">
                <p><span className="font-bold">Trade ID</span>: {trade.id}</p>
                <p><span className="font-bold">Product ID</span>: {trade.product}</p>
                <p><span className="font-bold">Date</span>: {trade.date}</p>
                <p><span className="font-bold">Maturity Date</span>: {trade.maturity_date}</p>
                <p><span className="font-bold">Strike Price</span>: {trade.strike_price}</p>
                <p><span className="font-bold">Quantity</span>: {trade.quantity}</p>
                <p><span className="font-bold">Buying Party</span>: {trade.buying_party}</p>
                <p><span className="font-bold">Selling Party</span>: {trade.selling_party}</p>
                <p><span className="font-bold">Notional Currency</span>: {trade.notional_currency}</p>
                <p><span className="font-bold">Underlying Currency</span>: {trade.underlying_currency}</p>

                <div className="mt-6 w-full mx-auto flex justify-center">
                    <button onClick={()=> deleteTrade(trade.id)} className="ml-2 px-4 py-1 text-white rounded shadow bg-red-700 hover:cursor-pointer hover:bg-red-500">Delete</button>
                </div>
            </div>
        : ""}
        </>
    );
}