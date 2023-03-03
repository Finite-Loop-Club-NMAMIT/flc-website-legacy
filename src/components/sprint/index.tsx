import { type FunctionComponent } from "react";
import { Fade } from "react-awesome-reveal";
import { FiExternalLink } from "react-icons/fi";
import BlurImage from "../blurImage";
import { DSAPhases, sprintPhases } from "../constants/";

const DSAsprint: FunctionComponent = () => {
  return (
    <>
      <section className="bg-white text-black transition-colors duration-500 dark:bg-gray-900/10 dark:text-white">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-28">
          <Fade triggerOnce cascade>
            <div className="mx-auto max-w-lg text-center">
              <h2 className="heading text-3xl font-bold sm:text-4xl">
                DSA Sprint
              </h2>

              <div className="flex justify-center pt-8">
                <BlurImage
                  alt="Team"
                  width={400}
                  height={500}
                  src="/assets/DSA sprint.jpg"
                  className="rounded-lg"
                />
              </div>
              <div className="my-4 flex items-center justify-center">
                {sprintPhases.map((phase) => (
                  <>
                    <div
                      key={phase.id}
                      className={`text-xl font-bold ${
                        phase.isCompleted
                          ? "bg-yellow-400"
                          : "bg-gray-200 dark:bg-gray-400"
                      } h-8 w-8 rounded-full`}
                    >
                      {phase.id}
                    </div>
                    {phase.id !== sprintPhases.length && (
                      <div
                        className={`${
                          phase.isCompleted ? "bg-yellow-400" : "bg-gray-400"
                        } h-2 w-8`}
                      />
                    )}
                  </>
                ))}
              </div>
            </div>
          </Fade>

          <Fade triggerOnce cascade>
            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {DSAPhases.map((phase) => (
                <div
                  key={phase.id}
                  className="block rounded-xl border border-yellow-500 p-8 shadow-xl transition-all duration-300 hover:scale-[1.05] hover:border-yellow-300 hover:shadow-yellow-500/25"
                >
                  <div className="w-fit rounded-xl border-2 border-yellow-500 p-3">
                    {phase.icon}
                  </div>
                  <div className="mt-4 flex items-center text-xl font-bold text-black dark:text-white">
                    {phase.title}
                    {phase.date && (
                      <div className="ml-3 inline-block rounded-full border border-yellow-400 px-3 text-center text-sm font-semibold text-yellow-400">
                        {phase.date}
                      </div>
                    )}
                    {phase.link ? (
                      <a href="/DSA_Sprint_Brochure.pdf" target="_blank">
                        <FiExternalLink className="ml-2 mb-1 inline cursor-pointer text-2xl text-yellow-500" />{" "}
                      </a>
                    ) : (
                      ""
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

export default DSAsprint;
