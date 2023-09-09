/*
    File: SpecialtiesList.jsx
    Author: Ed Park
    Copyright: 2023 - Ed Park https://edpark.space
    Version: 1.0
    Created: 9/6/2023
    Last Modified: 9/6/2023
*/

import { specialties } from "../constants/data";

export default function SpecialtiesList() {
    return (
        <ul className="w-[100%] grid justify-items-center items-stretch justify-center gap-8 sm:gap-9 md:gap-10 grid-cols-[repeat(auto-fit,minmax(130px,130px))] sm:grid-cols-[repeat(auto-fit,minmax(150px,150px))] md:grid-cols-[repeat(auto-fit,minmax(175px,175px))] lg:grid-cols-[repeat(auto-fit,minmax(215px,215px))]">
            {specialties.map((specialty, id) => (
                <li key={id} className=" flex flex-col flex-nowrap items-center justify-center gap-5 glassy-screen w-[130px] min-h-[130px] p-5 sm:w-[150px] sm:min-h-[150px] sm:p-4 md:w-[175px] md:min-h-[175px] md:p-5 lg:w-[215px] lg:min-h-[215px] lg:p-7">
                    <specialty.Icon />
                    <span className="text-center">{specialty.title}</span>
                </li>
            ))}
        </ul>
    );
}