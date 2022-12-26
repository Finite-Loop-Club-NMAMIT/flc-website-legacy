import Image from 'next/image';
import { Fade } from 'react-reveal';
import { FiExternalLink } from 'react-icons/fi';
import { HackFestPhases, hackfestPhases } from '../constants/';

const Hackfest = () => {
  return (
    <>
      <section className="text-black dark:text-white bg-white dark:bg-gray-900/10 transition-colors duration-500">
        <div className="px-4 py-16 mx-auto max-w-screen-xl sm:px-6 lg:px-28">
          <Fade top cascade>
            <div className="max-w-lg mx-auto text-center">
              <h2 className="text-3xl heading font-bold sm:text-4xl">
                FLC Hackfest 2022-23
              </h2>

              <div className="pt-8">
                <Image
                  alt="Team"
                  width={400}
                  height={500}
                  src="/assets/hackfest.jpg"
                  className="rounded-lg"
                />
              </div>
              <div className="my-4 flex justify-center items-center">
                {hackfestPhases.map((phase) => (
                  <>
                    <div
                      key={phase.id}
                      className={`text-xl font-bold ${
                        phase.isCompleted
                          ? 'bg-yellow-400'
                          : 'bg-gray-200 dark:bg-gray-400'
                      } w-8 h-8 rounded-full`}
                    >
                      {phase.id}
                    </div>
                    {phase.id !== hackfestPhases.length && (
                      <div
                        className={`${
                          phase.isCompleted ? 'bg-yellow-400' : 'bg-gray-400'
                        } w-8 h-2`}
                      />
                    )}
                  </>
                ))}
              </div>
            </div>
          </Fade>

          <Fade top cascade>
            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {HackFestPhases.map((phase) => (
                <div
                  key={phase.id}
                  className="block p-8 border border-yellow-500 shadow-xl transition-all rounded-xl hover:shadow-yellow-500/25 hover:border-yellow-300 duration-300 hover:scale-[1.05]"
                >
                  <div className="border-2 p-3 rounded-xl border-yellow-500 w-fit">
                    {phase.icon}
                  </div>
                  <div className="mt-4 text-xl font-bold text-black dark:text-white flex items-center">
                    {phase.title}
                    {phase.date && (
                      <div className="ml-3 inline-block border border-yellow-400 text-sm rounded-full text-yellow-400 font-semibold text-center px-3">
                        {phase.date}
                      </div>
                    )}
                    {phase.link ? (
                      <a href="/DSA_Sprint_Brochure.pdf" target="_blank">
                        <FiExternalLink className="inline ml-2 text-yellow-500 cursor-pointer mb-1 text-2xl" />{' '}
                      </a>
                    ) : (
                      ''
                    )}
                  </div>
                  <div className="mt-1 text-sm text-gray-600 dark:text-gray-200">
                    {phase.description}
                  </div>
                </div>
              ))}
            </div>
          </Fade>
        </div>
      </section>
    </>
  );
};

export default Hackfest;
