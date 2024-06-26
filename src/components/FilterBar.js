import React, { useState, useEffect } from 'react';
import './filterBar.css';
import DisplayData from "./displayData";
import {fetchData} from "../dataFetch";
import ScrollableList from "./displayData";
import {getCache} from "../dataFetch";
import CustomDatePicker from "./datePicker"

export const defaultSeason = 'jJmX5WkNno'; //Hi to whom ever is unfortunate enough to have to manually update this each year
                                            //changing this will change the default season that the fixtures show :)
export let triggerUpdate = false;

export const setTriggerUpdate = (newValue) => {
    triggerUpdate = newValue;
};

export let season = defaultSeason;

export const setSeason = (newValue) => {
    season = newValue;
};

export let competition = '';

export const setCompetition= (newValue) => {
    competition = newValue;
};

export let league = '';

export const setLeague = (newValue) => {
    league = newValue;
};

export let cursor = '';

export let home = '';

export const setHome = (newValue) => {
    home = newValue;
};
export const setCursor = (newValue) => {
    cursor = newValue;
};
const fetchDataAndExtractOptions = async (apiUrl) => {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.data.map(item => ({
            id: item.id,
            label: item.title
        }));
    } catch (error) {
        console.error('Error fetching data:', error);
        return []; // Return an empty array in case of an error
    }
};
const FilterBar = () => {
    //const [season, setSeason] = useState('');
    const [filters, setFilters] = useState({
        Season: '',
        Competition: '',
        League: ''
    });
    const [options, setOptions] = useState([]);
    const [otherOptions, setOtherOptions] = useState([]);
    const [leagueOption, setLeagueOptions] = useState([]);

    useEffect(() => {
        // Fetch data from the first API //change tenant you can get it from api, without tenant data is different for some reason
        fetchDataAndExtractOptions('https://mc-api.dribl.com/api/list/seasons?disable_paging=true&tenant=kbam1p6dwX')
            .then(extractedOptions => setOptions(extractedOptions));

        // Fetch data from the second API based on the selected season
        if (filters.Season) {
            const apiUrlForOtherOptions = `https://mc-api.dribl.com/api/list/competitions?disable_paging=true&tenant=kbam1p6dwX&season=${filters.Season}`;
            fetchDataAndExtractOptions(apiUrlForOtherOptions)
                .then(extractedOtherOptions => setOtherOptions(extractedOtherOptions));
        }
        // Fetch data from the league API based on the selected competition
        if (filters.Competition) {
            const apiUrlForLeague = `https://mc-api.dribl.com/api/list/leagues?disable_paging=true&tenant=kbam1p6dwX&competition=${filters.Competition}&sort=%2Bname`;
            fetchDataAndExtractOptions(apiUrlForLeague)
                .then(extractedLeagueOptions => setLeagueOptions(extractedLeagueOptions));
        }
    }, [filters.Season]); // Trigger the effect whenever the selected season changes

    useEffect(() => {

        // Fetch data from the league API based on the selected competition
        if (filters.Competition) {
            const apiUrlForLeague = `https://mc-api.dribl.com/api/list/leagues?disable_paging=true&tenant=kbam1p6dwX&competition=${filters.Competition}&sort=%2Bname`;
            fetchDataAndExtractOptions(apiUrlForLeague)
                .then(extractedLeagueOptions => setLeagueOptions(extractedLeagueOptions));
        }
    }, [filters.Competition]); // Trigger the effect whenever the selected season changes

    const useForceUpdate = () => {
        const [value, setValue] = useState(0); // Initial value doesn't matter
        return () => setValue(value => value + 1); // Update the state to force a re-render
    }
    const filterFunction = (event,dropDownName) => {
        const selectedVal = event.target.value;
        console.log(event.type)

        if(dropDownName === "seasons") {
            /*
            if(home == '&ground=8zdBGL3DmB'&& season == '1pN6RepN0g'){
                setHome('&ground=3pmvQW05dv');
                console.log('happening');
            }
            *
             */
            console.log('hi', season);
            setFilters({...filters, Season: selectedVal});
            setSeason(selectedVal);
            setCompetition('');
            setLeague('')
        }
        else if(dropDownName === "competitions") {
            setFilters({...filters, Competition: selectedVal});
            setCompetition(selectedVal);
            setLeague('')
        }
        else if(dropDownName === "leagues") {
            setFilters({...filters, League: selectedVal});
            setLeague(selectedVal)
        }
        console.log("Filter selected:", selectedVal);

        console.log(season)
        const updateEvent = new CustomEvent('updateScrollableList');
        window.dispatchEvent(updateEvent); //triggers updateScrollabeList Event

    };

    const clearFilters = () => { //clears filters and sets the season back to the defaultSeason
        setFilters({        Season: '',
            Competition: '',League: ' '});
        setOtherOptions([]);
        setLeagueOptions([]);
        setSeason(defaultSeason);
        setCompetition('');
        setLeague('');
        setCursor('');
        setHome('');
        //reseting Date Picker component
        const resetEvent = new Event('resize');
        window.dispatchEvent(resetEvent);
        //reseting displayData
        const updateEvent = new CustomEvent('updateScrollableList');
        window.dispatchEvent(updateEvent); //triggers updateScrollabeList Event
        console.log("Filters cleared");
    };

    const nextPage = () => { //gets cursor for next page set it to cursor variable and calls updateScrollableList event
        cursor = getCache().meta.next_cursor;
        const updateEvent = new CustomEvent('updateScrollableList');
        window.dispatchEvent(updateEvent); //triggers updateScrollableList Event
    };

    const prevPage = () => { // works the same
        cursor = getCache().meta.prev_cursor;
        const updateEvent = new CustomEvent('updateScrollableList');
        window.dispatchEvent(updateEvent); //triggers updateScrollableList Event
    };

    const homeFixtures = () => { // filter by the home games

       // if(season == '1pN6RepN0g'){
            //home = '&ground=3pmvQW05dv';
      //  }//else {
           home = '&ground=8zdBGL3DmB';
       // }
        console.log(season);
        const updateEvent = new CustomEvent('updateScrollableList');
        window.dispatchEvent(updateEvent); //triggers updateScrollableList Event
    };

    {
    return(
            <div className="filter-wrapper">
                <span className="filter-title"></span>
                <div className="filter-bar">
                    <div className="filter-container">
                        <label className="filter-label">Filter by Season</label>
                        <select value={filters.Season} onChange={(event) => filterFunction(event, 'seasons')} className="filter-select">
                            <option value="">Select a season</option>
                            {options.map(option => (
                                <option key={option.id} value={option.id}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-container">
                        <label className="filter-label">Filter by Competition</label>
                        <select value={filters.Competition} onChange={(event) => filterFunction(event, 'competitions')} className="filter-select">
                            <option value="">Filter by Competition</option>
                            {otherOptions.map(option => (
                                <option key={option.id} value={option.id}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-container">
                        <label className="filter-label">Filter by League</label>
                        <select value={filters.League} onChange={(event) => filterFunction(event, 'leagues')} className="filter-select">
                            <option value="">Filter by League</option>
                            {leagueOption.map(option => (
                                <option key={option.id} value={option.id}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button onClick={homeFixtures} className="filter-button">Home Games Only</button>
                    <button onClick={clearFilters} className="filter-button">Clear Filters</button>
                    <button onClick={prevPage} className="filter-button">Previous Page</button>
                    <button onClick={nextPage} className="filter-button">Next Page</button>
                </div>
            </div>
        );
    }





};

export default FilterBar;



//comment5l