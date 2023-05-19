import { Slide } from "react-awesome-reveal";
import { type FunctionComponent } from "react";
import BlurImage from "../blurImage";

const Discord: FunctionComponent = () => {
  return (
    <section>
      <div className="max-w-screen-2xl mx-auto px-4 py-16 sm:px-6 lg:px-8 dark:bg-black">
        <div className="grid grid-cols-1 lg:h-screen lg:grid-cols-2">
          <div className="relative z-10 lg:py-16">
            <div className="relative h-64 sm:h-80 lg:h-full">
              <BlurImage
                alt="Discord"
                src="/assets/discord.png"
                className="absolute inset-0 h-full w-full object-cover"
                width={500}
                height={500}
              />
            </div>
          </div>

          <div className="relative flex items-center bg-gray-400 bg-opacity-30 backdrop-blur-lg backdrop-filter transition-colors duration-500 dark:bg-white">
            <span className="hidden lg:absolute lg:inset-y-0 lg:-left-16 lg:block lg:w-16 lg:bg-gray-400 lg:bg-opacity-30 lg:backdrop-blur-lg lg:backdrop-filter lg:dark:bg-white"></span>
            <Slide triggerOnce direction="left">
              <div className="p-8 sm:p-16 lg:p-24">
                <h2 className="text-2xl font-bold text-black sm:text-3xl">
                  Get access to our exclusive discord community
                </h2>

                <p className="mt-4 text-gray-600 md:text-lg">
                  Our Discord community would help you to meet and make new
                  connections with peers, and to expand your network. All-in one
                  place to showcase your projects, knowledge, participate in
                  events or even chill in VCs.
                </p>
              </div>
            </Slide>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Discord;
