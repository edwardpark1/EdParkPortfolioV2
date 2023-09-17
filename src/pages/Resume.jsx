/*
    File: Resume.jsx
    Author: Ed Park
    Copyright: 2023 - Ed Park https://edpark.space
    Version: 1.0
*/

import Socials from "../components/Socials";
import TechSkills from "../components/TechSkills";
import SoftSkills from "../components/SoftSkills";
import Experience from "../components/Experience";
import Education from "../components/Education";
import {
    workExp,
    extracurriculars,
} from "../constants/data";

export default function Resume() {
    return (
        <>
            <section className="w-[100%] mt-9 sm:mt-10 md:mt-11 flex flex-col flex-nowrap items-center justify-center gap-7 px-mobileBound sm:px-8 sm:gap-8 md:gap-9 lg:gap-10">
                <h1 className="text-center max-w-[18em]">Resume</h1>
                <p className="text-center">If you wish to have a copy of my resume, please click below.</p>
                <a href="/assets/Ed-Park-Resume.pdf" target="_blank" rel="noopener noreferrer" className="glassy-icon px-6">View Resume (PDF)</a>
                <div className="mt-mobileBound sm:mt-6 md:mt-7 lg:mt-8 w-[100%] glassy-screen flex flex-col flex-nowrap items-center justify-center gap-7 p-7 sm:p-8 sm:gap-8 md:p-9 md:gap-9 lg:p-10 lg:gap-10">
                    <span className="text-center font-bold text-4 sm:text-3 md:text-2 lg:text-1">Ed Park</span>
                    <span className="text-center font-bold text-6 sm:text-5 md:text-4 lg:text-3">Full-Stack Software Engineer</span>
                    <address className="italic flex flex-row flex-wrap gap-8 justify-center items-center">
                        <span>Rochester, NY</span>
                    </address>
                    <Socials />
                </div>
            </section>
            <section className="w-[100%] flex flex-col flex-nowrap items-center justify-center gap-7 px-mobileBound sm:px-8 sm:gap-8 md:gap-9 lg:gap-10">
                <h2>Professional Experience</h2>
                <Experience experience={workExp} isSequential={true} />
            </section>
            <section className="w-[100%] flex flex-col flex-nowrap items-center justify-center gap-7 px-mobileBound sm:px-8 sm:gap-8 md:gap-9 lg:gap-10">
                <h2>Soft Skills</h2>
                <SoftSkills />
            </section>
            <section className="w-[100%] flex flex-col flex-nowrap items-center justify-center gap-7 px-mobileBound sm:px-8 sm:gap-8 md:gap-9 lg:gap-10">
                <h2>Technical Skills</h2>
                <TechSkills />
            </section>
            <section className="w-[100%] flex flex-col flex-nowrap items-center justify-center gap-7 px-mobileBound sm:px-8 sm:gap-8 md:gap-9 lg:gap-10">
                <h2>Organizations</h2>
                <Experience experience={extracurriculars} isSequential={false} />
            </section>
            <section className="w-[100%] flex flex-col flex-nowrap items-center justify-center gap-7 px-mobileBound sm:px-8 sm:gap-8 md:gap-9 lg:gap-10">
                <h2>Education</h2>
                <Education />
            </section>
        </>
    );
}