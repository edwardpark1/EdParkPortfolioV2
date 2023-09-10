/*
    File: Home.jsx
    Author: Ed Park
    Copyright: 2023 - Ed Park https://edpark.space
    Version: 1.0
    Created: 9/6/2023
    Last Modified: 9/6/2023
*/

import { useOutletContext } from "react-router-dom";
import Socials from "../components/Socials";
import Projects from "../components/Projects";
import Testimonials from "../components/Testimonials";
import SplashSection from "../components/SplashSection";
import ContactForm from "../components/ContactForm";

export default function Home() {
    const [isDarkMode] = useOutletContext();

    return (
        <>
            <SplashSection splashMessage={'Ed Park Web Developer'} isDarkMode={isDarkMode} isErrorMode={false} />
            <section className="w-[100%] flex flex-col flex-nowrap items-center justify-center gap-7 px-mobileBound sm:px-8 sm:gap-8 md:gap-9 lg:gap-10">
                <h1 className="text-center max-w-[18em]">Solving Visions with Exceptional Web Experiences</h1>
                <p className="text-justify">Hello, and welcome! I&apos;m Ed, a web developer with a passion for solving visions through exceptional web experiences. With a blend of creativity and technical expertise, I take pride in crafting user-centric websites that leave a lasting impact. Together, let&apos;s unravel the possibilities of the digital realm and create online solutions that captivate, inspire, and drive success.</p>
            </section>
            <section className="w-[100%] flex flex-col flex-nowrap items-center justify-center gap-7 px-mobileBound sm:px-8 sm:gap-8 md:gap-9 lg:gap-10">
                <h2>My Projects</h2>
                <Projects />
            </section>
            <section className="w-[100%] flex flex-col flex-nowrap items-center justify-center gap-7 px-mobileBound sm:px-8 sm:gap-8 md:gap-9 lg:gap-10">
                <h2>Testimonials</h2>
                <Testimonials />
            </section>
            <section className="w-[100%] flex flex-col flex-nowrap items-center justify-center gap-7 px-mobileBound sm:px-8 sm:gap-8 md:gap-9 lg:gap-10">
                <h2>Contact</h2>
                <Socials />
                <p className="text-center">Are you ready to unlock your dream website? Let&apos;s chat!</p>
                <ContactForm />
            </section>
        </>
    );
}