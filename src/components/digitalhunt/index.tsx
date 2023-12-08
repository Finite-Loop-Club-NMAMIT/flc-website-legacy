import { Slide, Fade } from "react-awesome-reveal";
import BlurImage from "../blurImage";

const DigitalHunt = () => {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl bg-white px-4 py-16 text-black transition-colors duration-500 dark:bg-gray-900/10 dark:text-white sm:px-6 lg:px-28">
        <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:items-center lg:gap-x-16">
          <div className="flex flex-col items-center justify-center gap-8">
            <div className="heading text-3xl font-bold sm:text-4xl md:hidden">
              Digital Hunt
            </div>
            <Fade triggerOnce className="shrink-0">
              <div className="flex justify-center">
                <BlurImage
                  alt="Digital Hunt"
                  width={400}
                  height={500}
                  src="/assets/digitalhunt.jpeg"
                  className="rounded-lg"
                />
              </div>
            </Fade>
          </div>
          <Slide cascade direction="right" triggerOnce>
            <div className="md flex flex-col items-center justify-center gap-12 text-center md:text-left">
              <div className="flex flex-col items-center">
                <h2 className="heading hidden text-3xl font-bold sm:text-4xl md:block">
                  Digital Hunt
                </h2>

                <p className="mt-4 text-gray-600 dark:text-gray-200 ">
                  The infamous game of Digital Hunt is now available for public
                  to find the answer for biggest question of the year,
                  &ldquo;Who hacked Obama?&rdquo; Put on your detective hats and
                  get in to find him now! Get ready to race your friends on the{" "}
                  <a
                    href="https://www.intsagram.tech/leaderboard"
                    className="text-yellow-400 underline underline-offset-[3px]"
                  >
                    leaderboard
                  </a>
                  .
                </p>
              </div>
              <a
                className="block w-auto rounded bg-gray-50 px-8 py-2 font-medium text-black shadow duration-300 hover:scale-[1.03] hover:text-gray-600 focus:outline-none focus:ring active:text-yellow-500 lg:px-12 lg:py-3"
                href="https://dh.finiteloop.co.in/"
              >
                Start Investigation
              </a>
            </div>
          </Slide>
        </div>
      </div>
    </section>
  );
};

export default DigitalHunt;
