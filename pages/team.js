import { useState } from 'react';
import { teamTabs, members } from '../components/constants';
import Image from 'next/image';
import { AiFillLinkedin, AiFillGithub } from 'react-icons/ai';
import { Fade } from 'react-reveal';
import Link from 'next/link';

export default function Teams() {
  const [toggleState, setToggleState] = useState(1);
  const [team, setTeam] = useState('2022-23');
  return (
    <>
      <div className="mb-10">
        <div className="flex flex-wrap justify-center text-center mb-10">
          <Fade up cascade>
            <div className="w-full lg:w-6/12 px-4">
              <h1 className="heading text-4xl font-bold mb-3">Meet the Team</h1>
              <p className="text-black dark:text-gray-200 text-lg">
                Dynamic and Agile
              </p>
            </div>
          </Fade>
        </div>
        <ul className="flex justify-center flex-wrap ">
          {teamTabs.map((tab, index) => (
            <li key={index}>
              <a
                onClick={() => {
                  setToggleState(index);
                  setTeam(tab);
                }}
                className="relative block p-4 cursor-pointer"
              >
                {toggleState === index ? (
                  <span className="absolute inset-x-0 w-full h-px bg-yellow-400 -bottom-px"></span>
                ) : null}
                <div className="flex items-center justify-center">
                  <span className="ml-3 text-xs lg:text-sm md:text-lg font-light lg:font-medium text-black dark:text-gray-200">
                    {' '}
                    {tab}{' '}
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap mt-10 gap-10 justify-center">
          {members.map((member, index) =>
            member.year === team ? (
              <Fade cascade>
                <div
                  key={index}
                  className="w-full md:w-6/12 lg:w-3/12 mb-6 px-6 sm:px-6 lg:px-4"
                >
                  <div className="flex flex-col">
                    <div
                      href="#"
                      className="mx-auto hover:scale-[1.03] transition duration-500"
                    >
                      <Image
                        className="rounded-2xl drop-shadow-md hover:drop-shadow-2xl transition-all duration-200 delay-100 object-cover"
                        src={member.img}
                        width={350}
                        height={350}
                        alt={member.name}
                      />
                    </div>
                    <div className="text-center mt-6">
                      <h1 className="text-black dark:text-gray-200 text-xl font-bold mb-1">
                        {member.name}
                      </h1>

                      <div className="textgray-600 dark:text-gray-300 font-light mb-2">
                        {member.role}
                      </div>
                      <div
                        className="flex items-center justify-center opacity-50 hover:opacity-100
                          transition-opacity duration-300"
                      >
                        {member.linkedin && (
                          <Link passHref href={member.linkedin}>
                            <a
                              target="_blank"
                              rel="noreferrer noopener"
                              className="flex justify-center items-center  rounded-full hover:bg-indigo-50 h-10 w-10 hover:text-blue-700"
                            >
                              <AiFillLinkedin className="text-2xl" />
                            </a>
                          </Link>
                        )}

                        {member.github && (
                          <Link passHref href={member.github}>
                            <a
                              target="_blank"
                              rel="noreferrer noopener"
                              href={member.github}
                              className="flex justify-center items-center  rounded-full hover:bg-gray-50 h-10 w-10 hover:text-black"
                            >
                              <AiFillGithub className="text-2xl" />
                            </a>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Fade>
            ) : null
          )}
        </div>
      </div>
      <hr className="border-gray-500/50" />
    </>
  );
}
