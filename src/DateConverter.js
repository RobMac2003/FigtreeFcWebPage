import React from 'react';

function ReadableDate({ isoDateString }) {
    const date = new Date(isoDateString);

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        timeZone: 'Australia/Sydney', // Set timezone to AEST
    };

    const formattedDate = date.toLocaleString('en-AU', options); // Use en-AU for Australian English

    return <span title={isoDateString}>{formattedDate}</span>;
}

export default ReadableDate;
