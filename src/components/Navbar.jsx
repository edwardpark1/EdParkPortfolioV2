/*
    File: Navbar.jsx
    Author: Ed Park
    Copyright: 2023 - Ed Park https://edpark.space
    Version: 1.0
*/

import PropTypes from 'prop-types';
import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { NavLink } from "react-router-dom";
import { navMenu } from "../constants/data";
import Socials from "./Socials";
import {
    MenuIcon,
    CloseIcon,
    SunIcon,
    MoonIcon,
    ShareIcon,
} from "./Icons";

Navbar.propTypes = {
    isDarkMode: PropTypes.bool.isRequired,
    toggleDarkMode: PropTypes.func.isRequired,
};

export default function Navbar({ isDarkMode, toggleDarkMode }) {
    const initialIsMobileWidth = getIsMobileWidth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSocialOpen, setIsSocialOpen] = useState(false);
    const [isMobileWidth, setIsMobileWidth] = useState(initialIsMobileWidth);
    const refIsMobileWidth = useRef(initialIsMobileWidth);

    const toggleMenuState = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenuState = () => {
        setIsMenuOpen(false);
    };

    const toggleSocialState = () => {
        setIsSocialOpen(!isSocialOpen);
    };

    function getIsMobileWidth() {
        return window.innerWidth < 600;
    }

    useLayoutEffect(() => {
        const updateIsMobileWidth = () => {
            const isMobile = getIsMobileWidth();
            setIsMobileWidth(isMobile);
            refIsMobileWidth.current = isMobile;
        };

        const closeMobileOnDesktop = () => {
            if (!refIsMobileWidth.current) {
                closeMenuState();
            }
        };

        const closeMobileOnPress = (e) => {
            if (e.key === 'Escape') {
                closeMenuState();
            }
        }

        window.addEventListener('resize', closeMobileOnDesktop);
        window.addEventListener('resize', updateIsMobileWidth);
        window.addEventListener('keydown', closeMobileOnPress)

        return () => {
            window.removeEventListener('resize', closeMobileOnDesktop);
            window.removeEventListener('resize', updateIsMobileWidth);
            window.removeEventListener('keydown', closeMobileOnPress);
        };
    }, []);

    useEffect(() => {
        const mobileMenu = document.getElementById('main-mobile-menu');

        if (isMobileWidth) {
            const openMobileButton = document.getElementById('open-mobile-menu');

            setIsSocialOpen(false);

            if (isMenuOpen) {
                mobileMenu.showModal();
                mobileMenu.setAttribute("aria-hidden", "false");
                document.body.style.overflow = "hidden";
                openMobileButton.setAttribute("aria-expanded", "true");
            } else {
                mobileMenu.close();
                mobileMenu.setAttribute("aria-hidden", "true");
                document.body.style.overflow = "auto";
                openMobileButton.setAttribute("aria-expanded", "false");
            }
        } else {
            mobileMenu.setAttribute("aria-hidden", "false");
            document.body.style.overflow = "auto";
        }

        return () => {
            if (mobileMenu.tagName === 'DIALOG') {
                mobileMenu.close();
            }
        };
    }, [isMobileWidth, isMenuOpen]);

    const NavMenu = () => {
        return (
            <>
                <ul className="flex flex-row flex-nowrap justify-between items-center sm:order-1">
                    <li>
                        <button
                            id="dark-light-mode"
                            className="glassy-icon w-iconButtonMobile sm:w-iconButtonSmall md:w-iconButtonMedium lg:w-iconButtonLarge h-iconButtonMobile sm:h-iconButtonSmall md:h-iconButtonMedium lg:h-iconButtonLarge"
                            aria-label={isDarkMode ? "Toggle site to light mode" : "Toggle site to dark mode"}
                            onClick={toggleDarkMode}
                        >
                            {isDarkMode ? <SunIcon /> : <MoonIcon />}
                        </button>
                    </li>
                    <li className="sm:hidden">
                        <button
                            className="glassy-icon w-iconButtonMobile sm:w-iconButtonSmall md:w-iconButtonMedium lg:w-iconButtonLarge h-iconButtonMobile sm:h-iconButtonSmall md:h-iconButtonMedium lg:h-iconButtonLarge"
                            aria-label="Close mobile menu"
                            onClick={toggleMenuState}
                        >
                            <CloseIcon />
                        </button>
                    </li>
                </ul>
                <nav>
                    <ul className="flex flex-col flex-nowrap items-center gap-7 my-7 sm:flex-row sm:gap-6 md:gap-9 lg:gap-11">
                        {navMenu.map((menuItem) => (
                            <li key={menuItem.id} className="flex flex-col flex-nowrap justify-center items-center w-[100%]">
                                <NavLink
                                    to={menuItem.href}
                                    className={({ isActive, isPending }) =>
                                        `${isActive ? "text-primBlue-900 bg-primBlue-200 px-5 font-bold" : (isPending ? "text-neutGray-800" : "")} w-[80%] sm:w-[100%] text-center py-4`}
                                    onClick={closeMenuState}
                                >
                                    {menuItem.id}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className='flex flex-col flex-nowrap justify-center items-center sm:fixed sm:left-[8px] sm:bottom-[14px] sm:w-[50px] '>
                    <div
                        id="social-media-menu"
                        className={`collapsible-container max-h-auto sm:relative sm:max-h-0 sm:overflow-hidden sm:transition-[max-height] sm:duration-[250ms] sm:ease-out ${isSocialOpen ? 'sm:max-h-[500px]' : ''}`}
                        aria-hidden={refIsMobileWidth.current ? "false" : (isSocialOpen ? "false" : "true")}
                    >
                        <Socials />
                    </div>
                    <button
                        className='glassy-icon w-iconButtonMobile sm:w-iconButtonSmall md:w-iconButtonMedium lg:w-iconButtonLarge h-iconButtonMobile sm:h-iconButtonSmall md:h-iconButtonMedium lg:h-iconButtonLarge hidden sm:flex'
                        aria-label={isSocialOpen ? "Close social media panel" : "Open social media panel"}
                        onClick={toggleSocialState}
                    >
                        {isSocialOpen ? <CloseIcon /> : <ShareIcon />}
                    </button>
                </div>
            </>
        );
    };

    return (
        <>
            <button
                id="open-mobile-menu"
                className="glassy-icon ml-auto w-iconButtonMobile sm:w-iconButtonSmall md:w-iconButtonMedium lg:w-iconButtonLarge h-iconButtonMobile sm:h-iconButtonSmall md:h-iconButtonMedium lg:h-iconButtonLarge sm:hidden"
                aria-label="Open mobile menu"
                onClick={toggleMenuState}
            >
                <MenuIcon />
            </button>
            {(isMobileWidth) ?
                (
                    <dialog
                        id="main-mobile-menu"
                        className={`m-0 collapsible-container transition-[transform] pointer-events-none translate-x-[100vw] [&[open]]:translate-x-0 [&[open]]:pointer-events-auto duration-[250ms] ease-linear flex flex-col flex-nowrap justify-start gap-6 fixed top-[0%] bottom-[0%] bg-neutGray-900 dark:bg-neutGray-1050 max-w-[100vw] w-[100%] max-h-[100%] h-[100vh] px-mobileBound py-[40px] z-[999] md:gap-9 lg:gap-11`}
                    >
                        <NavMenu />
                    </dialog >
                )
                :
                (
                    <div
                        id="main-mobile-menu"
                        className={`flex flex-row flex-nowrap justify-start gap-6 sm:relative bg-transparent dark:bg-transparent sm:w-auto sm:h-auto px-mobileBound py-[40px] z-[999] md:gap-9 lg:gap-11`}
                    >
                        <NavMenu />
                    </div >
                )
            }
        </>
    );
}