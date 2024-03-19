import axios from 'axios';

import React, { useEffect, useState } from 'react';
let cache = null;

/*
export async function fetchData() {
    if (!cache) {
        const response = await axios.get('https://mc-api.dribl.com/api/fixtures?date_range=all&season=1pN6RepN0g');
        cache = response.data;
        console.log(cache)
    }
}


function MyComponent() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchData();
        const data = cache;
        setData(data);
    }, []);

    return (
        <div>
            {data ? JSON.stringify(data["data"]) : 'No data found'}
        </div>
    );
}
*/

export async function fetchData() { //updates cache
    if (!cache) {
        const response = await axios.get('https://mc-api.dribl.com/api/fixtures?date_range=all&season=1pN6RepN0g&club=LBdDXyQdb7');
        cache = response.data;
        console.log(cache);
    }
    console.log("in fetchdata")
    return cache;
}



function MyComponent() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchData().then(data => setData(data));
    }, []);

    return (
        <div>
            {data ? JSON.stringify(data["data"][0]) : 'No data found'}
        </div>
    );
}
export default MyComponent;


export  function getCache(){
    return cache;
}
/*
export async function makeApiCall() { //makes call to drible api returns respon
    const response = await axios.get('https://mc-api.dribl.com/api/fixtures?date_range=all&season=1pN6RepN0g');
    let data = response.data;
    console.log(data);

    return data;
}
*/
