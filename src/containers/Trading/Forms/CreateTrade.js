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
    const [formError, setFormError] = useState("Please enter all of the trade information");

    const [sellingCompany, setSellingCompany] = useState(null);
    const [buyingCompany, setBuyingCompany] = useState(null);
    const [product, setProduct] = useState(null);
    const [underlyingCurrency, setUnderlyingCurrency] = useState(null);
    const [notionalCurrency, setNotionalCurrency] = useState(null);
    const [maturityDate, setMaturityDate] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [strikePrice, setStrikePrice] = useState(0);
    const [underlyingPrice, setUnderlyingPrice] = useState(0);

    useEffect(()=> {
        getCompaniesAndCurrenciesAndProducts();

        let interval = setInterval(() => {
            verifyForm(sellingCompany, buyingCompany, product, underlyingCurrency, notionalCurrency, maturityDate, quantity, strikePrice, underlyingPrice);
        }, 500);

        return ()=> {
            clearInterval(interval);
        }
    }, [sellingCompany, buyingCompany, product, underlyingCurrency, notionalCurrency, maturityDate, quantity, strikePrice, underlyingPrice]);

    //Gets products, companies and currencies from the backend so we can auto suggest these to the user
    const getCompaniesAndCurrenciesAndProducts = () => {
        //Dont get new data for this if we already have it
        if (companies.length !== 0 && products.length !== 0 && currencies.length !== 0) {
            return
        }
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
        verifyForm()
    }

    const onDropdownChangeCompanies = (tag, event, values) => {
        console.log(tag, values)
        if (tag === "selling-company") {
            setSellingCompany(values)

            //Check to delete the products before setting company to null, the products depend upon the selling company
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

    const onDropdownChangeCurrencies = (tag, event, values) => {
        console.log(tag, values)
        if (tag === "underlying-currency") {
            setUnderlyingCurrency(values)
        }
        if (tag === "notional-currency") {
            setNotionalCurrency(values)
        } 
    }
    
    const onDropdownChangeProduct = (event, values) => {
        console.log(event, values)
        setProduct(values)
    }
    const maturityDateChange = (event) => {
        setMaturityDate(event.target.value)
    }

    const quantityChange = (event) => {
        setQuantity(event.target.value)
    }

    const strikePriceChange = (event) => {
        setStrikePrice(event.target.value)
    }

    const underlyingPriceChange = (event) => {
        setUnderlyingPrice(event.target.value)
    }

    const verifyForm = (sellingCompany, buyingCompany, product, underlyingCurrency, notionalCurrency, maturityDate, quantity, strikePrice, underlyingPrice) => {
        if (sellingCompany === null) {
            setFormError("Please enter a selling company")
        }
        if (buyingCompany === null) {
            setFormError("Please enter a buying company")
        }
        if(buyingCompany !== null && sellingCompany != null && buyingCompany.name === sellingCompany.name) {
            setFormError("The buying and selling company should not be the same")
        }
        if(quantity < 1) {
            setFormError("The quantity should be greater than 0")
        }
        if(maturityDate === "") {
            setFormError("Please enter a maturity date")
        }
        if(product === null) {
            setFormError("Please enter a product being traded")
        }
        if(underlyingCurrency === null) {
            setFormError("Please enter an underlying currency")
        }
        if(notionalCurrency === null) {
            setFormError("Please enter a notional currency")
        }
        if(strikePrice < 0.01) {
            setFormError("Please enter a strike price")
        }
        if(underlyingPrice < 0.01) {
            setFormError("Please enter an underlying price")
        }
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
                <p className="text-red-400 text-xs uppercase italic tracking-wide">Please choose a selling company first</p>
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

            {/* Underlying Currency */}
            <div className="mb-8">
                <p className="mb-2 text-brand text-md font-semibold">Underlying Currency</p>
                <Autocomplete
                    id="underlying-currency-dropdown"
                    name="underlying-currency-dropdown"
                    options={currencies}
                    onChange={(event, values)=> onDropdownChangeCurrencies("underlying-currency", event, values)}
                    getOptionLabel={option => option.currency}
                    style={{ width: 300 }}
                    renderInput={params => <TextField {...params} label="Underlying Currency" variant="outlined" />}
                />
            </div>

            {/* Underlying Currency */}
            <div className="mb-8">
                <p className="mb-2 text-brand text-md font-semibold">Notional Currency</p>
                <Autocomplete
                    id="notional-currency-dropdown"
                    name="notional-currency-dropdown"
                    options={currencies}
                    onChange={(event, values)=> onDropdownChangeCurrencies("notional-currency", event, values)}
                    getOptionLabel={option => option.currency}
                    style={{ width: 300 }}
                    renderInput={params => <TextField {...params} label="Notional Currency" variant="outlined" />}
                />
            </div>

            {/* Quantity */}
            <div className="mb-8">
                <p className="text-brand text-md font-semibold">Quantity</p>
                <small className="mb-2">Minimum quantity is 1</small><br />
                <input onChange={quantityChange} value={quantity} min="1" className="w-64 py-4 px-6 rounded border hover:border-gray-600" type="number" name="quantity" id="quantity"/>
            </div>

            {/* Maturity Date */}
            <div className="mb-8">
                <p className="mb-2 text-brand text-md font-semibold">Maturity Date</p>
                <input onChange={maturityDateChange} min={new Date().toISOString().split('T')[0]} className="w-64 py-4 px-6 rounded border hover:border-gray-600" type="date" name="maturity-date" id="maturity-date"/>
            </div>
            
            {/* Underlying Price */}
            <div className="mb-8">
                <p className="mb-2 text-brand text-md font-semibold">Underlying Price</p>
                {underlyingCurrency === null ? <p>The current price per unit represented in the underlying currency</p> : <p>The current price per unit represented in the underlying currency:  {underlyingCurrency.currency}</p>}
                <input disabled={underlyingCurrency === null} onChange={underlyingPriceChange} min={0.01} step=".01" className="w-64 py-4 px-6 rounded border hover:border-gray-600" type="number" name="underlying-price" id="underlying-price"/>
            </div>

            {/* Stike Price */}
            <div className="mb-8">
                <p className="mb-2 text-brand text-md font-semibold">Strike Price</p>
                {underlyingCurrency === null ? <p>Strike price is represented in the underlying currency</p> : <p>Strike price is represented in the underlying currency:  {underlyingCurrency.currency}</p>}
                <input disabled={underlyingCurrency === null} onChange={strikePriceChange} min={0.01} step=".01" className="w-64 py-4 px-6 rounded border hover:border-gray-600" type="number" name="strike-price" id="strike-price"/>
            </div>
            
            {formError.length > 0 ?
                <>
                <p className="mb-4 text-red-600 font-semibold text-md">Error! {formError}</p>
                <button className="mx-auto mt-2 text-center px-3 py-2 rounded shadow bg-red-800 text-white uppercase font-semibold text-sm hover:cursor-not-allowed" type="submit"><i className="fas fa-ban"></i> Form Incomplete</button>
                </>
                :
                <button className="mx-auto mt-2 text-center px-3 py-2 rounded shadow bg-brand text-white uppercase font-semibold text-sm" type="submit">Create Trade</button>
            }


            
        </form>
        </>
    );
}