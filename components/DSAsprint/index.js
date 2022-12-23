import Image from 'next/image';
import { Fade } from 'react-reveal';
import { FiExternalLink } from 'react-icons/fi';

import Link from 'next/link';
import { GiRuleBook } from 'react-icons/gi';
import { RiNumber1, RiNumber2, RiNumber3, RiNumber4, RiNumber5, } from 'react-icons/ri';


const DSAsprint = () => {


    const DSAPhase = [
        {
            title: 'The Gateway',
            description: <>
                Topics covered in this phase are:
                <ul className='list-disc list-inside'>
                    <li>Arrays</li>
                    <li>Strings</li>
                    <li>Hashmap</li>
                    <li>Linked List</li>
                </ul>
            </>,
            icon: <RiNumber1 className='text-3xl text-yellow-500 inline' />,
            date: `20th Nov - 1st Jan '23`,
            link: false,
            id: 1
        },
        {
            title: 'The Next Milestone',
            description: <>
                Topics covered in this phase are:
                <ul className='list-disc list-inside'>
                    <li>Stacks and Queues</li>
                    <li>Trees</li>
                    <li>Priority Queues</li>
                    <li className='font-bold ' >DS Main test</li>
                </ul>
            </>,
            icon: <RiNumber2 className='text-3xl text-yellow-500 inline' />,
            date: '15th Jan-26th Feb',
            link: false,
            id: 2
        },
        {
            title: 'The Summit',
            description: <>
                Topics covered in this phase are:
                <ul className='list-disc list-inside'>
                    <li>Recursion /Backtracking</li>
                    <li>Searching</li>
                    <li>Sorting</li>
                    <li>Two Pointer/Sliding Window Problems</li>
                </ul>
            </>,
            icon: <RiNumber3 className='text-3xl text-yellow-500 inline' />,
            date: '12th Mar - 23rd Apr',
            link: false,
            id: 3

        },
        {
            title: 'The Pinnacle',
            description: <>
                Topics covered in this phase are:
                <ul className='list-disc list-inside'>
                    <li>Graphs</li>
                    <li>Greedy Algorithms </li>
                    <li>Dynamic Programming</li>
                    <li className='font-bold '>Algorithms Main Test </li>
                </ul>
            </>,
            icon: <RiNumber4 className='text-3xl text-yellow-500 inline' />,
            date: '7th May - 18th June ',
            link: false,
            id: 4
        },
        {
            title: 'The Apex',
            description: <>
                Topics covered in this phase are:
                <ul className='list-disc list-inside'>
                    <li className='font-bold '>DSA Test 1</li>
                    <li className='font-bold '>DSA Test 2</li>
                    <li className='font-bold '>DSA Test 3</li>

                </ul>
            </>,
            icon: <RiNumber5 className='text-3xl text-yellow-500 inline' />,
            date: '16th july - 30th Jule ',
            link: false,
            id: 5
        },
        {
            title: 'Brochure',
            description: `DSA Sprint Brochure explaining event and timeline in the detail.`,
            icon: <GiRuleBook className='text-3xl text-yellow-500 inline' />,
            link: true,
            id: 6

        },

    ]

    return (
        <>

            <section className="text-black dark:text-white bg-white dark:bg-gray-900/10 transition-colors duration-500">
                <div className="px-4 py-16 mx-auto max-w-screen-xl sm:px-6 lg:px-28">
                    <Fade top cascade>
                        <div className="max-w-lg mx-auto text-center">
                            <h2 className="text-3xl heading font-bold sm:text-4xl">
                                DSA Sprint
                            </h2>

                            <div className="pt-8">
                                <Image
                                    alt="Team"
                                    width={400}
                                    height={500}
                                    src="/assets/DSA sprint.jpg"
                                    className="rounded-lg"
                                />
                            </div>
                            {/* <p className="mt-4">
                                Lab Oriented Training conducted by the ever-energetic &apos;Finite Loop
                                Club&apos; on &apos;Application Development using Collaborative Tools&apos; to
                                the first-year students (2021-2022) as a part of enhancing their
                                skills.
                            </p> */}
                            <div className='my-4 ' >
                                <ul className="dui-steps gap-3">
                                    <li data-content="✓" className="dui-step dui-step-warning  lg:text-xl lg:font-bold ">The Gateway</li>
                                    <li data-content="✓" className="dui-step dui-step-neutral  lg:text-xl lg:font-bold">The Next Milestone</li>
                                    <li data-content="✓" className="dui-step dui-step-neutral  lg:text-xl lg:font-bold">The Summit</li>
                                    <li data-content="✓" className="dui-step dui-step-neutral  lg:text-xl lg:font-bold">The Pinnacle</li>
                                    <li data-content="★" className="dui-step dui-step-neutral  lg:text-xl lg:font-bold">The Apex</li>
                                </ul>
                            </div>
                        </div>
                    </Fade>

                    <Fade top cascade>
                        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {DSAPhase.map((phase, index) => (
                                <div

                                    key={phase.id}
                                    className="block p-8 border border-yellow-500 shadow-xl transition-all rounded-xl hover:shadow-yellow-500/25 hover:border-yellow-300 duration-300 hover:scale-[1.05]"
                                >
                                    <div className="border-2 p-3 rounded-xl border-yellow-500 w-fit">
                                        {phase.icon}
                                    </div>
                                    <div className="mt-4 text-xl font-bold text-black dark:text-white">
                                        {phase.title} {phase.date ? <div className="dui-badge dui-badge-warning p-3 ml-3 dui-badge-outline">  {phase.date}</div> : ''}{phase.link ? (<a href="/DSA_Sprint_Brochure.pdf" target='_blank' > <FiExternalLink className='inline ml-2 text-yellow-500 cursor-pointer mb-1 text-2xl' /> </a>) : ''}

                                    </div>
                                    <div className="mt-1 text-sm text-gray-600 dark:text-gray-200">
                                        {phase.description}
                                    </div>
                                </div>
                            ))}

                        </div>
                    </Fade>
                </div>
            </section >



        </>
    )
}

export default DSAsprint