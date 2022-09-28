import { useState } from 'react';
import { teamTabs, members } from '../components/constants';
import Image from 'next/image';
import { AiFillLinkedin, AiFillGithub, AiFillInstagram } from 'react-icons/ai';

export default function Teams() {
  const [toggleState, setToggleState] = useState(1);
  const [team, setTeam] = useState('2022-23');
  return (
    <div className='mb-10'>
      <div class="flex flex-wrap justify-center text-center mb-10">
        <div class="w-full lg:w-6/12 px-4">
          <h1 class="heading text-4xl font-bold mb-3">Meet the Team</h1>
          <p class="text-gray-200 text-lg">Dynamic and Agile</p>
        </div>
      </div>
      <ul className="flex border-b border-gray-100">
        {teamTabs.map((tab, index) => (
          <li className="flex-1" key={index}>
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
                <span className="ml-3 text-xs lg:text-sm md:text-lg font-light lg:font-medium text-gray-200">
                  {' '}
                  {tab}{' '}
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
      <div class="flex flex-wrap mt-10 gap-10 justify-center">
        {members.map((member, index) => 
        member.year === team ?
        (
        
          <div
            key={index}
            class="w-full md:w-6/12 lg:w-3/12 mb-6 px-6 sm:px-6 lg:px-4"
          >
            <div class="flex flex-col">
              <a href="#" class="mx-auto">
                <Image
                  class="rounded-2xl drop-shadow-md hover:drop-shadow-2xl transition-all duration-200 delay-100 object-cover"
                  src={member.img}
                  width={350}
                  height={350}
                />
              </a>
              <div class="text-center mt-6">
                <h1 class="text-gray-200 text-xl font-bold mb-1">
                  {member.name}
                </h1>

                <div class="text-gray-300 font-light mb-2">{member.role}</div>
                <div
                  class="flex items-center justify-center opacity-50 hover:opacity-100
                          transition-opacity duration-300"
                >
                  <a
                    href={member.linkedin}
                    class="flex justify-center items-center text-white rounded-full hover:bg-indigo-50 h-10 w-10 hover:text-blue-700"
                  >
                    <AiFillLinkedin className="text-2xl" />
                  </a>

                  {member.github && (
                    <a
                      href={member.github}
                      class="flex justify-center items-center text-white rounded-full hover:bg-gray-50 h-10 w-10 hover:text-black"
                    >
                      <AiFillGithub className="text-2xl" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ):null
        )}
      </div>
      <hr />
    </div>
  );
}
