import React, { useEffect } from 'react';

export default function Home() {
    useEffect(()=> {
        document.title = "Home - CS261 Group 23";
    });

    return (
        <>
            <div className="px-4 md:px-0">
                <h1 className="text-brand font-bold text-2xl">Home</h1> 
                <p className="">Welcome to the Group 23 Derivative Trade Manager</p>
            </div>
        </>
    );
}
