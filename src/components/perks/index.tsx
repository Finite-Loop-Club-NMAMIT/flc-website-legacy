import Image from "next/image";
import { perks } from "../constants";
import {Fade } from "react-awesome-reveal";
import { type FunctionComponent } from "react";

const Perks: FunctionComponent = () => {
  return (
    <section className="bg-white text-black transition-colors duration-500 dark:bg-gray-900/10 dark:text-white">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-28">
        <Fade cascade>
          <div className="mx-auto max-w-lg text-center">
            <h2 className="heading text-3xl font-bold sm:text-4xl">
              Great for your awesome projects
            </h2>

            <div className="pt-8">
              <Image
                alt="Team"
                width={1040}
                height={780}
                src="/assets/skill-lab.jpeg"
                className="rounded-lg"
              />
            </div>
            <p className="mt-4">
              Lab Oriented Training conducted by the ever-energetic &apos;Finite
              Loop Club&apos; on &apos;Application Development using
              Collaborative Tools&apos; to the first-year students (2021-2022)
              as a part of enhancing their skills.
            </p>
          </div>
        </Fade>
        <Fade cascade>
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {perks.map((perk, index) => (
              <a
                key={index}
                className="block rounded-xl border border-yellow-500 p-8 shadow-xl transition-all duration-300 hover:scale-[1.05] hover:border-yellow-300 hover:shadow-yellow-500/25"
              >
                {perk.icon}
                <h3 className="mt-4 text-xl font-bold text-black dark:text-white">
                  {perk.title}
                </h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-200">
                  {perk.desc}
                </p>
              </a>
            ))}
          </div>
        </Fade>
      </div>
    </section>
  );
};

export default Perks;
