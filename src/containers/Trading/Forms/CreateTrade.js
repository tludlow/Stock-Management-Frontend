import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import api from "../../../api.js";
import axios from "axios";

export default function CreateTrade() {
    //Data for the auto suggested form inputs is found through the redux state of the app.
    
    const [loading, setLoading] = useState(true);
    const [companies, setCompanies] = useState([]);
    const [products, setProducts] = useState([]);
    const [currencies, setCurrencies] = useState([]);
    const [error, setError] = useState("");

    useEffect(()=> {
        getCompaniesAndCurrenciesAndProducts();
    }, []);

    const getCompaniesAndCurrenciesAndProducts = () => {
        setLoading(true);
        axios.all([
            api.get("/company/list"),
            api.get("/currency/list"),
            api.get("/product/list")
        ]).then(axios.spread((companyRes, currencyRes, productRes) => {
            console.log(companyRes, currencyRes, productRes);
            setLoading(false);
            setCompanies(companyRes.data);
            setCurrencies(currencyRes.data);

            //Set the products to also include stocks at the top, this is a viable option not from the database
            setProducts([{id: -1, name: "Stocks"}, ...productRes.data]);
            
        })).catch(err => {
            setError(err.message);
            setLoading(false);
            console.log(err);
        });

    }

    if (loading || error) {
        return (
            <>
            <div className="flex flex-col items-center md:items-start">
                <h2 className="text-brand font-bold text-xl">Create a new trade</h2>
                <p>Insert the details for a derivative manually</p>
                <hr className="my-2" />
                <p className="text-center">If you choose to have a the trade type be a stock, the buying company is the stock you are buying.</p>
            </div>
            { error && 
                <div className="">
                    <h4 className="text-red-700 font-bold text-xl">Error</h4>
                    <p>{error}</p>
                </div>
            }

            {loading && <div className="h-32 w-32 mx-auto spinner text-center"></div> }
            </>
        );
    }

    //General render
    return (
        <>
        <div className="flex flex-col items-center md:items-start">
            <h2 className="text-brand font-bold text-xl">Create a new trade</h2>
            <p>Insert the details for a derivative manually</p>
            <hr className="my-2" />
            <p className="text-center">If you choose to have a the trade type be a stock, the buying company is the stock you are buying.</p>
        </div>

        <form className="mt-8 w-11/12 p-4 mx-auto h-auto flex flex-col items-center bg-white shadow rounded-lg">
                <label className="mb-4 text-brand text-md font-semibold" htmlFor="product-dropdown">Product Type</label>
                <Autocomplete
                    id="combo-box-demo"
                    name="product-dropdown"
                    options={products}
                    getOptionLabel={option => option.name}
                    style={{ width: 300 }}
                    renderInput={params => <TextField {...params} label="Product" variant="outlined" />}
                />
                <button className="mx-auto mt-2 text-center px-3 py-2 rounded shadow bg-brand text-white uppercase font-semibold text-sm" type="submit">Create Trade</button>
        </form>
        </>
    );
}