import React, { useState, useRef } from 'react';

import { browserHistory,  Link } from "react-router"
import Trade from "../Trade"

import api from "../../../api";


export default function FindTrade() {

    const filterResults = useRef(null);

    const [loading, setLoading] = useState(false);
    const [searchError, setSearchError] = useState("")
    const [tradeID, setTradeID] = useState("")
    const [filterTrades, setFilterTrades] = useState(null)
    const [filterLoading, setFilterLoading] = useState(false)

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
                // setTrade(response.data[0]);
                browserHistory.push(`/trade/${tradeID}`)
            }
            
        }).catch(err => {
            console.log(err);
            setLoading(false);
            setSearchError(err.message);
        });
    }

    const submitFilter = (event) => {
        event.preventDefault()
        event.persist()
        console.log("submitting filter form")
        console.log(event)

        let dateMin = event.target[0].value || "None"
        let dateMax = event.target[1].value || "None"
        let maturityMin = event.target[2].value || "None"
        let maturityMax = event.target[3].value || "None"
        let quantityMin = event.target[4].value || "None"
        let quantityMax = event.target[5].value || "None"
        let underlyingMin = event.target[6].value || "None"
        let underlyingMax = event.target[7].value || "None"
        let strikeMin = event.target[8].value || "None"
        let strikeMax = event.target[9].value || "None"

        console.log(dateMin)
        console.log(dateMax)
        console.log(maturityMin)
        console.log(maturityMax)
        console.log(quantityMin)
        console.log(quantityMax)
        console.log(underlyingMin)
        console.log(underlyingMax)
        console.log(strikeMin)
        console.log(strikeMax)
        
        setFilterLoading(true)

        api.get(`trade/filter/date_lower=${dateMin}&date_upper=${dateMax}&quantity_lower=${quantityMin}&quantity_upper=${quantityMax}&underlying_lower=${underlyingMin}&underlying_upper=${underlyingMax}&strike_lower=${strikeMin}&strike_upper=${strikeMax}&maturity_lower=${maturityMin}&maturity_upper=${maturityMax}/`).then(response => {
            console.log(response);
            setFilterTrades(response.data)
            setFilterLoading(false)
            
            window.scrollTo({
                behavior: "smooth",
                top: filterResults.current.offsetTop
              });
            

        }).catch(error => {
            setFilterLoading(false)
            console.log(error);
        })

        
    }

    return (
        <>
        <h2 className="text-brand font-bold text-2xl">Find a Trade</h2>
        <p>Search for a trade by it's ID</p>

        <form className="mt-6" onSubmit={submit}>
            <label className="block uppercase tracking-wide text-gray-600 text-xs font-bold mb-2" htmlFor="trade-id">
                Trade ID
            </label>
            <input className="appearance-none block w-full md:w-1/6 bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" value={tradeID} onChange={(e) => setTradeID(e.target.value)} id="trade-id" type="text" placeholder="################" />
            
            {searchError.length > 0 && <p className="text-red-700">Error: {searchError}</p>}
            <input className="bg-brand text-white px-3 py-2 rounded hover:shadow hover:cursor-pointer text-xs uppercase tracking-wide" type="submit" value={loading ? "Loading..." : "Search"} />
        </form>

        <hr className="my-8" />

        <h2 className="font-semibold text-brand text-xl">You can also search for trades by specific parts of their data</h2>
        <p>You can specify as many of these as you wish to search, but if you provide a maximum or a minimum you must also provide the other value too</p>

        <form className="mt-8 flex flex-col" action="" onSubmit={submitFilter}>

            {/* Maturity date */}
            <div className="flex">
                <div className="flex flex-col">
                    <p>Trade Creation Date Minimum</p>
                    <input id="trade-date-min" type="date" className="w-full py-4 px-6 rounded border hover:border-gray-600" />
                </div>

                <div className="ml-12 flex flex-col">
                    <p>Trade Creation Date Maximum</p>
                    <input id="trade-date-max" type="date" className="w-full py-4 px-6 rounded border hover:border-gray-600" />
                </div>
            </div>


            {/* Maturity date */}
            <div className="flex mt-12">
                <div className="flex flex-col">
                    <p>Maturity Date Minimum</p>
                    <input id="maturity-date-min" type="date" className="w-full py-4 px-6 rounded border hover:border-gray-600" />
                </div>

                <div className="ml-12 flex flex-col">
                    <p>Maturity Date Maximum</p>
                    <input id="maturity-date-max" type="date" className="w-full py-4 px-6 rounded border hover:border-gray-600" />
                </div>
            </div>

            {/* Quantity range */}
            <div className="flex mt-12">
                <div className="flex flex-col">
                    <p>Quantity Minimum</p>
                    <input min="1" className="w-full py-4 px-6 rounded border hover:border-gray-600" type="number" name="quantity-min" id="quantity-min"/>
                </div>
                <div className="ml-12 flex flex-col">
                    <p>Quantity Maximum</p>
                    <input min="1" className="w-full py-4 px-6 rounded border hover:border-gray-600" type="number" name="quantity-max" id="quantity-max"/>
                </div>
            </div>

            {/* Underlying Price */}
            <div className="flex mt-12">
                <div className="flex flex-col">
                    <p>Underlying Price Minimum</p>
                    <input min={0.01} step=".01" className="py-4 px-6 rounded border hover:border-gray-600" type="number" name="underlying-price-min" id="underlying-price-min"/>
                </div>
                <div className="ml-12 flex flex-col">
                    <p>Underlying Price Maximum</p>
                    <input min={0.01} step=".01" className="py-4 px-6 rounded border hover:border-gray-600" type="number" name="underlying-price-max" id="underlying-price-max"/>
                </div>
            </div>

            {/* Strike Price */}
            <div className="flex mt-12">
                <div className="flex flex-col">
                    <p>Stike Price Minimum</p>
                    <input min={0.01} step=".01" className="w-full py-4 px-6 rounded border hover:border-gray-600" type="number" name="strike-price-min" id="strike-price-min"/>
                </div>
                <div className="ml-12 flex flex-col">
                    <p>Stike Price Maximum</p>
                    <input min={0.01} step=".01" className="w-full py-4 px-6 rounded border hover:border-gray-600" type="number" name="strike-price-max" id="strike-price-max"/>
                </div>
            </div>

            <div className="mt-4">
                <input className="block bg-brand text-white px-3 py-2 rounded hover:shadow hover:cursor-pointer text-xs uppercase tracking-wide" type="submit" value={filterLoading ? "Finding Trades..." : "Filter Trades"} /> 
            </div>
            
        </form>


        {/* {trade !== null &&
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
        
        } */}

        <section id="found-trades" className="mt-6" ref={filterResults}>
        {filterTrades !== null ?
                <div>
                    <h3 className="text-xl font-bold text-brand">Trades matching your filter</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
                        {filterTrades.map((trade, i) => (
                            <Trade
                                key={i}
                                risk={Math.floor(Math.random() * 100) + 1}
                                id={trade.id}
                                type={trade.product_id}
                                product={trade.product} 
                                buying_company_id={trade.buying_party} 
                                selling_company_id={trade.selling_party}
                                buying_company={trade.buying_company} 
                                selling_company={trade.selling_company} 
                                quantity={trade.quantity} 
                                strikePrice={trade.strike_price}
                                maturityDate={trade.maturity_date}
                                errors={trade.errors}
                            />
                        ))}
                    </div>
                </div>
        :
            <p className="mt-6">No trades have been found in the filter.</p>
        }
        </section>
        </>
    )
}