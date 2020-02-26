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
    const [formError, setFormError] = useState("");

    const [sellingCompany, setSellingCompany] = useState(null);
    const [buyingCompany, setBuyingCompany] = useState(null);
    const [product, setProduct] = useState(null);

    useEffect(()=> {
        getCompaniesAndCurrenciesAndProducts();
    }, []);

    //Gets products, companies and currencies from the backend so we can auto suggest these to the user
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

    const onDropdownChangeCompanies = (tag, event, values) => {
        console.log(tag, values)
        setFormError("")
        if (tag === "selling-company") {
            setSellingCompany(values)
            if (values === null) {
                setSellingCompany(null)
                setProduct(null)
                return;
            }

            //Update the products to notify the user that the stocks they could be buying would be for the selling comapny
            let currentProducts = products;
            if(products.length !== 0) {
                currentProducts[0] = {id: -1, name: "Stocks (" + values.name + ")"}
                setProducts(currentProducts)
            }
        }
        if (tag === "buying-company") {
            setBuyingCompany(values)
        }
    }
    
    const onDropdownChangeProduct = (event, values) => {
        console.log(event, values)
        setProduct(values)
    }
    /**
     * VIEWS
     */

    if (loading || error) {
        return (
            <>
            <div className="flex flex-col items-center md:items-start">
                <h2 className="text-brand font-bold text-xl">Create a new trade</h2>
                <p>Insert the details for a derivative manually</p>
                <hr className="my-2" />
                <p className="text-center">
                    If you choose to have a the trade type be a stock, the buying company is the stock you are buying.
                </p>
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
            <p className="text-center">
                If you choose to have a the trade type be a stock, the buying company is the stock you are buying.
            </p>
        </div>

        <form className="mt-8 w-11/12 p-4 mx-auto h-auto flex flex-col items-center bg-white shadow rounded-lg">
            
            {/* Selling Company */}
            <div className="mb-8">
                <p className="mb-2 text-brand text-md font-semibold">Selling Company</p>
                <Autocomplete
                    id="selling-company-dropdown"
                    name="selling-company-dropdown"
                    options={companies}
                    onChange={(event, values)=> onDropdownChangeCompanies("selling-company", event, values)}
                    getOptionLabel={option => option.name}
                    style={{ width: 300 }}
                    renderInput={params => <TextField {...params} label="Selling Company" variant="outlined" />}
                />
            </div>

            {/* Buying party */}
            <div className="mb-8">
                <p className="mb-2 text-brand text-md font-semibold">Buying Company</p>
                <Autocomplete
                    id="buying-company-dropdown"
                    name="buying-company-dropdown"
                    options={companies}
                    onChange={(event, values)=> onDropdownChangeCompanies("buying-company", event, values)}
                    getOptionLabel={option => option.name}
                    style={{ width: 300 }}
                    renderInput={params => <TextField {...params} label="Buying Company" variant="outlined" />}
                />
            </div>
            
            {/* Product being traded */}
            <div className="mb-8">
                <p className="mb-2 text-brand text-md font-semibold">Product Type</p>

                {sellingCompany === null ?
                <>
                <p className="text-red-500 text-xs uppercase font-semibold tracking-wide">Please choose a selling company first</p>
                <Autocomplete
                    id="product-dropdown"
                    name="product-dropdown"
                    options={products}
                    onChange={onDropdownChangeProduct}
                    getOptionLabel={option => option.name}
                    disabled
                    style={{ width: 300 }}
                    renderInput={params => <TextField {...params} label="Product" variant="outlined" />}
                />
                </>
                :
                <Autocomplete
                    id="product-dropdown"
                    name="product-dropdown"
                    options={products}
                    onChange={onDropdownChangeProduct}
                    getOptionLabel={option => option.name}
                    style={{ width: 300 }}
                    renderInput={params => <TextField {...params} label="Product" variant="outlined" />}
                />
                }
                
            </div>
            
            {formError.length > 0 && <p className="mb-4 text-red-600 font-semibold text-md">Error! {formError}</p>}
            <button className="mx-auto mt-2 text-center px-3 py-2 rounded shadow bg-brand text-white uppercase font-semibold text-sm" type="submit">Create Trade</button>
        </form>
        </>
    );
}