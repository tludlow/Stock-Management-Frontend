import React, { useEffect } from 'react';

export default function Home() {
    useEffect(()=> {
        document.title = "Home - CS261 Group 23";
    });

    return (
        <h3>Home</h3>
    );
}
