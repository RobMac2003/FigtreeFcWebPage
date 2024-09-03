import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { enGB } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns'; // Import the format function
export let date = "";
function CustomDatePicker() {
    const [selectedDate, setSelectedDate] = useState(null);

    const dateOptions = [
        new Date(),
        new Date(new Date().setDate(new Date().getDate() + 1)), // Tomorrow
        new Date(new Date().setDate(new Date().getDate() + 7)), // Next week
    ];

    const CustomInput = ({ value, onClick }) => (
        <button className="btn btn-primary" onClick={onClick}>
            {value || 'Select a date'}
        </button>
    );

    // Add a window event listener to reset the selected date
    useEffect(() => {
        const resetDate = () => {
            setSelectedDate(null);
            date = ""; // Reset the date variable to null
        };
        window.addEventListener('resize', resetDate);

        // Clean up the event listener when the component is unmounted
        return () => {
            window.removeEventListener('resize', resetDate);
        };
    }, []); // Empty dependency array ensures this runs once on mount and cleanup on unmount
    let dateInFormat = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : null
    if(dateInFormat != null){
        date = dateInFormat;
        console.log("selected date =", dateInFormat);
        const updateEvent = new CustomEvent('updateScrollableList');
        window.dispatchEvent(updateEvent); //triggers updateScrollabeList Event
    }

    return (
        <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            customInput={<CustomInput />}
            dateFormat="yyyy-MM-dd"
            withPortal
            popperPlacement="bottom-start"
            minDate={new Date(2023, 0, 1)} // January 1, 2023
            maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))} // One year from today
        />
    );
}

export default CustomDatePicker;


