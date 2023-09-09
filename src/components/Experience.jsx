/*
    File: Experience.jsx
    Author: Ed Park
    Copyright: 2023 - Ed Park https://edpark.space
    Version: 1.0
    Created: 9/6/2023
    Last Modified: 9/6/2023
*/

import PropTypes from 'prop-types';
import DateRange from './DateRange';

Experience.propTypes = {
    experience: PropTypes.array.isRequired,
    isSequential: PropTypes.bool.isRequired,
}

export default function Experience({ experience, isSequential }) {
    return (
        <ul className={`ml-mobileBound sm:ml-0 gap-8 sm:gap-11 w-[100%] ${isSequential ? 'grid grid-cols-timeline sm:grid-cols-wide-timeline auto-cols-[max-content] before:row-mobile-experience-marker sm:before:row-experience-marker mobile-marker-time-item sm:before:col-marker-time-item before:bg-primBlue-200' : 'flex flex-row flex-wrap justify-center items-start'}`}>
            {experience.map((work, id) => (
                <li key={id} className={`max-w-[28em] w-[100%] ${isSequential ? 'group row-time-item col-mobile-time-item row-mobile-time-item sm:odd:col-odd-time-item sm:even:col-even-time-item sm:[&:nth-child(2)]:row-second-time-item sm:odd:justify-self-end' : 'items-center'} flex flex-col flex-nowrap`}>
                    <h3 className={`w-[100%] mb-6 ${isSequential ? 'mt-8 px-3 py-3 glassy-screen sm:px-4 sm:py-4 md:px-6 md:py-6 relative before:absolute after:absolute after:top-[50%] after:translate-y-[-50%] after:bg-primBlue-300  after:h-3 after:z-[-1] group-odd:after:left-[-38px] group-odd:after:right-[100%] sm:group-odd:after:left-[100%] sm:group-odd:after:right-[-78px] group-even:after:left-[-38px] group-even:after:right-[100%] sm:group-even:after:left-[-78px] sm:group-even:after:right-[100%] before:w-8 before:h-8 before:bg-primBlue-300 before:top-[50%] before:translate-y-[-50%] group-odd:before:left-[-38px] group-odd:before:right-auto sm:group-odd:before:left-auto sm:group-odd:before:right-[-78px] group-even:before:left-[-38px] sm:group-even:before:left-[-78px]' : ''}`}>{work.positions[0].title}</h3>
                    <div className='mt-4 italic flex flex-row flex-wrap justify-between gap-6'>
                        <span className='font-bold'>{work.company}</span>
                        <span>{work.location}</span>
                        {(work.positions.length === 1) ?
                            (
                                <DateRange startDate={work.positions[0].startDate} endDate={work.positions[0].endDate} />
                            )
                            :
                            (<ul className='w-[100%] flex flex-col flex-nowrap items-center gap-5'>
                                {
                                    work.positions.map((position, posId) => (
                                        <li key={posId} className='flex flex-col flex-nowrap items-center'>
                                            <p>{position.title}</p>
                                            <DateRange startDate={position.startDate} endDate={position.endDate} />
                                        </li>
                                    ))
                                }
                            </ul>)
                        }
                    </div>
                    <h4 className='mt-7 mb-4 sm:mt-9 sm:mb-6'>Roles and Responsiblities</h4>
                    <ul>
                        {work.tasks.map((task, taskId) => (
                            <li key={taskId} className='list-square list-inside'>
                                {task}
                            </li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
    );
}
