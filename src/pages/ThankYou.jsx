/*
    File: ThankYou.jsx
    Author: Ed Park
    Copyright: 2023 - Ed Park https://edpark.space
    Version: 1.0
*/

import { Link, } from "react-router-dom";
import SplashSection from "../components/SplashSection";
import PropTypes from 'prop-types';

ThankYou.propTypes = {
    isDarkMode: PropTypes.bool.isRequired,
}

const mainHeading = 'Submission Received!';

export default function ThankYou({ isDarkMode }) {
    return (
        <section className="w-[100%] mt-9 sm:mt-10 md:mt-11 flex flex-col flex-nowrap items-center justify-center gap-7 px-mobileBound sm:px-8 sm:gap-8 md:gap-9 lg:gap-10">
            <SplashSection splashMessage={mainHeading} isDarkMode={isDarkMode} isErrorMode={false} />
            <h1 className="text-center max-w-[18em] overflow-hidden w-[1px] h-[1px] p-0 absolute m-[-1px] visual-hidden">{mainHeading}</h1>
            <p className="text-center">Thank you for the submission! I will get back to you shortly.</p>
            <Link className="glassy-icon px-6" to="/">Back to Home</Link>
        </section>
    );
}