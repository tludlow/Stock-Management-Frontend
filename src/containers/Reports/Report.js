import React from 'react';
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFDocument from "./PDFDocument";
import moment from "moment";

export default function Report(props) {
    let date = moment(props.params.reportDate, "YYYY-MM-DD").format("dddd, MMMM Do YYYY")

    let reportData = {
        date: props.params.reportDate,
        newTradeCount: 23,
        editedTradeCount: 71,
        deletedTradeCount: 3,
        erroneousTradeCount: 13,
        userCorrectionsCount: 41,
        systemCorrectionsCount: 101,
    };

    return (
        <div className="p-4" id="report-page">
                <div className="">
                    <div className="flex flex-col md:flex-row justify-between">
                        <h2 className="text-brand font-bold text-2xl">{date}</h2>
                        <PDFDownloadLink
                                document={<PDFDocument data={reportData}/>}
                                fileName={`report-${reportData.date}.pdf`}
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
                    <p>Trading Summary (Click on a section title to jump to that section)</p>
                    <div className="mt-3">
                        <ul className="flex flex-col md:flex-row justify-between">
                            <li className="mt-2"><a className="px-4 py-1 bg-brand text-white rounded-full" href="#new-trades">New Trades: <span>{reportData.newTradeCount}</span></a></li>
                            <li className="mt-2"><a className="px-4 py-1 bg-brand text-white rounded-full" href="#edited-trades">Edited Trades: <span>{reportData.editedTradeCount}</span></a></li>
                            <li className="mt-2"><a className="px-4 py-1 bg-brand text-white rounded-full" href="#deleted-trades">Deleted Trades: <span>{reportData.deletedTradeCount}</span></a></li>
                            <li className="mt-2"><a className="px-4 py-1 bg-brand text-white rounded-full" href="#erroneous-trades">Erroneous Trades: <span>{reportData.erroneousTradeCount}</span></a></li>
                            <li className="mt-2"><a className="px-4 py-1 bg-brand text-white rounded-full" href="#user-corrected-trades">User Corrected Trades: <span>{reportData.userCorrectionsCount}</span></a></li>
                            <li className="mt-2"><a className="px-4 py-1 bg-brand text-white rounded-full" href="#system-corrected-trades">System Corrected Trades: <span>{reportData.systemCorrectionsCount}</span></a></li>
                        </ul>
                    </div>
                </div>
            

                <section className="mt-12" id="new-trades">
                    <h3 className="text-brand font-semibold text-lg">New Trades</h3>
                    <p>New trades created on this day</p>
                </section>
                
                <section className="mt-12" id="edited-trades">
                    <h3 className="text-brand font-semibold text-lg">Edited Trades</h3>
                    <p>Trades which the user has edited on this day, with a description of each edit</p>
                </section>

                <section className="mt-12" id="deleted-trades">
                    <h3 className="text-brand font-semibold text-lg">Deleted Trades</h3>
                    <p>Trades which a user has deleted on this daye</p>
                </section>

                <section className="mt-12" id="erroneous-trades">
                    <h3 className="text-brand font-semibold text-lg">Erroneous Trades</h3>
                    <p>Trades identified to have erroneous data</p>
                </section>

                <section className="mt-12" id="user-corrected-trades">
                    <h3 className="text-brand font-semibold text-lg">User Corrections</h3>
                    <p>Trades which have bheen identified to be erroneous by the system and the user has edited them</p>
                </section>

                <section className="mt-12" id="system-corrected-trades">
                    <h3 className="text-brand font-semibold text-lg">System Corrections</h3>
                    <p>Trades which have erroneous data which the system has identified and corrected automatically</p>
                </section>
        </div>
    );
}