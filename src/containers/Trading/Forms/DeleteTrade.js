import React, { useState } from 'react';

import api from "../../../api.js";


export default function DeleteTrade() {

    const [loading, setLoading] = useState(false);
    const [tradeID, setTradeID] = useState("");
    const [trade, setTrade] = useState([]);
    const [error, setError] = useState("");

    const submit = e => {
        e.preventDefault();
        setLoading(true);
        console.log("Form submitted", tradeID);
        getTrade(tradeID);
    }

    const getTrade = id => {
        api.get("/trade/id=" + id).then(response => {
            setLoading(false);
            setTrade(response.data[0]);
            console.log(response);
        }).catch(err => {
            setLoading(false);
            setError(err.message);
        });
    }

    if(error.length > 0) {
        return (
            <>
                <p>Error loading trade:</p>
                <p className="text-red-600">{error}</p>
            </>
        )
    }

    return (
        <>
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
        
        {!Array.isArray(trade) ?
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
                    <button className="ml-2 px-4 py-1 text-white rounded shadow bg-red-700 hover:cursor-pointer hover:bg-red-500">Delete</button>
                </div>
            </div>
        : ""}
        </>
    );
}