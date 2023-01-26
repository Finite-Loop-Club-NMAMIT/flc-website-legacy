import Image from "next/image";
import { type FunctionComponent } from "react";
import { Fade, Slide } from "react-awesome-reveal";

const Tech: FunctionComponent = () => {
  const tech = [
    { src: "nextjs.png" },
    { src: "react.svg" },
    { src: "laravel.svg" },
    { src: "node.svg" },
    { src: "tailwind.svg" },
    { src: "python.svg" },
  ];
  return (
    <section>
      <div className="max-w-screen-xl bg-white px-4 py-16 text-black transition-colors duration-500 dark:bg-black dark:text-white sm:px-6 lg:px-28">
        <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:items-center lg:gap-x-16">
          <Slide direction="up" cascade>
            <div className="mx-auto max-w-lg text-center lg:mx-0 lg:text-left">
              <h2 className="heading text-3xl font-bold sm:text-4xl">
                Work on new Trending Tech Stack
              </h2>

              <p className="mt-4 text-gray-600 dark:text-gray-200">
                Get a chance to explore and innovate using the in-demand Tech
                Stack! Get your hands to code your idea and enter the world of
                developers!
              </p>
            </div>
          </Slide>
          <Fade direction="top-left" cascade>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {tech.map((item, index) => (
                <a
                  key={index}
                  className="block rounded-xl border border-yellow-400 p-4 text-center shadow-sm duration-300 hover:border-yellow-200 hover:shadow-xl hover:shadow-yellow-300/25"
                >
                  <Image
                    src={`/assets/${item.src}`}
                    width={100}
                    height={100}
                    alt="icon"
                  />
                </a>
              ))}
            </div>
          </Fade>
        </div>
      </div>
    </section>
  );
};

export default Tech;
