/*
    File: Education.jsx
    Author: Ed Park
    Copyright: 2023 - Ed Park https://edpark.space
    Version: 1.0
*/

import { educations } from "../constants/data";
import DateTimeStamp from "./DateTimeStamp";

export default function Education() {
    return (
        <ul className='ml-mobileBound sm:ml-0 gap-8 sm:gap-11 w-[100%] grid grid-cols-timeline sm:grid-cols-wide-timeline auto-cols-[max-content] before:row-mobile-education-marker sm:before:row-education-marker mobile-marker-time-item sm:before:col-marker-time-item before:bg-primBlue-200'>
            {
                educations.map((education, id) => (
                    <li key={id} className='max-w-[28em] w-[100%] group row-time-item col-mobile-time-item row-mobile-time-item sm:odd:col-odd-time-item sm:even:col-even-time-item sm:[&:nth-child(2)]:row-second-time-item sm:odd:justify-self-end flex flex-col flex-nowrap'>
                        <h3 className=' w-[100%] mb-6 mt-8 px-3 py-3 glassy-screen sm:px-4 sm:py-4 md:px-6 md:py-6 relative before:absolute after:absolute after:top-[50%] after:translate-y-[-50%] after:bg-primBlue-300  after:h-3 after:z-[-1] group-odd:after:left-[-38px] group-odd:after:right-[100%] sm:group-odd:after:left-[100%] sm:group-odd:after:right-[-78px] group-even:after:left-[-38px] group-even:after:right-[100%] sm:group-even:after:left-[-78px] sm:group-even:after:right-[100%] before:w-8 before:h-8 before:bg-primBlue-300 before:top-[50%] before:translate-y-[-50%] group-odd:before:left-[-38px] group-odd:before:right-auto sm:group-odd:before:left-auto sm:group-odd:before:right-[-78px] group-even:before:left-[-38px] sm:group-even:before:left-[-78px]'>{education.degree}</h3>
                        <span>{education.school}</span>
                        <p className='italic'>
                            <DateTimeStamp date={education.startDate} /> – <DateTimeStamp date={education.endDate} />
                        </p>
                        <span>{education.location}</span>
                    </li>
                ))
            }
        </ ul>
    );
}