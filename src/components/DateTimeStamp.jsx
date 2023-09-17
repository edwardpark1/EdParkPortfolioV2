/*
    File: DateTimeStamp.jsx
    Author: Ed Park
    Copyright: 2023 - Ed Park https://edpark.space
    Version: 1.0
*/

import PropTypes from 'prop-types';
import {
    isDateValid,
    formatDateForTimeTag
} from '../utils/date';

DateTimeStamp.propTypes = {
    date: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date)
    ]).isRequired,
}

export default function DateTimeStamp({ date }) {
    if (isDateValid(date)) {
        return (
            <time dateTime={date.toISOString().substr(0, 7)}>{formatDateForTimeTag(date)}</time>
        );
    }

    return (
        <span>{date}</span>
    );
}