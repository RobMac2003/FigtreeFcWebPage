import React, {useState, useEffect, useRef} from 'react';
import './ScrollableList.css'
import {fetchData, getCache, makeApiCall} from "../dataFetch";
import {cache} from "../dataFetch";
//import {refreshInterval,setFilter} from "./FilterBar";
import { triggerUpdate, setTriggerUpdate } from './FilterBar';
const ScrollableList =  () => {

    const [items, setItems] = useState(null);
  //  const intervalRef = useRef(null); // null ref for interval

    useEffect(() => {
        const fetchD = async () => {
            try {
                const nitems = await fetchData();
                if (nitems && nitems.data) {
                    console.log(nitems);
                    setItems(nitems.data.slice(0,3).map(item => ({
                        text: item.attributes.name,
                        homeLogo: item.attributes.home_logo,
                        awayLogo: item.attributes.away_logo,
                        homeName: item.attributes.home_team_name,
                        awayName: item.attributes.away_team_name,
                        groundName: item.attributes.ground_name,
                        fieldName: item.attributes.field_name,
                        date: item.attributes.date,
                        imgSrc: 'path/to/image.png' // replace with actual image path
                    })));
                }
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
        console.log("hi")
        fetchD();
        //const intervalId = setInterval(fetchD, 10000); // Fetch every 10 seconds

        //return () => clearInterval(intervalId); // Cleanup on unmount

        // Clear the existing interval (if any)

       // intervalRef.current = setInterval(fetchD, refreshInterval);
        //return () => clearInterval(intervalRef.current);
        if (triggerUpdate) { // Only execute if triggerUpdate is true
            fetchD();
        }
    }, [triggerUpdate]);      // }, [refreshInterval]);


    if (!items) {
        return <div>Loading...</div>; // or some loading spinner
    }
    /*
    return (
        <div className="scrollable-list">
            {items.map((item, index) => (
                <div key={index} className="list-item">
                    <img src={item.imgSrc} alt={item.text}/>
                    <p>{item.text}</p>
                </div>
            ))}
        </div>
    );

     */
    return (
        <div className="scrollable-list">
            {items.map((item, index) => (
                <div key={index} className="list-item">
                    <div className="container">
                        <p>{item.date}</p>

                        <div className="team-info">
                            <div className="team">
                                <img src={item.homeLogo} alt={""}/>
                                {item.homeName}
                            </div>

                            <div className="score"> - </div>

                            <div className="team">
                                {item.awayName}
                                <img src={item.awayLogo} alt=""/>

                            </div>
                        </div>

                        <p>{item.groundName} {item.fieldName}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};
export default ScrollableList;
