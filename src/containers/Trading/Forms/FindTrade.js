import React, { useState, useEffect } from 'react';

import { Link } from "react-router"

import api from "../../../api";


export default function FindTrade() {

    const [loading, setLoading] = useState(false);
    const [searchError, setSearchError] = useState("")
    const [tradeID, setTradeID] = useState("")

    const [trade, setTrade] = useState(null)

    const submit = (e) => {
        e.preventDefault()

        setLoading(true)
        api.get("/trade/id=" + tradeID).then(response => {
            setLoading(false);

            console.log(response);
            if (response.data.length === 0) {
                setSearchError("No trades exist with that ID")
            } else {
                setTrade(response.data[0]);
            }
            
        }).catch(err => {
            console.log(err);
            setLoading(false);
            setSearchError(err.message);
        });
    }

    return (
        <>
        <h2 className="text-brand font-bold text-2xl">Find a Trade</h2>
        <p>Search for a trade and view, edit or delete the trade</p>

        <form className="mt-6" onSubmit={submit}>
            <label className="block uppercase tracking-wide text-gray-600 text-xs font-bold mb-2" htmlFor="trade-id">
                Trade ID
            </label>
            <input className="appearance-none block w-full md:w-1/6 bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" value={tradeID} onChange={(e) => setTradeID(e.target.value)} id="trade-id" type="text" placeholder="################" />
            
            {searchError.length > 0 && <p className="text-red-700">Error: {searchError}</p>}
            <input className="bg-brand text-white px-3 py-2 rounded hover:shadow hover:cursor-pointer text-xs uppercase tracking-wide" type="submit" value={loading ? "Loading..." : "Search"} />
        </form>


        {trade !== null &&
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

                <div className="mt-6">
                    <Link to={`/trading/edit-trade/${trade.id}`} className="mr-2 px-4 py-1 text-white rounded shadow bg-indigo-700 hover:cursor-pointer hover:bg-indigo-500">Edit</Link>

                </div>
            </div>
        
        }
        </>
    )
}