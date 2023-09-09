/*
    File: date.js
    Author: Ed Park
    Copyright: 2023 - Ed Park https://edpark.space
    Version: 1.0
    Created: 9/6/2023
    Last Modified: 9/6/2023
*/

export const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export function isDateValid(date) {
    return !isNaN(date) && date instanceof Date;
}

export function formatDateForTimeTag(date) {
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${month} ${year}`;
}

export function getCopyrightYear() {
    return (new Date()).getFullYear();
}