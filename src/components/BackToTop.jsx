/*
    File: BackToTop.jsx
    Author: Ed Park
    Copyright: 2023 - Ed Park https://edpark.space
    Version: 1.0
*/

import { useState, useEffect } from 'react';
import { BackToTopIcon } from "./Icons";

export default function BackToTop() {
    const showThreshold = 100;
    const [showButton, setShowButton] = useState(false);

    const toggleScrollButton = () => {
        setShowButton(window.scrollY > showThreshold);
    };

    const scrollContainer = () => {
        return document.documentElement || document.body;
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleScrollButton);
        window.addEventListener('resize', toggleScrollButton);

        toggleScrollButton();

        return () => {
            window.removeEventListener('scroll', toggleScrollButton);
            window.removeEventListener('resize', toggleScrollButton);
        };
    }, []);

    return (
        <button
            className={`${showButton ? '' : 'hidden'
                } glassy-icon w-iconButtonMobile sm:w-iconButtonSmall md:w-iconButtonMedium lg:w-iconButtonLarge h-iconButtonMobile sm:h-iconButtonSmall md:h-iconButtonMedium lg:h-iconButtonLarge fixed bottom-mobileBound right-mobileBound z-[9]`}
            aria-label="Scroll to top of page"
            onClick={() => {
                scrollContainer().scrollIntoView({
                    behavior: "smooth",
                });
            }}
        >
            <BackToTopIcon />
        </button>
    );
}