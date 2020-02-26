import React from "react";
import { Link, browserHistory } from "react-router";

export default function FourOFour() {
    return (
        <div className="text-center mt-12 lg:mt-40">
            <h1 className="text-brand font-bold text-4xl">This page doesn't exist</h1>
            <p className="text-gray-800 text-xl">You should go back to the home page or return to where you came from</p>
            
            <div className="mt-8 flex justify-center">
                <Link className="block p-2 w-40 bg-brand rounded-lg shadow-lg font-bold text-white uppercase tracking-normal hover:shadow-2xl hover:bg-blue-600" to="/">Go Home</Link>
                <button className="block p-2 ml-4 w-40 text-white bg-gray-700 font-bold uppercase rounded-lg shadow-lg hover:bg-gray-600 hover:shadow-2xl" onClick={()=> browserHistory.goBack()}>Go back</button>
            </div>
        </div>
    );
}