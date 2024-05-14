import React, {useState, useEffect, useRef} from 'react';
import './ScrollableList.css'
import {fetchData, getCache, makeApiCall} from "../dataFetch";
import {cache} from "../dataFetch";
//import {refreshInterval,setFilter} from "./FilterBar";
import {triggerUpdate, setTriggerUpdate, season, competition, league, cursor, defaultSeason} from './FilterBar';
const ScrollableList =  () => {

    const [items, setItems] = useState(null);
  //  const intervalRef = useRef(null); // null ref for interval

    useEffect(() => {
        const fetchD = async () => {
            try {
                let dateRange = 'all';
                if(defaultSeason == season){
                    dateRange= 'default';
                }
                const nitems = await fetchData(dateRange,season,competition,league,cursor);
                if (nitems && nitems.data) {
                    console.log(nitems);
                    setItems(nitems.data.slice(0,29).map(item => ({
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
        // Event listener



       // intervalRef.current = setInterval(fetchD, refreshInterval);
        //return () => clearInterval(intervalRef.current);
        if (triggerUpdate) { // Only execute if triggerUpdate is true
            console.log("executed")
            //fetchD("1pN6RepN0g");
        }
        //event listener
        window.addEventListener('updateScrollableList', fetchD);

        // Cleanup (remove listener when component unmounts)
        return () => window.removeEventListener('updateScrollableList', fetchD);
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
                        <div className="versus"><p>{item.homeName} vs {item.awayName}</p></div>
                        <div className ="gameInfo">
                            <table className="table">
                                <thead>{item.date}</thead>
                                <tbody className="team-info">
                                    <div className="team">
                                        <img src={item.homeLogo} alt={""}/>
                                    </div>

                                    <div className="score"> - </div>

                                    <div className="team">
                                        <img src={item.awayLogo} alt={""}/>
                                    </div>

                                    <div>{item.groundName} {item.fieldName}</div>
                                </tbody>
                            </table>
                    </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
export default ScrollableList;
