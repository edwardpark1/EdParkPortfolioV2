/*
    File: DateRange.jsx
    Author: Ed Park
    Copyright: 2023 - Ed Park https://edpark.space
    Version: 1.0
    Created: 9/6/2023
    Last Modified: 9/6/2023
*/

import PropTypes from 'prop-types';
import DateTimeStamp from './DateTimeStamp';

DateRange.propTypes = {
    startDate: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date)
    ]).isRequired,
    endDate: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date)
    ]).isRequired,
}

export default function DateRange({ startDate, endDate }) {
    return (
        <p className='w-[100%] text-center'>
            <DateTimeStamp date={startDate} /> – <DateTimeStamp date={endDate} />
        </p>
    );
}