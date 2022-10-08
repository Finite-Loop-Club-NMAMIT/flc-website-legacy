import Image from 'next/image';
import { Fade } from 'react-reveal';

export default function discord() {
  return (
    <section>
      <div className="px-4 py-16 mx-auto max-w-screen-2xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:h-screen">
          <div className="relative z-10 lg:py-16">
            <div className="relative h-64 sm:h-80 lg:h-full">
              <Image
                alt="Discord"
                layout="fill"
                src="/assets/discord.png"
                className="absolute inset-0 object-cover w-full h-full"
              />
            </div>
          </div>

          <div className="relative flex items-center bg-gray-400 dark:bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg transition-colors duration-500">
            <span className="hidden lg:inset-y-0 lg:absolute lg:w-16 lg:bg-gray-400 lg:dark:bg-white lg:block lg:-left-16 lg:bg-opacity-30 lg:backdrop-filter lg:backdrop-blur-lg"></span>
            <Fade top cascade>
              <div className="p-8 sm:p-16 lg:p-24">
                <h2 className="text-2xl font-bold sm:text-3xl text-black">
                  Get access to our exclusive discord community
                </h2>

                <p className="mt-4 text-gray-600 md:text-lg">
                  Our Discord community would help you to meet and make new
                  connections with peers, and to expand your network. All-in one
                  place to showcase your projects, knowledge, participate in
                  events or even chill in VCs.
                </p>
              </div>
            </Fade>
          </div>
        </div>
      </div>
    </section>
  );
}
