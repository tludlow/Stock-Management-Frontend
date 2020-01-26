import React, { useState } from 'react';

//AutoSuggestion inputs
import CompanyAutoSuggest from "./AutoSuggestions/CompanyAutoSuggest";


export default function CreateTrade() {
    //Data for the auto suggested form inputs is found through the redux state of the app.
    const [buyingCompany, setBuyingCompany] = useState('');


    return (
        <>
        <div className="flex flex-col items-center md:items-start">
            <h2 className="text-brand font-bold text-xl">Create a new trade</h2>
            <p>Insert the details for a derivative manually</p>
        </div>

        <form className="mt-8 w-10/12 mx-auto h-auto flex bg-white shadow rounded-lg">
            <div className="mx-auto py-8 px-2">
                <div className="mb-4">
                <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="buyingCompany">
                    Buying Company
                    <span className="block text-gray-700 text-sm font-normal">The company which is buying the derivative, can either be the name or their ID</span>
                </label>
                <CompanyAutoSuggest />
                {/* <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="type" type="text" autoComplete="on" placeholder="Stocks" /> */}
                </div>
            </div>
        </form>
        </>
    );
}