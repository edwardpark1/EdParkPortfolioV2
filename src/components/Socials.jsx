/*
    File: Socials.jsx
    Author: Ed Park
    Copyright: 2023 - Ed Park https://edpark.space
    Version: 1.0
*/

import { socialMedias } from "../constants/data";

export default function Socials() {
    return (
        <ul className="flex flex-row flex-wrap justify-center items-center gap-6 sm:p-6">
            {socialMedias.map((social, id) => (
                <li key={id} >
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={social.href}
                        aria-label={social.ariaLabel}
                        title={social.title}
                        className="glassy-icon w-iconButtonMobile sm:w-iconButtonSmall md:w-iconButtonMedium lg:w-iconButtonLarge h-iconButtonMobile sm:h-iconButtonSmall md:h-iconButtonMedium lg:h-iconButtonLarge"
                    >
                        <social.Icon />
                    </a>
                </li>
            ))}
        </ul>
    );
}