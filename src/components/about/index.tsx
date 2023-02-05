import { points } from "../constants";
import { Slide, Fade } from "react-awesome-reveal";
import { type FunctionComponent } from "react";
import BlurImage from "../blurImage";

const About: FunctionComponent = () => {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl bg-white px-4 py-16 transition-colors duration-500 dark:bg-black sm:px-6 lg:px-28">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative my-auto h-80 overflow-hidden rounded-lg lg:order-last lg:h-96">
            <Fade>
              <BlurImage
                alt="Team"
                src="/assets/team.jpeg"
                className="absolute inset-0 h-full w-full transform object-cover transition duration-500 ease-in-out hover:scale-110"
                width={500}
                height={500}
              />
            </Fade>
          </div>
          <div className="lg:py-24">
            <Slide direction="left" cascade>
              <div>
                <h2 className="heading text-3xl font-bold sm:text-4xl">
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
            <Slide direction="left">
              <div className="mt-5 flex flex-col gap-3 text-gray-600 dark:text-gray-400 md:text-lg">
                {points.map((point, index) => (
                  <p key={index} className="inline-flex items-center gap-3">
                    {point.icon} {point.desc}
                  </p>
                ))}
              </div>
            </Slide>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
