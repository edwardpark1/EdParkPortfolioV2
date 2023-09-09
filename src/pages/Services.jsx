/*
    File: Services.jsx
    Author: Ed Park
    Copyright: 2023 - Ed Park https://edpark.space
    Version: 1.0
    Created: 9/6/2023
    Last Modified: 9/6/2023
*/

import { Link } from 'react-router-dom';
import {
    generalServices,
} from '../constants/data';
import ServiceList from '../components/ServiceList';
import SpecialtiesList from '../components/SpecialtiesList';

export default function Services() {
    return (
        <>
            <h1 className="mt-9 sm:mt-10 md:mt-11 text-center max-w-[18em]">Services</h1>
            <section className="w-[100%] flex flex-col flex-nowrap items-center justify-center gap-7 px-mobileBound sm:px-8 sm:gap-8 md:gap-9 lg:gap-10">
                <h2 className='text-center'>How Can I Help You?</h2>
                <ServiceList services={generalServices} />
            </section>
            <section className="w-[100%] flex flex-col flex-nowrap items-center justify-center gap-7 px-mobileBound sm:px-8 sm:gap-8 md:gap-9 lg:gap-10">
                <h2 className='text-center'>My Specialties</h2>
                <SpecialtiesList />
            </section>
            <div className="w-[100%] flex flex-col flex-nowrap items-center justify-center gap-7 px-mobileBound sm:px-8 sm:gap-8 md:gap-9 lg:gap-10">
                <p className="text-justify mx-auto sm:mt-5 lg:mt-6">If you&apos;re interested in exploring a comprehensive list of my skills and experience, I invite you to check out my <Link className="inline-link" to="/resume">resume</Link>.</p>
            </div>
        </>
    );
}