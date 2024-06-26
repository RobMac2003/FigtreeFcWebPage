import React, {useState, useEffect, useRef} from 'react';
import './ScrollableList.css'
import {fetchData, getCache, makeApiCall} from "../dataFetch";
import {cache} from "../dataFetch";
import {triggerUpdate, setTriggerUpdate, season, competition, league, cursor, defaultSeason, home} from './FilterBar';
import {date} from './datePicker';
import ReadableDate from "../DateConverter";

const ScrollableList =  () => {

    const [items, setItems] = useState(null);

    useEffect(() => {
        const fetchD = async () => {
            try {
                let dateRange = 'all';
                if(defaultSeason == season){
                    dateRange= 'default';
                }
                let freshDate = ''
                if(date != ''){ //if user has selected a date
                    dateRange= 'single-date';
                    freshDate= '&date[]=' +date;
                }
                const nitems = await fetchData(dateRange,season,competition,league,cursor,home,freshDate);
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
                        homeScore: item.attributes.home_score,
                        awayScore: item.attributes.away_score,
                        imgSrc: 'path/to/image.png' // replace with actual image path

                    })));
                }
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
        console.log("hi")
        fetchD();

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

    return (
        <div className="scrollable-list">
            {items.map((item, index) => (
                <div key={index} className="list-item">
                    <div className="container">
                        <div className="versus"><p>{item.homeName} vs {item.awayName}</p></div>
                        <div className ="gameInfo">
                            <table className="table">
                                <tbody className="team-info">
                                <div className="dateAndTime"><ReadableDate isoDateString={item.date} /></div>
                                    <div className="team">
                                        <img src={item.homeLogo} alt={""}/>
                                    </div>

                                    <div className="score">{item.homeScore} - {item.awayScore}</div>

                                    <div className="team">
                                        <img src={item.awayLogo} alt={""}/>
                                    </div>

                                    <div className="groundInfo" >{item.groundName} {item.fieldName}</div>
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
