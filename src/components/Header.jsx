/*
    File: Header.jsx
    Author: Ed Park
    Copyright: 2023 - Ed Park https://edpark.space
    Version: 1.0
    Created: 9/6/2023
    Last Modified: 9/6/2023
*/

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import HeaderLogo from './HeaderLogo';

Header.propTypes = {
    isDarkMode: PropTypes.bool.isRequired,
    toggleDarkMode: PropTypes.func.isRequired,
};

export default function Header({ isDarkMode, toggleDarkMode }) {
    return (
        <header className="flex flex-row flex-wrap justify-between items-center gap-6 px-mobileBound pt-6 pb-4">
            <Link to="/">
                <HeaderLogo isDarkMode={isDarkMode} />
            </Link>
            <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        </header>
    );
}