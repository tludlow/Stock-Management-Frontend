import React from "react";
import { Link } from "react-router";

export default function FourOFour(props) {
    // return (
    //     <div className="fourofour">
    //         <h3>This page doesnt exist.</h3>
    //         <p>Return back or go to the home page</p>
    //         <p className="button" onClick={()=> browserHistory.push("/")}>
    //             Go home
    //         </p>
    //     </div>
    // );

    return (
        <div className="text-center mt-40">
            <h1 className="text-blue-800 font-bold text-4xl">This page doesn't exist</h1>
            <p className="text-gray-800 text-xl">You should go back to the home page or return to where you came from</p>
            <Link className="block p-2 w-40 mx-auto mt-8 bg-blue-800 rounded-lg shadow-lg text-white uppercase tracking-normal hover:shadow-2xl hover:bg-blue-600" to="/">Go Home</Link>
        </div>
    );
}