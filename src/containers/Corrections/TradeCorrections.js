import React, { useState, useEffect } from "react"

import { Link } from "react-router";

import api from "../../api";

export default function TradeCorrection(props) {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const [errorsAndCorrections, setErrrorsAndCorrections] = useState(null)

    const [recommendedCorrections, setRecommendedCorrections] = useState(null);
    const [correctionsLoading, setCorrectionsLoading] = useState(true);
    const [correctionsError, setCorrectionsError] = useState("");

    useEffect(()=> {
        api.get("/errorsandcorrections/trade=" + props.params.tradeID).then(response => {
            console.log(response)
            setErrrorsAndCorrections(response.data)
            setLoading(false)
        }).catch(error => {
            setError(error)
            setLoading(false)
            console.log(error)
        })

        //Get the recommended corrections for this trade
        api.get(`/correction/suggest/trade=${props.params.tradeID}/`).then(response => {
            console.log(response)
            setRecommendedCorrections(response.data)
            setCorrectionsLoading(false)
        }).catch(error => {
            setCorrectionsError(error.message)
            setCorrectionsLoading(false)
        });
    }, [])

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
    
    const overwrite = (correctID, tradeID, field) => {
        api.post(`/correction/delete/`, {"correctionID": correctID, "tradeID": tradeID, "field_type": field}).then(response => {
            console.log(response)
            window.location.reload();
        }).catch(error => {
            setError("Error overwriting the correction, please refresh.")
        })
    }

    const submitCorrection = (event, errorID, type, tradeID) => {
        event.preventDefault();
        console.log(event.target[0].value)
    
        api.post("/correction/apply", {"tradeID": tradeID, "errorID": errorID, "field_type": type, "new_value": event.target[0].value}).then(response => {
            console.log(response);
            window.location.reload();
        }).catch(error => {
            console.log(error)
            setError("Error when applying new correction to existing error.")
        })

    }

    const ignoreError = (eid) => {
        api.post("error/ignore", {"errorID": eid}).then(response => {
            console.log(response);
            window.location.reload();
        }).catch(error => {
            console.log(error)
            setError("Error when ignoring error.")
        })
    }

    const recommendationSubmit = (errorID, tradeID, type, value) => {
        api.post(`/correction/system`, {"errorID": errorID, "tradeID": tradeID, "field_type": type, "value": value}).then(response => {
            console.log(response)
            window.location.reload();
        }).catch(error => {
            setError("Error applying system correction.")
        })
    }


    if (error.length > 0) {
        return (
            <>
            <h3 className="text-2xl font-bold text-brand mb-4">Errors and Corrections management for trade: {props.params.tradeID}</h3>
            <h2 className="text-red-500">An error has occured!</h2>
            <p>{error}</p>
            </>
        )
    }

    if (loading) {
        return (
            <div className="h-32 w-32 mx-auto spinner text-center"></div>
        )
    }

    return (
        <div className="">
            <h3 className="text-2xl font-bold text-brand mb-4">Errors and Corrections management for trade: {props.params.tradeID}</h3>

            {errorsAndCorrections.errors_and_corrections.length === 0 ?
                <p>This trade has no errors or corrections</p>
            :
            errorsAndCorrections.errors_and_corrections.map((trade, idx) => (
                <div key={idx} className="p-4 bg-white rounded shadow flex">
                    <div className="">
                        <div className="mb-2">
                            <p>Trade ID</p>
                            <h4 className="text-brand font-bold">{trade.id}</h4>
                        </div>
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
                                        <div className="flex">
                                            <p className="font-semibold">({eidx + 1}) {prettyifyAttribute(error.erroneous_attribute)}</p>
                                            <button onClick={()=> ignoreError(error.id)} className="px-2 py-1 text-white bg-red-500 rounded ml-3">Ignore</button>
                                        </div>
                                        
                                        <p><span className="text-red-600">{error.erroneous_value}</span></p>

                                        {error.correction === "null" ?
                                            <form onSubmit={(event, id)=> submitCorrection(event, error.id, error.erroneous_attribute, trade.id)} action="" className="mt-1 flex">
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
                                            <button onClick={()=> overwrite(error.correction.id, trade.id, error.erroneous_attribute)} className="border border-red-700 px-1 py-1 text-xs rounded">Remove Correction</button>
                                        </div>
                                    </div>
                                }

                                <div className="mb-1 pb-2 flex border-b border-dashed border-gray-600">
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="ml-8 pl-4 border-l-2 border-dashed border-gray-600">
                        <h3 className="font-semibold text-green-700">Recommended System Corrections</h3>
                        <p className="mb-2">Sytstem corrections recommend the mean value of all the similar trades recently created</p>
                        
                        {correctionsLoading ?
                            <div className="h-32 w-32 mx-auto spinner text-center"></div>
                        :
                            correctionsError.length > 0 ?
                                <p>{correctionsError}</p>
                            :
                                <div className="">
                                    {errorsAndCorrections.errors_and_corrections[0].errors.map((correction, idx)=> (
                                        <div key={idx} className="mb-5">
                                           <p className="font-semibold">{prettyifyAttribute(correction.erroneous_attribute)}</p>
                                           {prettyifyAttribute(correction.erroneous_attribute) === "Quantity" &&
                                                <div className="">
                                                <p>{recommendedCorrections.quantity}</p>
                                                <button onClick={()=> recommendationSubmit(correction.id, props.params.tradeID, correction.erroneous_attribute, recommendedCorrections.quantity)} className="bg-green-700 text-white px-2 py-1 rounded">Apply</button>
                                            </div> 
                                           }
                                           {prettyifyAttribute(correction.erroneous_attribute) === "Underlying Price" &&
                                            <div className="">
                                                <p>{recommendedCorrections.underlying}</p>
                                                <button onClick={()=> recommendationSubmit(correction.id, props.params.tradeID, correction.erroneous_attribute, recommendedCorrections.underlying)} className="bg-green-700 text-white px-2 py-1 rounded">Apply</button>
                                            </div>   
                                           }
                                           {prettyifyAttribute(correction.erroneous_attribute) === "Strike Price" &&
                                                <div className="">
                                                <p>{recommendedCorrections.strike}</p>
                                                <button onClick={()=> recommendationSubmit(correction.id, props.params.tradeID, correction.erroneous_attribute, recommendedCorrections.strike)} className="bg-green-700 text-white px-2 py-1 rounded">Apply</button>
                                            </div> 
                                           }
                                        </div>
                                    ))}
                                </div>

                        }
                    </div>
                </div>
            ))}
        </div>
    )
}