/*
    File: TechSkills.jsx
    Author: Ed Park
    Copyright: 2023 - Ed Park https://edpark.space
    Version: 1.0
    Created: 9/6/2023
    Last Modified: 9/6/2023
*/

import { techSkills } from "../constants/data";

export default function TechSkills() {
    return (
        <ul className="w-[100%] grid justify-items-center items-start justify-center gap-9 md:gap-10 grid-cols-[repeat(1,1fr)] md:grid-cols-[repeat(2,1fr)]">
            {techSkills.map((category, id) => (
                <li className="w-[100%]" key={id}>
                    <h3 className="text-center mb-4 sm:mb-5 md:mb-6 lg:mb-7 ">{category.category}</h3>
                    <ul className="grid justify-items-center items-stretch justify-center grid-cols-[repeat(auto-fit,minmax(90px,90px))] gap-7 sm:grid-cols-[repeat(auto-fit,minmax(110px,110px))] sm:gap-8 md:grid-cols-[repeat(auto-fit,minmax(125px,125px))] lg:grid-cols-[repeat(auto-fit,minmax(140px,140px))]">
                        {category.skills.map(skill => (
                            <li key={skill.title} className=" flex flex-col flex-nowrap items-center justify-center gap-5 glassy-screen w-[90px] min-h-[90px] p-4 sm:w-[110px] sm:min-h-[110px] sm:p-4 md:w-[125px] md:min-h-[125px] md:p-5 lg:w-[140px] lg:min-h-[140px] lg:p-6">
                                <skill.Icon />
                                <span className="text-center">{skill.title}</span>
                            </li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
    );
}