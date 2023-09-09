/*
    File: 404.jsx
    Author: Ed Park
    Copyright: 2023 - Ed Park https://edpark.space
    Version: 1.0
    Created: 9/6/2023
    Last Modified: 9/6/2023
*/

import { Link } from "react-router-dom";
import SplashSection from "../components/SplashSection";
import PropTypes from 'prop-types';

ErrorPage.propTypes = {
    isDarkMode: PropTypes.bool.isRequired,
}

export default function ErrorPage({ isDarkMode }) {
    return (
        <>
            <SplashSection splashMessage={'404! Page Not Found'} isDarkMode={isDarkMode} isErrorMode={true} />
            <section className="w-[100%] flex flex-col flex-nowrap items-center justify-center gap-7 px-mobileBound sm:px-8 sm:gap-8 md:gap-9 lg:gap-10">
                <h1 className="text-center max-w-[18em]">Oops! There seems to be an error</h1>
                <p className="text-center">Sorry. The page you are looking for does not exist.</p>
                <Link className="glassy-icon px-6" to="/">Back to Home</Link>
            </section>
        </>
    );
}