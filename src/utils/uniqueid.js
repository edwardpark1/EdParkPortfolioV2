/*
    File: uniqueid.js
    Author: Ed Park
    Copyright: 2023 - Ed Park https://edpark.space
    Version: 1.0
*/

let uniqueId = 0;

export default function getUniqueId(prefix = 'id') {
    uniqueId++;
    return `${prefix}${uniqueId}`;
}