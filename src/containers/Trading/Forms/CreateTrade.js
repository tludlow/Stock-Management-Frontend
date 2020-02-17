import React, { useState } from 'react';

//AutoSuggestion inputs
import CompanyAutoSuggest from "./AutoSuggestions/CompanyAutoSuggest";


export default function CreateTrade() {
    //Data for the auto suggested form inputs is found through the redux state of the app.
    //const [buyingCompany, setBuyingCompany] = useState('');
    const [error, setError] = useState("")

    return (
        <>
        <div className="flex flex-col items-center md:items-start">
            <h2 className="text-brand font-bold text-xl">Create a new trade</h2>
            <p>Insert the details for a derivative manually</p>
            <hr className="my-2" />
            <p className="text-center">If you choose to have a the trade type be a stock, the buying company is the stock you are buying.</p>
        </div>

        <form className="mt-8 w-11/12 p-4 mx-auto h-auto flex flex-col items-center bg-white shadow rounded-lg">
                {/* Trade type, stock or products */}
                <div className="my-2 w-10/12">
                    <label className="block text-center mb-1" htmlFor="type">
                        <h4 className="text-brand font-semibold text-lg tracking-wide">Type</h4>
                        <p className="text-gray-600">Are you trading stock(s) or product(s)</p>
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="type" placeholder="Stock or Product" />
                </div>

                <div className="w-10/12 flex flex-col md:w-10/12 md:flex-row md:justify-between">
                    {/* The buying company */}
                    <div className="my-3 md:w-2/5">
                        <label className="block text-center mb-1" htmlFor="buyingCompany">
                            <h4 className="text-brand font-semibold text-lg tracking-wide">Buying Company</h4>
                        </label>
                        <input className="md:text-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="buyingCompany" placeholder="Buying Company" />
                    </div>

                    {/* The selling company */}
                    <div className="my-3 md:w-2/5">
                        <label className="block text-center mb-1" htmlFor="sellingCompany">
                            <h4 className="text-brand font-semibold text-lg tracking-wide">Selling Company</h4>
                        </label>
                        <input className="md:text-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="sellingCompany" placeholder="Selling Company" />
                    </div>

                </div>

                <div className="w-10/12 flex flex-col md:w-10/12 md:flex-row md:justify-between">
                    {/* The notional currency */}
                    <div className="my-3 md:w-2/5">
                        <label className="block text-center mb-1" htmlFor="notionalCurrency">
                            <h4 className="text-brand font-semibold text-lg tracking-wide">Notional Currency</h4>
                        </label>
                        <input className="md:text-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="notionalCurrency" placeholder="Notional Currency" />
                    </div>

                    {/* The underlying currency */}
                    <div className="my-3 md:w-2/5">
                        <label className="block text-center mb-1" htmlFor="underlyingCurrency">
                            <h4 className="text-brand font-semibold text-lg tracking-wide">Underlying Currency</h4>
                        </label>
                        <input className="md:text-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="underlyingCurrency" placeholder="Underlying Currency" />
                    </div>
                </div>

                {/* Quantity traded */}
                <div className="my-3 w-2/5">
                    <label className="block text-center mb-1" htmlFor="quantity">
                        <h4 className="text-brand font-semibold text-lg tracking-wide">Quantity</h4>
                    </label>
                    <input className="text-center shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" id="quantity" min="1" max="5" />
                </div>

                {/* Strike price */}
                <div className="my-3 w-2/5">
                    <label className="block text-center mb-1" htmlFor="strikePrice">
                        <h4 className="text-brand font-semibold text-lg tracking-wide">Strike Price</h4>
                    </label>
                    <input className="text-center shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" id="strikePrice" min="1" max="5" />
                </div>

                {/* Maturity Date */}
                <div className="my-3 w-2/5">
                    <label className="block text-center mb-1" htmlFor="maturityDate">
                        <h4 className="text-brand font-semibold text-lg tracking-wide">Maturity Date</h4>
                    </label>
                    <input className="text-center shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight" type="date" id="maturityDate" name="maturityDate" />
                </div>

                <p className="mt-6 text-center">CompanyA is selling 12 jeeps to CompanyB in 100 days</p>
                <button className="mx-auto mt-2 text-center px-3 py-2 rounded shadow bg-brand text-white uppercase font-semibold text-sm" type="submit">Create Trade</button>
        </form>
        </>
    );
}