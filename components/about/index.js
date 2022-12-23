import Image from 'next/image';
import { points } from '../constants';
import { Slide, Fade } from 'react-reveal';

export default function About() {
  return (
    <section>
      <div className="bg-white dark:bg-black max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-28 transition-colors duration-500">
        <div className="grid grid-cols-1 gap-8 lg:gap-16 lg:grid-cols-2">
          <div className="relative h-80 lg:h-96 overflow-hidden rounded-lg lg:order-last my-auto">
            <Image
              alt="Team"
              layout="fill"
              src="/assets/team.jpeg"
              className="absolute inset-0 object-cover w-full h-full"
            />
          </div>
          <div className="lg:py-24">
            <Slide left cascade>
              <div>
                <h2 className="text-3xl font-bold sm:text-4xl heading">
                  About Us
                </h2>

                <p className="mt-4 text-black dark:text-white md:text-lg">
                  Finite Loop is a Coding Club, which aims to give a good
                  perspective of development, and encourages students to realize
                  their ideas. We encourage students to participate in
                  competitive programming and thus, inspire the next.
                </p>
              </div>
            </Slide>
            <Fade top>
              <div className="mt-5 flex gap-3 flex-col md:text-lg text-gray-600 dark:text-gray-400">
                {points.map((point) => (
                  <p
                    key={point.icon}
                    className="inline-flex gap-3 items-center"
                  >
                    {point.icon} {point.desc}
                  </p>
                ))}
              </div>
              </Fade>
          </div>
        </div>
      </div>
    </section>
  );
}
