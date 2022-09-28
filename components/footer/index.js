import Image from "next/image"
import Link from "next/link"
import { Links } from "../constants"
import { social } from "../constants"

export default function footer() {
  return (
    <footer className="bg-white dark:bg-black text-black dark:text-white transition-colors duration-500">
    <div className="max-w-5xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
        <div className="flex justify-center items-center">
            <Image src="/assets/flc_logo_crop.png" width={100} height={100} />
            <a className="ml-3 text-lg md:text-xl cursor-pointer flex items-center text-black dark:text-gray-100">Finite Loop Club</a>
        </div>

        <p className="max-w-md mx-auto mt-6 leading-relaxed text-center text-black dark:text-gray-200">
        NMAM Institute of Technology, Nitte, SH1, Karkala, Karnataka, KARKALA, NMAMIT 574110, IN
        </p>

        <nav className="mt-12" aria-labelledby="footer-navigation">

        <ul className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
            {Links.map((link, index)=>(
            <li key={index}>
            <Link href={link.link}>
            <a className="text-black dark:text-gray-100 transition hover:text-gray-500 dark:hover:text-gray-200/75">
                {link.name}
            </a>
            </Link>
            </li>
            ))}
        </ul>
        </nav>

        <ul className="flex justify-center mt-12 gap-6 md:gap-8">
        {social.map((link, index)=>(
        <li key={index}>
            <Link href={link.link}>
                <a
                rel="noopener noreferrer"
                target="_blank"
                className="text-black dark:text-gray-100 transition hover:text-gray-200/75"
                >
                <span className="sr-only">{link.name}</span>
                {link.icon}
                </a>
            </Link>
        </li>
        ))}
        </ul>
    </div>
    </footer>
  )
}
