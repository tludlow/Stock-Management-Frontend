import React, { useState, useEffect } from 'react';
import api from "../../../api";

export default function EditTrade(props) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [trade, setTrade] = useState(null);

    const [status, setStatus] = useState("");
    const [changes, setChanges] = useState(null);

    useEffect(() => {
        api.get("/trade/id=" + props.params.tradeID).then(response => {
            setLoading(false);

            console.log(response);
            if (response.data.length === 0) {
                setError("No trades exist with that ID")
            } else {
                setTrade(response.data[0]);
            }
            
        }).catch(err => {
            console.log(err);
            setLoading(false);
            setError(err.message);
        });
    }, []);

    const maturityDateChange = (event) => {
        event.persist();
        setTrade((prevState) => ({ ...prevState, "maturity_date": event.target.value }));
    }

    const quantityChange = (event) => {
        event.persist();
        setTrade((prevState) => ({ ...prevState, "quantity": event.target.value }));
    }

    const strikePriceChange = (event) => {
        event.persist();
        setTrade((prevState) => ({ ...prevState, "strike_price": event.target.value }));
    }

    const underlyingPriceChange = (event) => {
        event.persist();
        setTrade((prevState) => ({ ...prevState, "underlying_price": event.target.value }));
    }

    const submit = (event) => {
        event.preventDefault()
        console.log("submitting!", trade)

        setLoading(true)
        setChanges(null)
        setStatus("")
        setError("")

        //Add a new field which the backend requires for the trade id.
        let updatedTradeObj = trade.trade_id = trade.id
        setTrade(updatedTradeObj)

        api.post("/trade/edit/", trade).then(response => {
            console.log(response);
            setLoading(false)
            if (response.data.message !== undefined) {
                setStatus("SUCCESS! No changes were made, all of the fields are the same")
            }
            if (response.data.changes !== undefined) {
                setStatus("SUCCESS! Trade Updated, new details are below.")
                setChanges(response.data.changes)
                setTrade(response.data.trade[0])

            }
        }).catch(err => {
            console.log(err.response);
            setError(err.response.data.error)
            api.get("/trade/id=" + props.params.tradeID).then(response => {
                setLoading(false);
    
                console.log(response);
                if (response.data.length === 0) {
                    setError("No trades exist with that ID")
                } else {
                    setTrade(response.data[0]);
                }
                
            }).catch(err => {
                console.log(err);
                setLoading(false);
                setError(err.message);
            });

        })
    }

    if (loading) {
        return (
            <div className="h-32 w-32 mx-auto spinner text-center"></div>
        )
    }
    
    return (
        <>
        <h2 className="text-brand font-bold text-2xl">Editing Trade: <span className=" text-lg text-gray-900">{props.params.tradeID}</span></h2>
        <p>Current trade details</p>
        <hr className="my-2" />


        {trade !== null &&
            <>
            <h2 className="text-center text-xl">Trade Information for: <strong>{trade.id}</strong></h2>
                <div className="w-8/12 mt-8 mx-auto py-4 px-4 text-center rounded shadow bg-white">
                    <p><span className="font-bold">Product ID</span>: {trade.product}</p>
                    <p><span className="font-bold">Date</span>: {trade.date}</p>
                    <p><span className="font-bold">Maturity Date</span>: {trade.maturity_date}</p>
                    <p><span className="font-bold">Strike Price</span>: {trade.strike_price}</p>
                    <p><span className="font-bold">Quantity</span>: {trade.quantity}</p>
                    <p><span className="font-bold">Buying Party</span>: {trade.buying_party}</p>
                    <p><span className="font-bold">Selling Party</span>: {trade.selling_party}</p>
                    <p><span className="font-bold">Notional Currency</span>: {trade.notional_currency}</p>
                    <p><span className="font-bold">Underlying Currency</span>: {trade.underlying_currency}</p>
                    
                </div>
            <form onSubmit={submit} className="mt-8 w-11/12 p-4 mx-auto h-auto flex flex-col justify-center items-center bg-white shadow rounded-lg" action="">
                <div className="flex flex-col items-center">
                <p className="mb-4 font-bold text-lg">Editable sections of a trade:</p>
                {/* Maturity Date */}
                <div className="mb-8" style={{width: "300px"}}>
                    <p className="text-brand text-md font-semibold">Maturity Date</p>
                    <small>Maturity date's cannot be in the past</small>
                    <input onChange={(event)=> maturityDateChange(event)} min={new Date().toISOString().split('T')[0]} value={trade.maturity_date} className="w-full py-4 px-6 rounded border hover:border-gray-600" type="date" name="maturity-date" id="maturity-date"/>
                </div>

                {/* Quantity */}
                <div className="mb-8" style={{width: "300px"}}>
                    <p className="text-brand text-md font-semibold">Quantity</p>
                    <small>Quantities must be at least 1</small>
                    <input onChange={(event)=> quantityChange(event)} value={trade.quantity} min="1" className="w-full py-4 px-6 rounded border hover:border-gray-600" type="number" name="quantity" id="quantity"/>
                </div>

                {/* Strike Price */}
                <div className="mb-8" style={{width: "300px"}}>
                    <p className="text-brand text-md font-semibold">Strike Price</p>
                    <small>Strike price must be a positive number (not 0)</small>
                    <input onChange={(event)=> strikePriceChange(event)} value={trade.strike_price} min={0.01} step=".01" className="w-full py-4 px-6 rounded border hover:border-gray-600" type="number" name="strike-price" id="strike-price"/>
                </div>

                {/* Underlying Price */}
                <div className="mb-8" style={{width: "300px"}}>
                    <p className="text-brand text-md font-semibold">Underlying Price</p>
                    <small>underlying price must be a positive number (not 0)</small>
                    <input onChange={(event)=> underlyingPriceChange(event)} value={trade.underlying_price} min={0.01} step=".01" className="w-full py-4 px-6 rounded border hover:border-gray-600" type="number" name="underlying-price" id="underlying-price"/>
                </div>
                
                {error.length > 0 && <p className="text-red-700">{error}</p>}
                {status.length > 0 && <p className="text-green-600">{status}</p>}
                <input className="mx-auto mt-2 text-center px-3 py-2 rounded shadow bg-brand text-white uppercase font-semibold text-sm" type="submit" value="Edit Trade"/>
                </div>
            </form>
            </>
        }
        

        </>
    )
}