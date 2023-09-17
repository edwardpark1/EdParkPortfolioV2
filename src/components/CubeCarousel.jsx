/*
    File: CubeCarousel.jsx
    Author: Ed Park
    Copyright: 2023 - Ed Park https://edpark.space
    Version: 1.0
*/

import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

CubeCarousel.propTypes = {
    name: PropTypes.string.isRequired,
    carouselImages: PropTypes.array.isRequired,
}

// The faces are in the order that the carousel will move in
const boxFaces = [
    'ccarousel-front',
    'ccarousel-right',
    'ccarousel-top',
    'ccarousel-left',
    'ccarousel-back',
    'ccarousel-bottom',
];

// name is used to distinguish unique groups
export default function CubeCarousel({ name, carouselImages }) {
    const [slideIndex, setSlideIndex] = useState(0);

    // once program loads, set the interval, indicates autoplay state, once user clicks, remove and clear interval
    const intervalId = useRef(null);
    const intervalSlideIndex = useRef(0);

    const onOptionChange = (e, isUserAct) => {
        // Disable autoplay if user interacts with a radio button
        if (intervalId.current != null && isUserAct) {
            clearInterval(intervalId.current);
            intervalId.current = null;
        }

        // Go to next slide based on user click
        const nextSlide = Number(e.target.value.split('-').pop().trim());
        intervalSlideIndex.current = nextSlide;
        setSlideIndex(nextSlide);
    }

    // Enable autoplay on initial load
    useEffect(() => {
        intervalId.current = setInterval(() => {
            const nextFace = (intervalSlideIndex.current + 1) % 6;
            intervalSlideIndex.current = nextFace;
            setSlideIndex(nextFace);
        }, 3000);

        return () => {
            clearInterval(intervalId.current)
        };
    }, []);

    return (
        <div className='flex flex-col flex-nowrap gap-5 items-center sm:gap-6 md:gap-7'>
            <div className="ccarousel-view my-7 sm:my-6 md:my-8">
                <div className={`ccarousel-box ccarousel-slide-${slideIndex}`}>
                    {carouselImages.map((image, id) => (
                        <div key={`${name}-${id}`} className={`ccarousel-face ${boxFaces[id]}`} >
                            <img src={image.src} alt={image.altText} />
                        </div>
                    ))}
                </div>
            </div>
            <fieldset className='flex flex-col flex-nowrap gap-5 items-center justify-center'>
                <ol className='mb-4'>
                    {carouselImages.map((image, id) => (
                        <li
                            key={id}
                            className={`${(slideIndex === id) ? 'block w-[100%]' : 'invisible w-0 h-0'} max-w-read text-center`}
                        >
                            <label htmlFor={`${name}-${image.value}-${id}`}>{image.label}</label>
                        </li>
                    ))}
                </ol>
                <div className='flex flex-row flex-wrap gap-7 items-center justify-center sm:gap-8'>
                    {carouselImages.map((image, id) => (
                        <input
                            key={id}
                            id={`${name}-${image.value}-${id}`}
                            className='mr-4 ccarousel-control'
                            type="radio"
                            name={name}
                            value={id}
                            checked={id === slideIndex}
                            onChange={(event) => {
                                onOptionChange(event, true)
                            }}
                        />
                    ))}
                </div>
            </fieldset>
        </div >
    );
}