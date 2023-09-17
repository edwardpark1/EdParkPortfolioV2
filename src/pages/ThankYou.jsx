/*
    File: ThankYou.jsx
    Author: Ed Park
    Copyright: 2023 - Ed Park https://edpark.space
    Version: 1.0
*/

import { Link, } from "react-router-dom";

export default function ThankYou() {
    return (
        <section className="w-[100%] mt-9 sm:mt-10 md:mt-11 flex flex-col flex-nowrap items-center justify-center gap-7 px-mobileBound sm:px-8 sm:gap-8 md:gap-9 lg:gap-10">
            <h1 className="text-center max-w-[18em]">Submission Received!</h1>
            <p className="text-center">Thank you for the submission! I will get back to you shortly.</p>
            <Link className="glassy-icon px-6" to="/">Back to Home</Link>
        </section>
    );
}