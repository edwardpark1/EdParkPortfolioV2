/*
    File: ProjectModal.jsx
    Author: Ed Park
    Copyright: 2023 - Ed Park https://edpark.space
    Version: 1.0
*/

import { useState, useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import {
    CloseIcon,
} from "./Icons";

ProjectModal.propTypes = {
    projectId: PropTypes.string.isRequired,
    projectData: PropTypes.object.isRequired,
}

export default function ProjectModal({ projectId, projectData, }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const projectModalId = useRef(projectId);

    const toggleDialog = () => {
        setIsModalOpen(!isModalOpen);
    };

    function closeOnBackdrop(e) {
        // inner div in dialog helps distinguish dialog and backdrop areas
        if (e.target.id === projectModalId.current) {
            setIsModalOpen(false);
        }
    }

    useEffect(() => {
        const dialog = document.getElementById(`closeModal-${projectModalId.current}`);

        const closeModal = (e) => {
            if (e.key === 'Escape') {
                setIsModalOpen(false);
            }
        }

        dialog.addEventListener('keydown', closeModal)

        return () => {
            dialog.removeEventListener('keydown', closeModal);
        };
    }, []);

    useEffect(() => {
        const dialog = document.getElementById(projectModalId.current);

        if (isModalOpen) {
            dialog.setAttribute("aria-hidden", "false");
            dialog.showModal();
            document.body.style.overflow = "hidden";
        } else {
            dialog.setAttribute("aria-hidden", "true");
            dialog.close();
            document.body.style.overflow = "auto";
        }

        return () => {
            dialog.close();
        };
    }, [isModalOpen]);

    return (
        <>
            <button
                aria-label={projectData.ariaLabel}
                onClick={toggleDialog}
            >
                <span className="inline-link max-w-[300px] font-heading font-bold text-6 sm:text-5 md:text-4 lg:text-3 max-w-read text-center mx-auto;">{projectData.title}</span>
            </button>
            <div className="monitor-view">
                <div className="monitor-box">
                    <button
                        className="monitor-face monitor-faceFront"
                        aria-label={projectData.ariaLabel}
                        onClick={toggleDialog}
                    >
                        <img src={projectData.src} alt={projectData.altText} />
                    </button>
                    <div className="monitor-face monitor-faceBack"></div>
                    <div className="monitor-face monitor-faceRight"></div>
                    <div className="monitor-face monitor-faceLeft"></div>
                    <div className="monitor-face monitor-faceTop"></div>
                    <div className="monitor-face monitor-faceBottom"></div>
                </div>
            </div>
            <dialog
                id={projectModalId.current}
                className="collapsible-container z-10 m-0 translate-x-[600px] transition-[transform] pointer-events-none [&[open]]:translate-x-0 [&[open]]:pointer-events-auto duration-500 flex flex-col flex-nowrap gap-8 items-center fixed top-0 bottom-0 left-auto right-0 max-w-[600px] w-[100%] max-h-[100%] h-[100vh] bg-neutGray-900 dark:bg-neutGray-1050 text-primBlue-200 backdrop:bg-neutGray-100/70"
                onClick={closeOnBackdrop}
                aria-hidden="true"
            >
                <div className="w-[100%] p-9 flex flex-col flex-nowrap gap-9">
                    <button
                        id={`closeModal-${projectModalId.current}`}
                        className="shrink-0 self-end glassy-icon w-iconButtonMobile sm:w-iconButtonSmall md:w-iconButtonMedium lg:w-iconButtonLarge h-iconButtonMobile sm:h-iconButtonSmall md:h-iconButtonMedium lg:h-iconButtonLarge"
                        aria-label="Close modal window"
                        onClick={toggleDialog}
                    >
                        <CloseIcon />
                    </button>
                    <h4 className="text-center font-extrabold ml-auto mr-auto">{projectData.title}</h4>
                    <img className="border-2 border-primBlue-200 w-[100%] object-cover object-top max-h-[350px] ml-auto mr-auto" src={projectData.src} alt={projectData.altText} />
                    {projectData.details.description !== null && (
                        <>
                            <h5 className="text-center ml-auto mr-auto">About</h5>
                            <p className="ml-auto mr-auto text-justify">{projectData.details.description}</p>
                        </>
                    )}
                    <h5 className="text-center ml-auto mr-auto">Technologies</h5>
                    <ul className="w-[100%] grid grid-cols-[repeat(auto-fit,minmax(80px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(90px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(110px,1fr))] justify-items-center items-start justify-center gap-6">
                        {projectData.details.technologies.map((technology, id) => (
                            <li key={id} className="h-[100%] flex flex-col flex-nowrap items-center gap-5 justify-center">
                                <technology.Icon />
                                <span className="text-center hyphens-auto">{technology.title}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="flex flex-row flex-wrap gap-7 items-center justify-center">
                        {projectData.details.url !== null && (
                            <a href={projectData.details.url} className="glassy-icon px-6 shrink-0">Visit Website</a>
                        )}
                        {projectData.details.githubUrl !== null && (
                            <a href={projectData.details.githubUrl} className="glassy-icon px-6 shrink-0">Visit GitHub Project</a>
                        )}
                    </div>
                </div>
            </dialog>
        </>
    );
}