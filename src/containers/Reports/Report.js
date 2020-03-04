import React, { useState, useEffect } from 'react';
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFDocument from "./PDFDocument";
import moment from "moment";
import { Link } from "react-router";

import api from "../../api"

export default function Report(props) {
    let date = moment(props.params.reportDate, "YYYY-MM-DD").format("dddd, MMMM Do YYYY")

    let year = props.params.reportDate.split("-")[0]
    let month = props.params.reportDate.split("-")[1]
    let day = props.params.reportDate.split("-")[2]

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [reportData, setReportData] = useState(null)

    useEffect(()=> {
        document.title = `CS261 - Report: ${year}-${month}-${day}`
        api.get(`/report/year=${year}&month=${month}&day=${day}/`).then(response => {
            if(response.status === 400) {
                setError("A report for this date doesnt exist")
                setLoading(false)
            } else {
                setReportData(response.data)
                setLoading(false)
            }
        }).catch(error => { 
            setError(error.message)
            setLoading(false)
            console.log(error)

        })
    }, [])

    const prettyifyAttribute = (name) => {
        switch (name) {
            case 'underlying_price':
                return "Underlying Price"
                break;
            case 'strike_price':
                return "Strike Price"
                break;
            case 'quantity':
                return "Quantity"
                break;
            case 'maturity_date':
                return "Maturity Date"
                break;
        
            default:
                break;
        }
    }

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
            <div className="p-4" id="report-page">
                    <div className="">
                        <div className="flex flex-col md:flex-row justify-between">
                            <h2 className="text-brand font-bold text-2xl">{date}</h2>
                            <PDFDownloadLink
                                    document={<PDFDocument data={reportData}/>}
                                    fileName={`report-${year + "-" + month + "-" + day}.pdf`}
                                    style={{
                                        textDecoration: "none",
                                        padding: "10px",
                                        borderRadius: "4px",
                                        color: "white",
                                        backgroundColor: "#4a5568"
                                    }}>
                                    {({ blob, url, loading, error }) =>
                                    loading ? "Loading PDF..." : "Download PDF"
                                    }
                            </PDFDownloadLink>
                        </div>
                        <p className="mt-4 md:mt-0">Trading Summary (Click on a section title to jump to that section)</p>
                        <div className="mt-3">
                            <ul className="flex flex-col md:flex-row">
                                <li className="mt-2 mr-6"><a className="px-4 py-1 bg-brand text-white rounded-full" href="#new-trades">New Trades: <span>{reportData.num_of_new_trades}</span></a></li>
                                <li className="mt-2 mr-6"><a className="px-4 py-1 bg-brand text-white rounded-full" href="#edited-trades">Edited Trades: <span>{reportData.num_of_edited_trades}</span></a></li>
                                <li className="mt-2 mr-6"><a className="px-4 py-1 bg-brand text-white rounded-full" href="#deleted-trades">Deleted Trades: <span>{reportData.num_of_deleted_trades}</span></a></li>
                            </ul>
                        </div>
                    </div>
                
    
                    <section className="mt-12" id="new-trades">
                        <h3 className="text-brand font-semibold text-lg">New Trades</h3>
                        <p>Trades created today</p>
                        
                        {reportData.num_of_new_trades > 0 &&
                        <div className="mt-3">
                            <table className="table-fixed rounded shadow">
                                <thead>
                                    <tr>
                                        <th className="w-1/12 px-4 py-2">ID</th>
                                        <th className="w-1/12 px-4 py-2">Buying Party</th>
                                        <th className="w-1/12 px-4 py-2">Selling Party</th>
                                        <th className="w-1-12 px-4 py-2">Product</th>
                                        <th className="w-1-12 px-4 py-2">Quantity</th>
                                        <th className="w-1-12 px-4 py-2">Underlying Price</th>
                                        <th className="w-1-12 px-4 py-2">Strike Price</th>
                                        <th className="w-1-12 px-4 py-2">Currencies <small className="text-xs font-normal">(Underlying) | (Notional)</small></th>
                                        <th className="w-1-12 px-4 py-2">Maturity Date</th>
                                        <th className="w-1/12 px-4 py-2">Created</th>
                                        <th className="w-1/12 px-4 py-2">Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {reportData.created_trades.map((created_trade, index)=> (
                                        <tr className="bg-white" key={index}>
                                            <td className="border px-4 py-2 text-center">{created_trade.id}</td>
                                            <td className="border px-4 py-2 text-center">{created_trade.buying_party}</td>
                                            <td className="border px-4 py-2 text-center">{created_trade.selling_party}</td>
                                            <td className="border px-4 py-2 text-center">{created_trade.product}</td>
                                            <td className="border px-4 py-2 text-center">{created_trade.underlying_price}</td>
                                            <td className="border px-4 py-2 text-center">{created_trade.quantity}</td>
                                            <td className="border px-4 py-2 text-center">{created_trade.strike_price}</td>
                                            <td className="border px-4 py-2 text-center">{created_trade.underlying_currency} | {created_trade.notional_currency}</td>
                                            <td className="border px-4 py-2 text-center">{created_trade.maturity_date}</td>
                                            <td className="border px-4 py-2 text-center">{moment(created_trade.date).fromNow()}</td>
                                            <td className="border px-4 py-2">
                                                <Link className="mr-3 px-2 py-1 bg-blue-700 text-white rounded" to={`/trading/edit-trade/${created_trade.id}`}>Edit</Link>
                                                <Link className="ml-3 px-2 py-1 bg-red-700 text-white rounded" to={`/trading/delete-trade/${created_trade.id}`}>Delete</Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        }           
                    </section>
                    
                    <section className="mt-12" id="edited-trades">
                        <h3 className="text-brand font-semibold text-lg">Edited Trades</h3>
                        <p>Trades which the user has edited on this day, with a description of each edit</p>

                        <div className="mt-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {reportData.edited_trades.map((edited_trade, index)=> (
                                    <div className="bg-white rounded shadow p-4 mb-3 flex justify-around" key={index}>
                                        <div className="">
                                            <h5 className="text-brand font-bold">{edited_trade.trade.id}</h5>
                                            <p className="mb-2">Edits: {edited_trade.num_of_edits}</p>
                                            <Link className="px-3 py-1 rounded bg-gray-500 text-white" to={`/trade/${edited_trade.trade.id}`}>View</Link>
                                        </div>
                                        <div className="pl-4 border-l-2 border-dashed border-gray-600">
                                            {edited_trade.edits.map((edit, idx)=> (
                                                <div className="mb-2" key={idx}>
                                                    <p>({idx+1}) {prettyifyAttribute(edit.attribute_edited)}</p>
                                                    <p><span className="text-red-600 line-through">{edit.old_value}</span> ->  <span className="text-green-700 font-semibold">{edit.new_value}</span></p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
    
                    <section className="mt-12" id="deleted-trades">
                        <h3 className="text-brand font-semibold text-lg">Deleted Trades</h3>
                        <p>Trades which a user has deleted on this daye</p>

                        {reportData.num_of_deleted_trades > 0 &&
                        <div className="mt-3">
                            <table className="table-fixed rounded shadow">
                                <thead>
                                    <tr>
                                        <th className="w-1/12 px-4 py-2">ID</th>
                                        <th className="w-1/12 px-4 py-2">Buying Party</th>
                                        <th className="w-1/12 px-4 py-2">Selling Party</th>
                                        <th className="w-1-12 px-4 py-2">Product</th>
                                        <th className="w-1-12 px-4 py-2">Quantity</th>
                                        <th className="w-1-12 px-4 py-2">Underlying Price</th>
                                        <th className="w-1-12 px-4 py-2">Strike Price</th>
                                        <th className="w-1-12 px-4 py-2">Currencies <small className="text-xs font-normal">(Underlying) | (Notional)</small></th>
                                        <th className="w-1-12 px-4 py-2">Maturity Date</th>
                                        <th className="w-1/12 px-4 py-2">Created</th>
                                        <th className="w-1/12 px-4 py-2">Deleted At</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {reportData.deleted_trades.map((deleted_trade, index)=> (
                                        <tr key={index} className="bg-white">
                                            <td className="border px-4 py-2 text-center">{deleted_trade.trade.id}</td>
                                            <td className="border px-4 py-2 text-center">{deleted_trade.trade.buying_party}</td>
                                            <td className="border px-4 py-2 text-center">{deleted_trade.trade.selling_party}</td>
                                            <td className="border px-4 py-2 text-center">{deleted_trade.trade.product}</td>
                                            <td className="border px-4 py-2 text-center">{deleted_trade.trade.underlying_price}</td>
                                            <td className="border px-4 py-2 text-center">{deleted_trade.trade.quantity}</td>
                                            <td className="border px-4 py-2 text-center">{deleted_trade.trade.strike_price}</td>
                                            <td className="border px-4 py-2 text-center">{deleted_trade.trade.underlying_currency} | {deleted_trade.trade.notional_currency}</td>
                                            <td className="border px-4 py-2 text-center">{deleted_trade.trade.maturity_date}</td>
                                            <td className="border px-4 py-2 text-center">{moment(deleted_trade.trade.date).fromNow()}</td>
                                            <td className="border px-4 py-2 text-center">{moment(deleted_trade.deletion[0].deleted_at).fromNow()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        
                        }
                    </section>
            </div>
        );
    }

}