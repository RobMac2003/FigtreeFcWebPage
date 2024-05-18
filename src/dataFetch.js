import axios from 'axios';

import React, { useEffect, useState } from 'react';
let cache = null;
export async function fetchData(dateRange = '',season = 'jJmX5WkNno',competition = '',league = '',cursor = '',home = '',date) { //updates cache
    //if (!cache) {
        const response = await axios.get('https://mc-api.dribl.com/api/fixtures?date_range='+dateRange+'&season='+season+'&club=LBdDXyQdb7&competition='+competition+'&league='+league+'&cursor='+cursor+home+date);
        cache = response.data;
        console.log(cache);
   // }
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

