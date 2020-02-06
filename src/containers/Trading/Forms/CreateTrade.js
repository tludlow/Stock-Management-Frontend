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
        </div>

        <form className="mt-8 w-11/12 mx-auto h-auto flex flex-col bg-white shadow rounded-lg">
            <div class="w-full my-2 md:w-1/2 px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                    Product Type
                </label>
                
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Stocks" />
            </div>

            {/* SUBMISSION AREA */}
            <div className="w-full inline-flex flex-col sr-onlyjustify-center my-4">
                {error.length > 0 ? <p className="mx-auto my-1 text-red-500 font-semibold">
                    <svg className="h-6 w-6 inline mr-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg>
                    Your id is not valid!
                </p> : ""}
                <button className="mx-auto text-center px-3 py-2 rounded shadow bg-brand text-white uppercase font-semibold text-sm" type="submit">Create Trade</button>
            </div>
        </form>
        </>
    );
}