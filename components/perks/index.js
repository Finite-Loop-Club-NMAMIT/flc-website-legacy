import Image from "next/image"
import { perks } from "../constants"

export default function Perks() {
  return (
    <section className="text-black dark:text-white bg-white dark:bg-gray-900/10 transition-colors duration-500">
    <div className="px-4 py-16 mx-auto max-w-screen-xl sm:px-6 lg:px-28">
        <div className="max-w-lg mx-auto text-center">
        <h2 className="text-3xl heading font-bold sm:text-4xl">Great for your awesome projects</h2>
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
        Lab Oriented Training conducted by the ever-energetic 'Finite Loop Club' on 'Application Development using Collaborative Tools' to the first-year students (2021-2022) as a part of enhancing their skills.
        </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {perks.map((perk,index) => (
        <a key={index} className="block p-8 border border-yellow-500 shadow-xl transition rounded-xl hover:shadow-yellow-500/10 hover:border-yellow-300 duration-300">
        {perk.icon}
        <h3 className="mt-4 text-xl font-bold text-black dark:text-white">{perk.title}</h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-200">
            {perk.desc}
            </p>
        </a>
        ))}
        </div>
    </div>
    </section>
  )
}
