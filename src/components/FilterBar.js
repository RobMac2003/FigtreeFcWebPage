// FilterBar.js
import React, { useState, useEffect } from 'react';
// 'https://mc-api.dribl.com/api/list/leagues?&competition=LBdDXzxdb7&sort=%2Bname'
import DisplayData from "./displayData";
import {fetchData} from "../dataFetch";
import ScrollableList from "./displayData";



//comment

/*
export let refreshInterval = 10000; // Initial value (10 seconds)

export function setFilter() {
    refreshInterval = 10000;
}
*/
const defaultSeason = 'jJmX5WkNno'; //Hi to whom ever is unfortunate enough to have to manually update this each year
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
/*
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
    const [season, setSeason] = useState('');
    const [options, setOptions] = useState([]);
    const [otherOptions, setOtherOptions] = useState([]);

    useEffect(() => {
        // Fetch data from the first API
        fetchDataAndExtractOptions('https://api.example.com/leagues')
            .then(extractedOptions => setOptions(extractedOptions));

        // Fetch data from the second API
        fetchDataAndExtractOptions('https://api.example.com/leagues2')
            .then(extractedOtherOptions => setOtherOptions(extractedOtherOptions));
    }, []);

    const filterFunction = (event) => {
        setSeason(event.target.value);
        console.log("Filter selected:", event.target.value);
    };

    const clearFilters = () => {
        setSeason('');
        console.log("Filters cleared");
    };
*/
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


    /*
        const filterFunction = (event) => {
            setSeason(event.target.value);
            console.log("Filter selected:", event.target.value);
        };
    */

    const useForceUpdate = () => {
        const [value, setValue] = useState(0); // Initial value doesn't matter
        return () => setValue(value => value + 1); // Update the state to force a re-render
    }
    const filterFunction = (event,dropDownName) => {
        const selectedVal = event.target.value;
        console.log(event.type)
        if(dropDownName === "seasons") {
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



    /*
    const filterFunction = async (event, dropDownName) => {
        refreshInterval = 1;
    };
*/
    const clearFilters = () => { //clears filters and sets the season back to the defaultSeason
        setFilters({        Season: '',
            Competition: '',League: ' '});
        setOtherOptions([]);
        setLeagueOptions([]);
        setSeason(defaultSeason);
        setCompetition('');
        setLeague('')
        const updateEvent = new CustomEvent('updateScrollableList');
        window.dispatchEvent(updateEvent); //triggers updateScrollabeList Event
        console.log("Filters cleared");
    };
    return (
        <div>
            {/* First filter bar */}
            <div className="filter-bar">
                <select value={filters.Season} onChange={(event)=>filterFunction(event, 'seasons')}>
                    <option value="">Select a season</option>
                    {options.map(option => (
                        <option key={option.id} value={option.id}>
                            {option.label}
                        </option>
                    ))}
                </select>



            {/* Second filter bar */}
                <select value={filters.Competition} onChange={(event)=>filterFunction(event, 'competitions')}>
                    <option value="">Filter by Competition</option>
                    {otherOptions.map(option => (
                        <option key={option.id} value={option.id}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {/* league filter bar */}
                <select value={filters.League} onChange={(event)=>filterFunction(event, 'leagues')}>
                    <option value="">Filter by league</option>
                    {leagueOption.map(option => (
                        <option key={option.id} value={option.id}>
                            {option.label}
                        </option>
                    ))}
                </select>

                <button onClick={clearFilters}>Clear Filters</button>



            </div>



        </div>
    );
};

export default FilterBar;



//comment5l