import { testimonials } from "../constants/data";
/*
    File: Testimonials.jsx
    Author: Ed Park
    Copyright: 2023 - Ed Park https://edpark.space
    Version: 1.0
    Created: 9/6/2023
    Last Modified: 9/6/2023
*/

import { QuoteIcon } from "./Icons";

export default function Testimonials() {
    return (
        <>
            {testimonials.map((testimonial, id) => (
                <figure key={id} className="glassy-screen px-mobileBound py-8 flex flex-col flex-nowrap gap-6 sm:px-7 sm:py-8 sm:gap-7 md:px-8 md:py-9 md:gap-8 lg:px-9 lg:py-10 lg:gap-9">
                    <QuoteIcon />
                    <blockquote className="h-[100%] max-h-[300px] relative overflow-y-scroll pr-6">
                        <p className="text-justify">{testimonial.quote}</p>
                    </blockquote>
                    <div className="flex flex-row flex-wrap items-end justify-center gap-6">
                        <img src={testimonial.src} alt={testimonial.altText} className="w-[100px] h-[100px]" />
                        <div className="max-w-[15em]">
                            <figcaption className="text-suppBlue-100 dark:text-suppBlue-200">{testimonial.name}</figcaption>
                            <p>{testimonial.title}</p>
                        </div>
                    </div>
                </figure>
            ))}
        </>
    );
}