import React, { useState, useEffect } from "react";

import { Link } from "react-router";
import api from "../../api";

export default function Corrections() {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [data, setData] = useState(null);

    const prettyifyAttribute = (name) => {
        switch (name) {
            case 'UP':
                return "Underlying Price"
            case 'ST':
                return "Strike Price"
            case 'QT':
                return "Quantity"
            case 'maturity_date':
                return "Maturity Date"
        
            default:
                return "None"
        }
    }

    const overwrite = (correctID) => {
        api.post(`/correction/delete/`, {"correctionID": correctID}).then(response => {
            console.log(response)
            window.location.reload();
        }).catch(error => {
            setError("Error overwriting the correction, please refresh.")
        })
    }

    const submitCorrection = (event, errorID, type) => {
        event.preventDefault();
        console.log(event.target[0].value)
    
        api.post("/correction/apply", {"errorID": errorID, "field_type": type, "new_value": event.target[0].value}).then(response => {
            console.log(response);
            window.location.reload();
        }).catch(error => {
            console.log(error)
            setError("Error when applying new correction to existing error.")
        })

    }

    useEffect(()=> {
        api.get("/errorsandcorrections").then(response => {
            console.log(response);
            setData(response.data.errors_and_corrections)
            setLoading(false);
        }).catch(error=> {
            console.log(error);
            setError(error.message)
            setLoading(false);
        })
    }, [])

    if(error.length > 0) {
        return (
            <>
            <h3 className="text-red-700 font-semibold">Error!</h3>
            <p>{error}</p>
            </>
        );
    }

    if (loading) {
        return (
            <div className="h-48 w-48 mx-auto spinner text-center"></div>
        );
    } else {
        return (
            <>
            <div className="px-4 md:px-0">
            <h1 className="text-brand font-bold text-2xl">Erroneous Trades and Corrections</h1>
            <p>A page to see the latest erroneous trade findings and apply corrections / overwrite system applied corrections</p>
            <div className="flex flex-col mt-4">
                <div className="flex mb-2">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="exclamation-circle" className="text-red-700 mt-1 w-4 h-4 fill-current svg-inline--fa fa-exclamation-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"></path></svg>
                    <p className="ml-2">Uncorrected error in the trade</p>
                </div>
                <div className="flex">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" className="text-green-700 mt-1 w-4 h-4 fill-current svg-inline--fa fa-check-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path></svg>
                    <p className="ml-2">Corrected error in trade, either corrected by user or the system automatically</p>
                </div>
            </div>

            <section className="mt-12">
                {data.length === 0 && <p>No errors and corrections were found.</p> }
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.map((trade, idx) => (
                        <div key={idx} className="p-4 bg-white rounded shadow flex">
                            <div className="">
                                <h4 className="text-brand font-bold">{trade.id}</h4>
                                <p className="text-xs md:text-sm">Errors: {trade.errors.length}</p>
                                <p className="mb-2 text-xs md:text-sm">Corrections: {trade.correction_count}</p>
                                <Link className="px-2 py-1 rounded bg-gray-500 text-white text-xs md:text-sm" to={`/trade/${trade.id}`}>View Trade</Link>
                                {/* <button className="mt-2 px-2 py-1 rounded bg-blue-600 text-white">Ignore errors</button> */}
                            </div>

                            <div className="ml-8 pl-4 border-l-2 border-dashed border-gray-600">
                                {trade.errors.map((error, eidx)=> (
                                    <div key={eidx} className="mb-3">
                                        {/* Error found */}
                                        <div className="flex mb-2">
                                            <div className="text-green-700">
                                                {error.correction === "null" ?
                                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="exclamation-circle" className="text-red-700 mt-1 w-4 h-4 fill-current svg-inline--fa fa-exclamation-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"></path></svg>
                                                :
                                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" className="text-green-700 mt-1 w-4 h-4 fill-current svg-inline--fa fa-check-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path></svg>
                                                }
                                            </div>
                                            <div className="ml-3">
                                                <p className="font-semibold">({eidx + 1}) {prettyifyAttribute(error.erroneous_attribute)}</p>
                                                <p><span className="text-red-600">{error.erroneous_value}</span></p>

                                                {error.correction === "null" ?
                                                    <form onSubmit={(event, id)=> submitCorrection(event, error.id, error.erroneous_attribute)} action="" className="mt-1 flex">
                                                        <input className="w-12 h-6 px-1 py-1 border border-gray-600 rounded rounded-r-none" type="text" />
                                                        <input className="px-1 rounded rounded-l-none text-white bg-blue-600 font-normal text-xs" type="submit" value="Apply Correction"/>
                                                    </form>
                                                    : ""
                                                }
                                            </div>
                                        </div>

                                        {error.correction !== "null" &&
                                            <div className="flex">
                                                <div className="text-green-700 w-4">
                                                </div>
                                                <div className="ml-3">
                                                    <p>{error.correction.change_type === "USER" ? "User Correction" : "System Correction"}</p>
                                                    <p className="mb-1"><span className="text-red-600 line-through">{error.correction.old_value}</span> ->  <span className="text-green-700 font-semibold">{error.correction.new_value}</span></p>
                                                    <button onClick={()=> overwrite(error.correction.id)} className="border border-red-700 px-1 py-1 text-xs rounded">Overwrite</button>
                                                </div>
                                            </div>
                                        }

                                        <div className="mb-1 pb-2 flex border-b border-dashed border-gray-600">
                                        </div>
                                    </div>
                                ))}
                        </div>
                        </div>
                    ))}
                </div>

            </section>
            </div>
            </>
        );
    }
}